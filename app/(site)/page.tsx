
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";
import MusicSection from "./components/MusicSection";
import { useUser } from "@/hooks/useUser";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export const revalidate = 0

export default async function Home() {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const title = session ? `Welcome Back`: `Mwelo Music global`
  return (
    <div className="bg-neutral-900 rounded-lg h-full !w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">{title}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
            <ListItem
              image="/images/liked.png"
              name="Playlist 2"
              href="liked"
            />
            <ListItem
              image="/images/liked.png"
              name="Playlist 3"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <MusicSection type="slideshow" title="Newest Songs" />
      <MusicSection type="tiles" title="For You" />
      <MusicSection type="tiles" title="Created Reccently" />
    </div>
  );
}
