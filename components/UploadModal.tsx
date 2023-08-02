"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import uniqid from "uniqid";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import  {useRouter} from 'next/navigation'
const UploadModal = () => {
  const uploadModal = useUploadModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const { user } = useUser();
  const supabaseClient = useSupabaseClient();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    //upload to supabase

    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }

      const uniqueID = uniqid();

      //upload song

      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        setIsLoading(false);
        return toast.error("failed song upload");
      }

      // uopload image
      const { data: imageData, error: imageError } = await supabaseClient.storage
        .from("images")
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error("failed image upload bruh");
      }

    //create record in database
    const {error: supbaseError} = await supabaseClient.from("songs").insert({
        user_id: user.id, 
        title: values.title, 
        author: values.author, 
        image_path: imageData.path, 
        song_path: songData.path,
    })
    if (supbaseError) {
        setIsLoading(false);
        return toast.error(supbaseError.message);
    }

    //cleanup after successfull upload
    router.refresh()
    setIsLoading(false);
    toast.success('Song Created!!')
    reset();
    uploadModal.onClose();
    } catch (err) {
      toast.error("something went wrong");
      console.log('ending error:', err)
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose();
    }
  };
  const handleExitModal = () => {
    reset();
    uploadModal.onClose();
  };
  return (
    <Modal
      isOpen={uploadModal.isOpen}
      title="Add a Song"
      description="upload mp3 file"
      onChange={onChange}
      exitModal={handleExitModal}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
        />

        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        />

        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            {...register("song", { required: true })}
            accept=".mp3"
          />
        </div>

        <div>
          <div className="pb-1">Select a image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            {...register("image", { required: true })}
            accept="image/*"
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
