// components/PostComponent.js

import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://your-wordpress-site.com/graphql';
const graphQLClient = new GraphQLClient(endpoint);

const GET_POST_BY_TITLE = gql`
  query GetPostByTitle($title: String!) {
    posts(where: { title: $title }) {
      nodes {
        id
        title
        content
        postMeta {
          metaKey
          metaValue
        }
      }
    }
  }
`;

const PostComponent = ({ post }) => {
  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <h2>Post Meta:</h2>
      <ul>
        {post.postMeta.map((meta) => (
          <li key={meta.metaKey}>
            <strong>{meta.metaKey}:</strong> {meta.metaValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const fetchPostByTitle = async (title) => {
  const data = await graphQLClient.request(GET_POST_BY_TITLE, { title });
  return data.posts.nodes.length > 0 ? data.posts.nodes[0] : null;
};

export default PostComponent;
