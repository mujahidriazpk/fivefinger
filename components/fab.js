import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../graphql/query";
import useDebounce from "../hooks/useDebounce";

export default function FAB({ transparent = true }) {
    const [categories, setCategories] = useState([]);
    const {data, error, loading} = useQuery(GET_ALL_CATEGORIES)
    const categoryRef = useRef(categories)
    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);

    const [OpenNav, setOpenNav] = useState(false);

    const handleMenu = () => {
        setOpenNav(!OpenNav)
    }

    useEffect(() => {
        if (data) {
            setCategories(data.categories.nodes.length > 0 ? data.categories.nodes : []);
            categoryRef.current = data.categories.nodes
        }
    }, [data])

    useEffect(() => {
        if (debouncedValue === ""){
            setCategories(categoryRef.current)
        } else {
            const userInput = debouncedValue.toLowerCase();
            const filteredCities = categoryRef.current.filter((city) => city.name.toLowerCase().startsWith(userInput));
            setCategories(filteredCities)
        }
    }, [debouncedValue]);

    const handleChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <>
            <header className=" w-full">
                <figure
                    className="bg-white/30 p-1 absolute right-4 top-4 rounded-full"
                    onClick={handleMenu}
                >
                    <Image
                        src={OpenNav ? "/svg/x.svg" : "/svg/menu.svg"}
                        alt="menu"
                        width={100}
                        height={100}
                        className={OpenNav ? "w-12 h-12 p-1" : "w-12 h-12"}
                    />
                </figure>
                {OpenNav && (
                    <div className="absolute  w-full md:w-[380px] px-6 right-0 z-10  top-20">
                        <nav className={"flex flex-col gap-4 font-semibold text-2xl p-6 rounded-2xl overflow-hidden " + (transparent ? "bg-white/60" : "bg-white")}>
                            <input
                                className="rounded-md pl-7 bg-[url('/svg/search.svg')] bg-no-repeat bg-left"
                                type="text"
                                placeholder="Location"
                                value={searchValue}
                                onChange={handleChange}
                            />
                            {categories.map((item) => {
                                return (
                                    <Link
                                        onClick={() => setOpenNav(!OpenNav)}
                                        className="hover:tracking-widest font-kammerlander transition-all duration-300 ease-in-out hover:text-green-700"
                                        href={"/sample-page?category=" + item.name}
                                        key={item.id}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                )}

            </header>
        </>
    );
}
