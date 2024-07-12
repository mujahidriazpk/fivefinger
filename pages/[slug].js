// pages/[slug].js
import Image from "next/image";
import Container from "../components/container";
import navImg from "../public/img/nav_bg.png";
import heroImg from "../public/img/hero_img.png";
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
  return (
    
    <div>
        <div className="flex flex-wrap justify-center bg-[url('/img/hero_bg.png')] bg-no-repeat bg-center bg-cover h-full">
        <Image
          src={navImg}
          className="flex justify-end w-full"
          alt="Hero Illustration"
          loading="eager"
          placeholder="blur"
        />
        <div className="absolute top-0 w-full h-auto text-center mt-10">
          <div className="text-[#F4660F] text-3xl ">FIVE FINGER DISCOUNT</div>
          <div className="text-[#F4660F] text-4xl">CLEANING SERVICE</div>
        </div>
        <Image
          src={heroImg}
          className="flex justify-end"
          alt="Hero Illustration"
          loading="eager"
          placeholder="blur"
        />
      </div>
      <Container>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </Container>
    </div>
  );
};

export default Page;
