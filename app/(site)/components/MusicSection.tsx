import PageContent from "./PageContent";
import getSongs from "@/actions/getSongs";

interface MusicSectionProps {
    title: string; 
    type: 'tiles' | 'slideshow';
}

const MusicSection: React.FC<MusicSectionProps> = async ({title, type}) => {
    const songs = await getSongs();
    return (
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">{title}</h1>
        </div>
        <PageContent songs={songs} type={type} />
      </div>
    );
}

export default MusicSection;