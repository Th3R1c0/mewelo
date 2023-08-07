'use client';
import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchInput from "@/components/SearchInput";
import Header from "@/components/Header";
import { useState } from "react";
import Input from "@/components/Input";

//export const revalidate = 0;

import Image from "next/image";

import SiteFooter from "@/components/Footer";
import { generateGenres } from "@/lib/generate-data";
import useFetchData from "@/hooks/useFetchData";

const Genres = () => {
    const {error, loading, result} = useFetchData(generateGenres)
  const [filter, setFilter] = useState("")
  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        
        w-full 
        
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Discover a New Genre
          </h1>
        </div>
        <Input
          placeholder="Search for a Genre"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Header>
      <div className="w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
        {loading
          ? Array.from(Array(40).keys()).map((box) => (
              <div key={box} className="bg-black rounded-md h-[150px] w-full">
                Box {box}
              </div>
            ))
          : result?.map((box) => (
              <div
                key={box.id}
                className="bg-black rounded-md h-[150px] w-full relative"
              >
                {box.name}
                <div
                  className="absolute top-0 left-0 w-full h-full"
                >
                  <Image
                    alt="genres"
                    src={box.bgImage}
                    layout="fill"
                    objectFit="cover"
                    quality={1}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Genres;
