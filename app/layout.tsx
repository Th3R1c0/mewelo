import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupbaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import { ThemeProvider } from "@/components/theme-provider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen To Music",
};

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className="bg-black h-screen flex w-screen text-white">
        <ToasterProvider />
        <SupbaseProvider>
          <UserProvider>
            <ModalProvider />
            {/* <ThemeProvider attribute="class" defaultTheme="dark" enableSystem> */}
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
            {/* </ThemeProvider> */}
          </UserProvider>
        </SupbaseProvider>
      </body>
    </html>
  );
}
