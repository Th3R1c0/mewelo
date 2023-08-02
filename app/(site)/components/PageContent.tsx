"use client";
import { useMediaQuery } from "usehooks-ts";
import {twMerge} from "tailwind-merge";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import SongItem from "@/components/SongItem";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
interface PageContentProps {
    songs: Song[];
    type: 'tiles' | 'slideshow';
}
const PageContent: React.FC<PageContentProps> = ({
    songs,
    type
}) => {
  const onPlay = useOnPlay(songs);
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                no songs avaliable
            </div>
        )
    }

    const newestSongs = (
      <>
        {" "}
        {songs.map((item) => (
          <SongItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
          />
        ))}
      </>
    );

    const CustomArrow = (props: any) => {
  const { className, style, onClick } = props;
  console.log(className)
  return (
    <div
    
    className={className}
    style={{ ...style, display: "block",paddingRight: "10px" }}
      onClick={onClick}
    />)
    }

const settings = {
  dots: true,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 1,
  variableWidth: true,
};

if (type === "slideshow") {

//use media query to convert to straight flex if large screen
  return (
    <div className="pt-4">
      
      <Slider {...settings} className="flex">
        {songs.map((item) => (
          <SongItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
            className="mr-8 h-[200px]"
          />
        ))}
      </Slider>
    </div>
  );
} else if (type === "tiles") {
  return (
    <div
      className="  grid 
  grid-cols-2 
  sm:grid-cols-3 
  md:grid-cols-3 
  lg:grid-cols-4 
  xl:grid-cols-5 
  2xl:grid-cols-8 
  gap-4 
  mt-4"
    >
      {newestSongs}
    </div>
  );
}

}

export default PageContent


