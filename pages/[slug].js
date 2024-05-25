// pages/[slug].js
// import Image from "next/image";
// import Container from "../components/container";
// import ServiceComponent from '../components/ServiceComponent';

import SectionComponent from '../components/SectionComponent';
import Header from "../components/header";
import { useQuery } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { GET_ALL_PAGES, GET_PAGE_BY_SLUG, GET_SECTION_BY_CATEGORY } from "../graphql/query";
import { useEffect, useState } from "react";
import FAB from '../components/fab';
import { useRouter } from 'next/router';
import Head from 'next/head';

const client = apolloClient();

export const dynamic = 'force-dynamic'

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_PAGES
  });

  const paths = data.pages.nodes.map((page) => ({
    params: { slug: page.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // Enable fallback to server-side rendering
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_PAGE_BY_SLUG,
    variables: {
      slug: params.slug,
    },
  });
  
  //pushed user to 404 page is slug manually entered doesn't exist
  if (!data.page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page: data.page,
    },
    revalidate: 30, // Revalidate the page at most every 60 seconds
  };
}

const Page = ({page}) => {

  const [catgorizedSection, setCatgorizedSection] = useState([]); //array to store the titles fetched from backend
  const router = useRouter();

  //Made use of useQuery hook of apollo for optimized cliet-end fetch
  const { data, error, loading } = useQuery(GET_SECTION_BY_CATEGORY, { variables: { category: router.query["category"] ?? "Atlanta" } })

  useEffect(() => {
    //Set the data as soon as its fetched
    if (data) {
      setCatgorizedSection(data.sections.nodes.length > 0 ? data.sections.nodes : []);
    }
  }, [data])

  useEffect(() => {
    if (!router.query.category) {
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, category: 'Atlanta' }
      }, undefined, { shallow: true });
    }
  }, [router.query.category]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!catgorizedSection) return <div>Section not found</div>;

  return (
    <>
    <Head>
      <title>{page.title}</title>
    </Head>
    <div>
      <FAB />
      <Header />
      {
      catgorizedSection.map(
        (item) => <SectionComponent title={item.title} key={item.id} />
        )
      }
    </div>
    </>
  );
};

export default Page;
