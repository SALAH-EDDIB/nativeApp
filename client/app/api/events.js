import client from "./client";

const endpoint = "/event";

const getEvents = () => client.get(endpoint);

export const addEvent = (event, onUploadProgress) => {
  return client.post(endpoint, event, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getEvents,
  addEvent,
};
