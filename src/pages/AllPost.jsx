import React, { useState, useEffect } from "react";
import { PostCard, Container } from "../components/index";
import service from "../appwrite/service";

function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await service.getAllBlogs();
      if (posts) {
        setPosts(posts.documents);
      }
    };
    fetchPosts();
  });

  console.log("posts", posts);
  return (
    <div>
      <Container>
        <div className="flex flex-wrap justify-center items-center">
          {posts.map((post) => (
            <PostCard {...post} key={post.$id} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
