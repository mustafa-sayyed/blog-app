import config from "../config/config";
import { Client, ID, Databases, Query, Account, Storage } from "appwrite";

class Service {
  client = new Client();
  account;
  database;
  bucket;
  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getBlog(blogId) {
    try {
      const res = await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId
      );
      return res;
    } catch (error) {
      console.log("Error in getting blog: ", error);
    }
  }

  async getAllBlogs(queries = [Query.equal("status", "active")]) {
    try {
      const res = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
      return res;
    } catch (error) {
      console.log("Error in getting all blogs: ", error);
    }
  }

  async createBlogs({ title, content, image, status, userId }) {
    try {
      const blogId = ID.unique();
      const res = await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId,
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
      return { res, blogId };
    } catch (error) {
      console.log("Error in creating blogs: ", error);
    }
  }

  async updateBlogs({ title, content, image, status, userId, blogId }) {
    try {
      const res = await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId,
        {
          title,
          content,
          image,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Error in updating blogs: ", error);
    }
  }

  async deleteBlogs(blogId) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        blogId
      );
      return true;
    } catch (error) {
      console.log("Error in deleting blogs: ", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(config.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("Error in storing image: ", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Error in deleting file: ", error);
      return false;
    }
  }

  getPreview(fileId) {
    try {
      return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
    } catch (error) {
      console.log("Error in getting file preview: ", error);
    }
  }
}

const service = new Service();
export default service;
