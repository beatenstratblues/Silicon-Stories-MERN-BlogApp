import React, { useEffect, useState } from "react";
import BlogPost from "../components/BlogPost";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/posts").then((res) => {
      res.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);
  return <div>
    {
      posts.map((a)=>{
        return <BlogPost Postdata={a} key={a._id}/>
      })
    }
  </div>;
};

export default IndexPage;
