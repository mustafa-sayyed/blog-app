import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/service";

function PostCard({ $id, title, image }) {
  console.log(`PostCard: ${$id}, ${title}, ${image}`);
  return (
    <Link to={`/blog/${$id}`}>
      <div className="w-full p-4 rounded-lg bg-gray-600">
        <img src={service.getPreview(image)} alt={title} className="rounded-lg w-80"/>
        <h2>{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
