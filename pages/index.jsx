import Image from "next/image";
import Head from "next/head";
import Container from "../components/container";
import Video from "../components/video";
import SectionTitle from "../components/sectionTitle";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../graphql/query";
import ListImage from "../components/ListImage";

const Home = () => {


  const [categories, setCategories] = useState([]);

  const { data, error, loading } = useQuery(GET_ALL_CATEGORIES)

  useEffect(() => {
    //Set the data as soon as its fetched
    if (data) {
      setCategories(data.categories.nodes.length > 0 ? data.categories.nodes : []);
    }
  }, [data])

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
          src={require("../public/img/nav_bg.png")}
          className="flex justify-end w-full"
          alt="Hero Illustration"
          loading="lazy"
          placeholder="blur"
        />
        <div className="absolute top-0 w-full h-auto text-center mt-10">
          <div className="text-[#F4660F] text-3xl ">FIVE FINGER DISCOUNT</div>
          <div className="text-[#F4660F] text-4xl">CLEANING SERVICE</div>
        </div>
        <Image
          src={require("../public/img/hero_img.png")}
          className="flex justify-end"
          alt="Hero Illustration"
          loading="lazy"
          placeholder="blur"
        />
      </div>
      <Container>
        <div className="text-[#F4660F] text-4xl text-center">HOUSE CLEANING SERVICES</div>
        <Image
          src={require("../public/img/cleaner-1.png")}
          className="flex m-auto mt-20"
          alt="Hero Illustration"
          loading="lazy"
          placeholder="blur"
        />
      </Container>
      <Container>
        <div className="text-[#F4660F] text-4xl text-center uppercase">HOUSE CLEANING SERVICES & <br />Business Cleaning Service</div>
      </Container>
      <div className="flex flex-wrap justify-center h-full">
        <Image
          src={require("../public/img/house.png")}
          className="flex justify-end w-full"
          alt="Hero Illustration"
          loading="lazy"
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
              src={require("../public/img/step1.png")}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="lazy"
              placeholder="blur"
            />
          </div>
          <div className="flex flex-col justify-center text-center w-full h-full">
            <Image
              src={require("../public/img/step2.png")}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="lazy"
              placeholder="blur"
            />
          </div>
          <div className="flex flex-col justify-between text-center w-full h-full">
            <Image
              src={require("../public/img/step3.png")}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="lazy"
              placeholder="blur"
            />
          </div>
        </div>
      </SectionTitle>
      <div className="flex flex-wrap bg-[#FFEDE2]">
        <Container className="flex flex-wrap py-0 justify-center text-centers">
          <Image
            src={require("../public/img/money.png")}
            className="flex m-auto pt-20 pb-10"
            alt="Hero Illustration"
            loading="lazy"
            placeholder="blur"
          />
          <div className="text-[#F4660F] text-4xl text-center uppercase w-full">Pricing - how much i charge</div>
          <SectionTitle className="m-0">
            <div className="text-[#000000] text-base text-center font-shadows">My pricing is upfront & non negotiable. I charge the same rate as my lawyer. $500 per hour with an eight hour minimum which totals $4,500 for the days work. Full payment due before service in small unmarked bills.</div>
            <div className="text-[#000000] text-base text-center py-10 font-shadows">No refunds, No guarantees.</div>
            <div className="text-[#000000] text-base text-center font-shadows">Please note i require a private jet to pick me up from an anonymous location. If no private jet is provided first class air fare is an additional charge. Additional hidden fees are for cleaning supplies and an unmarked car for quick get away.</div>
          </SectionTitle>
          <div className="max-w-2xl py-4 text-lg leading-normal">
            <div className="grid gap-5 grid-cols-3">
              <Image
                src={require("../public/img/smile.png")}
                className="flex m-auto"
                alt="Hero Illustration"
                loading="lazy"
                placeholder="blur"
              />
              <Image
                src={require("../public/img/btn_signup.png")}
                className="flex m-auto"
                alt="Hero Illustration"
                loading="lazy"
                placeholder="blur"
              />
              <Image
                src={require("../public/img/smile.png")}
                className="flex m-auto"
                alt="Hero Illustration"
                loading="lazy"
                placeholder="blur"
              />
            </div>
          </div>
          <Image
            src={require("../public/img/jet_clean.png")}
            className="flex m-auto my-20"
            alt="Hero Illustration"
            loading="lazy"
            placeholder="blur"
          />
        </Container>
      </div>

      <Container className="flex justify-center text-centers">
        <div className="flex flex-row text-[#F4660F] text-4xl text-center uppercase">CLEANING SERVICES I PROVIDE</div>
      </Container>
      <SectionTitle
        pretitle=""
        title="">
        <div className="grid gap-48 lg:grid-cols-2 xl:grid-cols-2">
          <div className="flex flex-col justify-between text-center w-full h-full">
            <ul>
              <li className="flex items-center mb-2 font-shadows">
                <ListImage/>
                Home Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <ListImage />
                Carpet Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <ListImage />
                Deep Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <ListImage />
                Gutter Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <ListImage />
                Trash Can Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <ListImage />
                Window Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <ListImage />
                Drain Cleaning
              </li>

            </ul>
          </div>
          <div className="flex flex-col justify-center text-center w-full h-full">
            <ul>
              <li className="flex items-center mb-2 font-shadows">
                <svg className="w-5 h-5 mr-2" fill="#DBDBDB" stroke="#DBDBDB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"></path>
                </svg>
                Commercial Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <svg className="w-5 h-5 mr-2" fill="#DBDBDB" stroke="#DBDBDB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"></path>
                </svg>
                Pool Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <svg className="w-5 h-5 mr-2" fill="#DBDBDB" stroke="#DBDBDB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"></path>
                </svg>
                Couch Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <svg className="w-5 h-5 mr-2" fill="#DBDBDB" stroke="#DBDBDB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"></path>
                </svg>
                Air Duct Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <svg className="w-5 h-5 mr-2" fill="#DBDBDB" stroke="#DBDBDB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"></path>
                </svg>
                Rug Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <svg className="w-5 h-5 mr-2" fill="#DBDBDB" stroke="#DBDBDB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"></path>
                </svg>
                Floor Cleaning
              </li>
              <li className="flex items-center mb-2 font-shadows">
                <svg className="w-5 h-5 mr-2" fill="#DBDBDB" stroke="#DBDBDB" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"></path>
                </svg>
                Car Cleaning
              </li>

            </ul>
          </div>
        </div>
      </SectionTitle>
      <Container className="flex flex-wrap py-0 justify-center text-centers">
        <Image
          src={require("../public/img/dinning.png")}
          className="flex m-auto my-20"
          alt="Hero Illustration"
          loading="lazy"
          placeholder="blur"
        />
      </Container>
      <div className="flex flex-wrap py-20 pl-30 justify-center bg-[url('/img/stair.png')] bg-no-repeat bg-left-top bg-cover h-full">
        <Image
          src={require("../public/img/service_list.png")}
          className="flex justify-end"
          alt="Hero Illustration"
          loading="lazy"
          placeholder="blur"
        />
      </div>
      <Container className="flex justify-center text-centers">
        <div className="flex flex-row text-[#F4660F] text-4xl text-center uppercase">Customer Reviews</div>
      </Container>
      <div className="flex flex-wrap py-20 pl-30 justify-center bg-[url('/img/testimonial.png')] bg-no-repeat bg-left-top bg-cover h-[600px]">

      </div>
      <Container className="flex flex-wrap py-0 justify-center text-centers">
        <div className="max-w-2xl py-4 text-lg leading-normal">
          <div className="grid gap-5 grid-cols-3">
            <Image
              src={require("../public/img/smile.png")}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="lazy"
              placeholder="blur"
            />
            <Image
              src={require("../public/img/btn_review.png")}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="lazy"
              placeholder="blur"
            />
            <Image
              src={require("../public/img/smile.png")}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="lazy"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      <div className="flex flex-wrap relative pl-30 justify-center">
        <Container className="">
          <div className="text-[#F4660F] text-4xl text-center">SHOP CLEANING SUPPLIES</div>
          <Image
            src={require("../public/img/car.png")}
            className="flex m-auto mt-5"
            alt="Hero Illustration"
            loading="lazy"
            placeholder="blur"
          />
        </Container>

        <Image
          src={require("../public/img/hand.png")}
          className="flex m-auto my-20 absolute right-0 top-52"
          alt="Hero Illustration"
          loading="lazy"
          placeholder="blur"
        />
      </div>
      <Container className="pt-0">
        <div className="text-[#000000] text-base text-center font-shadows">My cleaning supplies are the best. Extremely good in removing finger prints</div>
      </Container>
      <Container className="flex flex-wrap py-0 justify-center text-centers">
        <div className="max-w-2xl py-4 text-lg leading-normal">
          <div className="grid gap-5 grid-cols-3">
            <Image
              src={require("../public/img/smile.png")}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="lazy"
              placeholder="blur"
            />
            <Image
              src={require("../public/img/btn_review.png")}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="lazy"
              placeholder="blur"
            />
            <Image
              src={require("../public/img/smile.png")}
              className="flex m-auto"
              alt="Hero Illustration"
              loading="lazy"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      <div className="flex flex-g py-20 pl-30 justify-center bg-[url('/img/map_bg.png')] bg-no-repeat bg-left-top bg-cover h-full">
       {/*<div className="text-[#F4660F] text-4xl text-center uppercase m-auto">MY top 10 service areas</div>*/}
        <Image
          src={require("../public/img/map.png")}
          className="m-auto mt-96"
          alt="Hero Illustration"
          loading="lazy"
          placeholder="blur"
        />

      </div>
      <Container className="flex justify-center text-centers pb-0">
        <div className="flex flex-row text-[#F4660F] text-4xl text-center uppercase">120+ Things to clean</div>
      </Container>
      <Video />
      <footer className="footer p-10 bg-white text-black border-black border-t-2 flex justify-center items-center">
        <nav className="w-3/4">
          <h6 className="footer-title">Locations</h6>
          <div className="grid grid-cols-2 lg:grid-cols-10 gap-1 sm:gap-1">
            {categories.map((item, index) => {
              return (<Link href={item.slug} key={index} className="link link-hover">{item.name}</Link>)
            })}
          </div>
        </nav>
      </footer>
    </>
  );
}

export default Home;