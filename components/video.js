import { useState } from "react";
import Image from "next/image";
import Container from "./container";

const Video = (props) => {
  const [playVideo, setPlayVideo] = useState(false);
  return (
    <Container>
      <div className="w-full max-w-4xl mx-auto overflow-hidden lg:mb-20 rounded-2xl ">
        <div
          onClick={() => setPlayVideo(!playVideo)}
          className="relative cursor-pointer aspect-w-16 aspect-h-9 bg-contain">
          {!playVideo && (
            <button className="absolute inset-auto ">
              <Image
                        src={props.videoImage}
                        className="flex m-auto mt-20"
                        width="1000"
                        height="572"
                        loading="lazy"
                    />
            </button>
          )}
          {playVideo && (
            <iframe
              src={props.videoLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Video;