import Image from "next/image";
import Head from "next/head";
import Container from "../components/container";
import SectionTitle from "../components/sectionTitle";
import heroImg from "../public/img/hero_img.png";
import navImg from "../public/img/nav_bg.png";
import house from "../public/img/house.png";
import cleanerImg1 from "../public/img/cleaner-1.png";
import stepImg1 from "../public/img/step1.png";
import stepImg2 from "../public/img/step2.png";
import stepImg3 from "../public/img/step3.png";
import moneyImg from "../public/img/money.png";
import smileImg from "../public/img/smile.png";
import btnsignupImg from "../public/img/btn_signup.png";
import jetImg from "../public/img/jet_clean.png";

const Home = () => {
  return (
    <>
      <Head>
        <title>FIVE FINGER DISCOUNT CLEANING SERVICE</title>
        <meta
          name="description"
          content="FIVE FINGER DISCOUNT CLEANING SERVICE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-wrap justify-center bg-[url('/img/hero_bg.png')] bg-no-repeat bg-center bg-cover h-full">
        <Image
          src={navImg}
          className="flex justify-end w-full"
          alt="Hero Illustration"
          loading="eager"
          placeholder="blur"
        />
        <div className="absolute top-0 w-full h-auto text-center">
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
      <Container>
        <div className="text-[#F4660F] text-4xl text-center">HOUSE CLEANING SERVICES</div>
        <Image
          src={cleanerImg1}
          className="flex m-auto my-20"
          alt="Hero Illustration"
          loading="eager"
          placeholder="blur"
        />
      </Container>
      <Container>
        <div className="text-[#F4660F] text-4xl text-center uppercase">HOUSE CLEANING SERVICES & <br />Business Cleaning Service</div>
      </Container>
      <div className="flex flex-wrap justify-center h-full">
        <Image
          src={house}
          className="flex justify-end w-full"
          alt="Hero Illustration"
          loading="eager"
          placeholder="blur"
        />
      </div>
      <Container>
        <div className="text-[#F4660F] text-4xl text-center uppercase">3 steps to get cleaned out</div>
      </Container>
      <SectionTitle
        pretitle=""
        title="">
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col justify-between text-center w-full h-full">
            <Image
              src={stepImg1}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
          <div className="flex flex-col justify-center text-center w-full h-full">
            <Image
              src={stepImg2}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
          <div className="flex flex-col justify-between text-center w-full h-full">
            <Image
              src={stepImg3}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </SectionTitle>
      <div className="flex flex-wrap bg-[#FFEDE2]">
        <Container className="flex flex-wrap py-0 justify-center text-centers">
          <Image
            src={moneyImg}
            className="flex m-auto pt-20 pb-10"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
          <div className="text-[#F4660F] text-4xl text-center uppercase">Pricing - how much i charge</div>
          <SectionTitle className="m-0">
            <div className="text-[#000000] text-base text-center font-shadows">My pricing is upfront & non negotiable. I charge the same rate as my lawyer. $500 per hour with an eight hour minimum which totals $4,500 for the days work. Full payment due before service in small unmarked bills.</div>
            <div className="text-[#000000] text-base text-center py-10 font-shadows">No refunds, No guarantees.</div>
            <div className="text-[#000000] text-base text-center font-shadows">Please note i require a private jet to pick me up from an anonymous location. If no private jet is provided first class air fare is an additional charge. Additional hidden fees are for cleaning supplies and an unmarked car for quick get away.</div>
          </SectionTitle>
          <div className="max-w-2xl py-4 text-lg leading-normal">
            <div className="grid gap-5 grid-cols-3">
            <Image
            src={smileImg}
            className="flex m-auto"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
            />
            <Image
            src={btnsignupImg}
            className="flex m-auto"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
          <Image
            src={smileImg}
            className="flex m-auto"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
            </div>
          </div>
          <Image
            src={jetImg}
            className="flex m-auto my-20"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </Container>
      </div>
      <Container className="flex flex-wrap justify-center text-centers">
        <div className="text-[#F4660F] text-4xl text-center uppercase">CLEANING SERVICES I PROVIDE</div>
        </Container>
    </>
  );
}

export default Home;