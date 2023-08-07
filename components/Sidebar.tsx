"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch, BiCompass } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import { BsMusicNote } from "react-icons/bs";
import SiteFooter from "./Footer";
interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
      {
        icon: BiCompass,
        label: "Explore",
        active: pathname === "/explore",
        href: "/explore",
      },
      {
        icon: BsMusicNote,
        label: "Genres",
        active: pathname === "/genres",
        href: "/genres",
      },
    ],
    []
  );
  return (
    <div className="flex h-full w-full">
      <main className="h-full flex-1 overflow-y-auto py-2">{children}<SiteFooter /></main>
      <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
