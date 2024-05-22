// pages/post1.js

import PostComponent, { fetchPostByTitle } from '../components/PostComponent';

export async function getServerSideProps() {
  const title = "HOUSE CLEANING SERVICES"; // Replace with the actual title of the post
  const post = await fetchPostByTitle(title);
  return {
    props: {
      post,
    },
  };
}

const Post1Page = ({ post }) => {
  return (
    <div>
      <h2>Post 1 Page</h2>
      <PostComponent post={post} />
    </div>
  );
};

export default Post1Page;
