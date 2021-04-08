import client from "./client";

const endpoint = "/comments";

const getComments = (method) => client.get(endpoint + "/" + method);

const postComments = (commentinfo) => client.post(endpoint, commentinfo);

const deleteComments = (id) => client.delete(endpoint + "/" + id);

export default {
  getComments,
  postComments,
  deleteComments,
};
