import React, { useState, useEffect } from "react";
import service from "../appwrite/service";
import { Container, PostCard } from "../components/index";
import { set } from "react-hook-form";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const allpost = await service.getAllBlogs();
      if (allpost) {
        setPosts(allpost.documents);
      }
    };
    fetchPost();
  }, []);

  if (posts.length > 0) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Container>
          <h1>
            NO Blogs <br /> Add new Blog to see here
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Container>
        {posts.map((post) => (
          <div key={post.$id}>
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Home;
