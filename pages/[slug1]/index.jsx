import React, { useEffect, useState } from 'react';
import Head from "next/head";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import SideCards from '../../components/SideCards';
import Footer from '../../components/footer';
import { GET_ALL_CATEGORIES, GET_CATEGORIES_BY_SLUG, GET_SERVICES_BY_LOCATION } from '../../graphql/query';
import apolloClient from '../../lib/apollo';
import Link from 'next/link';

const client = apolloClient();

export const dynamic = 'force-dynamic'

export async function getStaticPaths() {
    const { data } = await client.query({
        query: GET_ALL_CATEGORIES
    });

    const paths = data.categories.nodes.map((category) => ({
        params: {
            slug1: category.slug
        },
    }));

    return {
        paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const { data } = await client.query({
        query: GET_CATEGORIES_BY_SLUG,
        variables: {
            slug: params.slug1,
        },
    });

    if (data.categories.nodes.length < 1) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            page: data.categories,
        },
        revalidate: 60
    };
}

const LocationPage = () => {
    const [locationServices, setLocationServices] = useState([])
    const router = useRouter();

    const { slug1 } = router.query;

    const { data, error, loading } = useQuery(GET_SERVICES_BY_LOCATION, { variables: { location: slug1 } })

    useEffect(() => {
        setLocationServices(data?.services?.nodes?.length > 0 ? data.services.nodes : []);
    }, [data])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
            <div className='text-center relative'>
                {/* <HeroImage src="/atlanta-skyline.jpg" alt="Atlanta Skyline" /> */}
                <div className="flex flex-wrap justify-start bg-[url('/img/location_img.png')] bg-no-repeat bg-left-top bg-cover h-[600px]">
                    <Image
                        src={require("../../public/img/nav_bg_white.png")}
                        className="flex justify-end w-full"
                        alt="Hero Illustration"
                        loading="lazy"
                        placeholder="blur"
                    />
                    <div className="absolute top-0 w-full h-auto text-center mt-10">
                        <div className="text-[#F4660F] text-3xl ">FIVE FINGER DISCOUNT</div>
                        <div className="text-[#F4660F] text-4xl">CLEANING SERVICE</div>
                    </div>

                    <div className="flex flex-col float-left align-bottom justify-end py-0 px-0 w-1/2 text-2xl text-white bg-auto bg-left-bottom bg-[url('/img/heading_bg.png')] bg-no-repeat lg:bg-left-top lg:bg-cover lg:py-6 lg:px-4 lg:w-1/2 lg:text-4xl" >
                        <h1 className='mb-10'>Services IN { slug1 }</h1>
                    </div>
                </div>
                <div className="flex flex-wrap p-10 lg:p-20">
                    <div className='w-full p-0 lg:w-2/3 lg:pr-10 text-left'>
                        {locationServices.map((item) => {
                            return (
                                <Link href={"/" + slug1 + "/" + item.slug}>
                                    <div>
                                        {"Name: " + item.title + "; ID: " + item.id}
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <div className='w-full p-0 mt-4 lg:w-1/3 lg:relative lg:mt-[-300px]'><SideCards services="" /></div>
                </div>


            </div>
            <Footer />
        </>
    )
};

export default LocationPage;