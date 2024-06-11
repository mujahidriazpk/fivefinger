import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../graphql/query";
import SocialButtons from '../components/SocialButtons';

export default function Footer() {
  const [categories, setCategories] = useState([]);

  const { data, error, loading } = useQuery(GET_ALL_CATEGORIES)

  useEffect(() => {
    //Set the data as soon as its fetched
    if (data) {
      setCategories(data.categories.nodes.length > 0 ? data.categories.nodes : []);
    }
  }, [data])
  return (
    <div >
      <footer className="footer  flex p-10 bg-[#333333] text-white border-white border-t-2 lg:p-20">
        <div className="w-1/6 justify-start">
        <Link href="/"  className="link link-hover text-base">HOME</Link>
        <Link href=""  className="link link-hover text-base">ABOUT US</Link>
        <Link href=""  className="link link-hover text-base">CONTACT US</Link>
        
        <SocialButtons />
        </div>
        <nav className="w-5/6">
          <h6 className="text-base">SERVICE CITIES</h6>
          <div className="grid grid-cols-2 lg:grid-cols-8 gap-10 sm:gap-4">
            {categories.map((item, index) => {
              return (<Link href={`/${item.slug}`} key={index} className="text-xs link link-hover">{item.name}</Link>)
            })}
          </div>
        </nav>
      </footer>
    </div>
  );
}