import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../graphql/query";

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
      <footer className="footer p-10 bg-white text-black border-black border-t-2 flex justify-center items-center">
        <nav className="w-3/4">
          <h6 className="footer-title">Locations</h6>
          <div className="grid grid-cols-2 lg:grid-cols-10 gap-1 sm:gap-1">
            {categories.map((item, index) => {
              return (<Link href={`/${item.slug}`} key={index} className="link link-hover">{item.name}</Link>)
            })}
          </div>
        </nav>
      </footer>
    </div>
  );
}