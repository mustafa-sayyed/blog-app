import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import service from "../appwrite/service";
import { Button, Container } from "../components/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const post = await service.getBlog(id);
        if (post) setPost(post);
        else navigate("/");
      } else {
        navigate("/");
      }
    };
    fetchPost();
  });


  const deletePost = async () => {
    const status = await service.deleteBlogs(post.$id);
    if (status) {
      await service.deleteFile(post.image);
      navigate("/");
    }
  };

  const isAuthorised = post && userData ? post.userId === userData.$id : false;
  return post ? (
    <div className="p-4">
      <Container>
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <img src={service.getPreview(post.image)} alt={"sd"} />
          <h2>{post.title}</h2>
          <div>{parse(String(post.content))}</div>
        </div>
        {isAuthorised && (
          <div>
            <Link to={`/edit-blog/${post.$id}`}>
              <Button bgColor="bg-green-500">Edit Post</Button>
            </Link>
            <Button onClick={deletePost} bgColor="bg-red-500">
              Delete Post
            </Button>
          </div>
        )}
      </Container>
    </div>
  ) : null;
}

export default Post;
