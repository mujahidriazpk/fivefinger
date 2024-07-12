import Image from 'next/image';
import Head from "next/head";
import { GET_ALL_CATEGORIES, GET_SERVICES_BY_LOCATION, GET_SERVICES_BY_SLUG, GET_CATEGORIES_BY_SLUG, GET_ALL_SERVICES_EXCEPT_ONE } from '../../graphql/query';
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
    const [service, setService] = useState({})
    const [categoryInfo, setCategoryInfo] = useState({})
    const [otherServices, setOtherServices] = useState([])

    const router = useRouter();
    const { slug1, slug2 } = router.query;

    const { data: category_data, loading: category_loading } = useQuery(GET_CATEGORIES_BY_SLUG, { variables: { slug: slug1 } })
    const { data, loading } = useQuery(GET_SERVICES_BY_SLUG, { variables: { slug: slug2 } })
    const { loading: other_services_loading } = useQuery(
        GET_ALL_SERVICES_EXCEPT_ONE, {
            onCompleted: (data) => {
                setOtherServices(data.services.nodes)
            },
            skip: !service.id, 
            variables: { excludedId: service.id }
        }
    )

    useEffect(() => {
        setService(data?.services?.nodes?.length > 0 ? data.services.nodes[0] : {});
    }, [data]);

    useEffect(() => {
        setCategoryInfo(category_data?.categories?.nodes?.length > 0 ? category_data.categories.nodes[0] : {})
    }, [category_data])

    if (loading || category_loading) return <div>Loading...</div>;

    return (
        <>
            <Head>
                <title>{service.title} in {categoryInfo.name} | FIVE FINGER DISCOUNT CLEANING SERVICE</title>
                <meta
                    name="description"
                    content={`${service.title} in ${slug1} | FIVE FINGER DISCOUNT CLEANING SERVICE`}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='text-center relative'>
                <div 
                    className="flex flex-wrap justify-start bg-no-repeat bg-left-top bg-cover h-[600px]"
                    style={{ backgroundImage: `url(${categoryInfo?.categoryFields?.categoryPageImage ?? "/img/location_img.png"})` }}
                >
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
                        <h1 className='mb-10'>{service.title} IN {slug1}</h1>
                    </div>
                </div>
                <div className="flex flex-wrap p-10 lg:p-20">
                    <div className='w-full p-0 lg:w-2/3 lg:pr-10 text-left font-shadows'>
                        <div dangerouslySetInnerHTML={{ __html: service?.content?.replace("[CITY]", categoryInfo?.name) }} />
                    </div>
                    <div className='w-full p-0 mt-4 lg:w-1/3 lg:relative lg:-mt-72'>
                        <SideCards services={otherServices} servicesLoading={other_services_loading} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default ServicePage;