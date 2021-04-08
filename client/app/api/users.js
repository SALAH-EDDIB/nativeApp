import client from "./client";

const register = (userInfo) => client.post("/users/register", userInfo);

export default { register };
