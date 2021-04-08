import client from "./client";

const endpoint = "/posts";

const getPosts = () => client.get(endpoint);

export const addPost = (post, onUploadProgress) => {
  const data = new FormData();
  data.append("title", post.title);

  data.append("content", post.content);

  post.images.forEach((image, index) =>
    data.append("image", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const savePost = (postId) => client.post(endpoint + "/save/post", postId);

const getSavePost = (postId) => client.get(endpoint + "/save/post/" + postId);

const getSavePosts = (postId) => client.get(endpoint + "/save/post");

const unsavePost = (Id) => client.delete(endpoint + "/save/post/" + Id);

export default {
  addPost,
  getPosts,
  savePost,
  unsavePost,
  getSavePost,
  getSavePosts,
};
