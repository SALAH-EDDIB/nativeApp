import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "http://172.16.8.141:5000",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authStorage) return;
  request.headers["x-auth-token"] = authToken;
});

export default apiClient;
