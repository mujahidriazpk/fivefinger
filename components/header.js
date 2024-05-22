import Image from "next/image";
import navImg from "../public/img/nav_bg.png";
import heroImg from "../public/img/hero_img.png";
const Header = ({ header }) => {
    return (
      
      <div>
          <div className="flex flex-wrap justify-center bg-[url('/img/hero_bg.png')] bg-no-repeat bg-center bg-cover h-full">
          <Image
            src={navImg}
            className="flex justify-end w-full"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
          <div className="absolute top-0 w-full h-auto text-center mt-10">
            <div className="text-[#F4660F] text-3xl ">FIVE FINGER DISCOUNT</div>
            <div className="text-[#F4660F] text-4xl">CLEANING SERVICE</div>
          </div>
          <Image
            src={heroImg}
            className="flex justify-end"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </div>
      </div>
    );
  };
  
  export default Header;