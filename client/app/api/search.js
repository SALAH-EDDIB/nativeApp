import client from "./client";

const endpoint = "/search";

const find = (method) => client.get(endpoint + method);

export default {
  find,
};
