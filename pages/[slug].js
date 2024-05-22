// pages/[slug].js
import Image from "next/image";
import Container from "../components/container";
import ServiceComponent from '../components/ServiceComponent';
import SectionComponent from '../components/SectionComponent';
import Header from "../components/header";
import { gql } from '@apollo/client';
import client from '../lib/apollo';

const GET_PAGE_BY_SLUG = gql`
  query PageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
    }
  }`;

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      {
        pages {
          nodes {
            slug
          }
        }
      }
    `
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

  return {
    props: {
      page: data.page,
    },
    revalidate: 30, // Revalidate the page at most every 60 seconds
  };
}

const Page = ({ page }) => {
  
  const title = "Car Cleaning";
  const title_section = "HOUSE CLEANING SERVICES";
  const title_section2 = "HOUSE CLEANING SERVICES & BUSINESS CLEANING SERVICE";
  return (

    <div>
      <Header />
      {/*}
      <Container>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
 
      </Container>
       
      <ServiceComponent title={title} />
*/}
      <SectionComponent title={title_section} />
      <SectionComponent title={title_section2} />
    </div>
  );
};

export default Page;
