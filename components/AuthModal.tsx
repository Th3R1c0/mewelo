"use client";

import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";



const AuthModal = () => {
      const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen, onOpen } = useAuthModal();
  
  const supabaseClient = useSupabaseClient();
  

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }
  const handleExitModal = () => {
    onClose()
  }

  useEffect(() => {
    if(session) {
      router.refresh();
      onClose()
    }
  }, [session, router, onClose])
    return (
      <Modal
        title="Welcome Back "
        description="Login to your account"
        onChange={onChange}
        exitModal={handleExitModal}
        isOpen={isOpen}
      >
        <Auth
          magicLink
          theme="dark"
          providers={["github"]}
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#404040",
                  brandAccent: "#22c55e",
                },
              },
            },
          }}
        />
      </Modal>
    );
}

export default AuthModal;