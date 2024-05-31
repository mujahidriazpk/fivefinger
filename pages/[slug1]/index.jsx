import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES, GET_CATEGORIES_BY_SLUG, GET_SERVICES_BY_LOCATION } from '../../graphql/query';
import apolloClient from '../../lib/apollo';

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

    const { data, error, loading } = useQuery(GET_SERVICES_BY_LOCATION, { variables: { location:  slug1} })

    useEffect(() => {
        setLocationServices(data?.services?.nodes?.length > 0 ? data.services.nodes : []);
    }, [data])
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {locationServices.map((item) => {
                return (<div>{"Name: " + item.title + "; ID: " + item.id}</div>)
            })}
        </>
    )
};

export default LocationPage;