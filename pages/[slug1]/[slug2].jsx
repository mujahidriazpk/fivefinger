import Image from 'next/image';
import { GET_ALL_CATEGORIES, GET_SERVICES_BY_LOCATION, GET_SERVICES_BY_SLUG,GET_CATEGORIES_BY_SLUG } from '../../graphql/query';
import apolloClient from '../../lib/apollo';
import SideCards from '../../components/SideCards';
import Footer from '../../components/footer';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

const client = apolloClient();

export const dynamic = 'force-dynamic'

export async function getStaticPaths() {
    const { data: locationsData } = await client.query({
        query: GET_ALL_CATEGORIES,
    });

    const paths = [];

    for (const location of locationsData.categories.nodes) {
        const { data: servicesData } = await client.query({
            query: GET_SERVICES_BY_LOCATION,
            variables: {
                location: location.slug,
            },
        });

        servicesData.services.nodes.forEach(service => {
            paths.push({
                params: { slug1: location.slug, slug2: service.slug }
            });
        });
    }

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps({ params }) {

    const { slug2 } = params;

    const { data } = await client.query({
        query: GET_SERVICES_BY_SLUG,
        variables: {
            slug: slug2,
        },
    });

    if (data.services.nodes.length < 1) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            page: data.services,
        },
        revalidate: 60
    };
}


const ServicePage = () => {
    // const [locationServices, setLocationServices] = useState([])
    // const router = useRouter();

    // const { slug1 } = router.query;

    // const { data, error, loading } = useQuery(GET_SERVICES_BY_LOCATION, { variables: { location: slug1 } })

    // useEffect(() => {
    //     setLocationServices(data?.services?.nodes?.length > 0 ? data.services.nodes : []);
    // }, [data])

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>{error}</div>;


    //     const Pricing = styled.div`
    //   width: 45%;
    //`;
    
    const router = useRouter();
    //const { slug1 } = router.query;
    //const [locations, setLocations] = useState({})
    //const { data_2, error_2, loading_2 } = useQuery(GET_CATEGORIES_BY_SLUG, { variables: { slug: slug1 } })
    //useEffect(() => {
      //  setLocations(data?.categories?.nodes?.length > 0 ? data.categories.nodes[0] : {});
    //}, [data_2]);
    //if (!loading_2) {
      //  console.log(locations);
    //}

    const { slug2 } = router.query;
    const [locationServices, setLocationServices] = useState({})
    const { data, error, loading } = useQuery(GET_SERVICES_BY_SLUG, { variables: { slug: slug2 } })
    useEffect(() => {
        setLocationServices(data?.services?.nodes?.length > 0 ? data.services.nodes[0] : {});
    }, [data]);
    if (!loading) {
        //console.log(locationServices);
    }
    
    const services = ["Home Cleaning", "Carpet Cleaning", "Deep Cleaning", "Gutter Cleaning", "Trash Can Cleaning", "Window Cleaning", "Drain Cleaning"]

    return (
        <>
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
                    
                <div className="flex flex-wrap float-left  py-6 px-4 w-1/2 text-4xl text-white bg-[url('/img/heading_bg.png')] bg-no-repeat bg-left-top bg-cover" >
                    <h1>{locationServices.title} IN ATLANTA, GA</h1>
                </div>
                </div>
                <div className="flex flex-wrap p-20">
                    <div className='w-2/3 pr-10'><div dangerouslySetInnerHTML={{ __html: locationServices.content }} /></div>
                    <div className='w-1/3 relative mt-[-300px]'><SideCards services={services} /></div>
                </div>


            </div>
            <Footer />
        </>
    )
};

export default ServicePage;