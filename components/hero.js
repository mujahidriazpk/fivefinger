import Image from "next/image";
import Container from "./container";
import heroImg from "../public/img/hero_img.png";
import navImg from "../public/img/nav_bg.png";

const Hero = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center bg-[url('/img/hero_bg.png')] bg-no-repeat bg-center bg-cover h-full">
      <Image
              src={navImg}
              className="flex justify-end w-full"
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
        <Image
              src={heroImg}
              className="flex justify-end"
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
      </div>
    </>
  );
}
export default Hero;