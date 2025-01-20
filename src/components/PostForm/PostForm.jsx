import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RTE, Button, Input, Select } from "../index";
import service from "../../appwrite/service";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, control, watch, setValue, getValues, reset } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const submit = async (data) => {
    console.log("data", data);  

    if (post) {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
      if (file) {
        service.deleteFile(post.image);
      }
      const dbPost = await service.updateBlogs({
        ...data,
        image: file ? file.$id : null,
        userId: userData.userId, // TODO: Check
        blogId: post.$id,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;

      const dbPost = await service.createBlogs({
        userId: userData.$id, // TODO: Check
        ...data,
        image: file.$id,
      });

      if (dbPost) {
        navigate(`/blog/${dbPost.blogId}`);
      } else {
        console.log("error ")
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "-");
    }
    return "";
  });

  useEffect(() => {
    reset({
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    });
    setValue("slug", slugTransform(post?.title || ""));
  }, [post, reset]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col items-center justify-center gap-y-10"
    >
      <Input
        type="text"
        label="Title: "
        placeholder="Enter title"
        className="mt-2"
        {...register("title", { required: true })}
      />
      <Input
        type="text"
        label="Slug: "
        placeholder="Enter slug"
        {...register("slug", { required: true })}
        onInput={(e) => setValue("slug", slugTransform(e.target.value))}
      />
      <RTE control={control} defaultValues={getValues("content")} name={"content"} />
      <Input
        type="file"
        label="Image: "
        className=""
        accepts="iamge/png, image/jpeg, image/jpg"
        {...register("image", {
          required: !post,
        })}
      />
      {post && <img src={service.getPreview(post.image)} alt={post.title} className="w-[600px] rounded-lg"/>}
      <Select
        label="Status: "
        options={["active", "inactive"]}
        className="p-2 rounded-lg px-4"
        {...register("status", { required: true })}
      />
      <button type="submit" className="p-2 px-4 rounded-lg bg-gray-500 text-white">
        {post ? "Update" : "Submit"}
      </button>
    </form>
  );
}

export default PostForm;
