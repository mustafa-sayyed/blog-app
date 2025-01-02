import { Container } from "../components/index";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "../components";
import service from "../appwrite/service";

function EditPost() {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const post = await service.getBlog(id);
        if (post) {
          setPost(post);
        }
      } else {
        navigate("/");
      }
    };
    fetchPost();
  }, [navigate, id]);

  return post ? (
    <Container>
      <PostForm post={post} />
    </Container>
  ): null;
}

export default EditPost;
