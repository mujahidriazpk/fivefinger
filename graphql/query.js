// file for graphql queries.
import { gql } from '@apollo/client';

export const GET_SECTION_BY_TITLE = gql`
  query GetSectionByTitle($title: String!) {
    sections(where: { title: $title }) {
      nodes {
        id
        title
        content
        sectionsFields{
            layout
            hasBackgroundImage
            mainImage
        }
      }
    }
  }
`;


export const GET_SECTION_BY_CATEGORY = gql`
  query GetSectionByTitle($category: String!) {
    sections(where: { categoryName: $category }) {
      nodes {
        id
        title
      }
    }
  }
`;


export const GET_PAGE_BY_SLUG = gql`
  query PageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
    }
}`;


export const GET_ALL_CATEGORIES = gql`
    query GetCategories {
        categories {
            nodes {
                id
                name
            }
        }
    }
`

export const GET_ALL_PAGES = gql`
    query GetPages {
        pages {
            nodes {
                slug
            }
        }
    }
`