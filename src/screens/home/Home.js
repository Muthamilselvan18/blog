import React from "react";
import "./Home.css";
import Post from "../../components/post/Post";
import { UseFetch } from "../../hooks/UseFetch";

function Home() {
  const { data: posts, error, isPending } = UseFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return (
    <div className="container">
      {posts &&
        posts.map((post) => {
          return <Post post={post} key={post.id} />;
        })}

      {error && <h3>{error}</h3>}
      {isPending && <h3>Loading...</h3>}
    </div>
  );
}

export default Home;
