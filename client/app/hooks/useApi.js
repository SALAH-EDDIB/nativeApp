import { useState } from "react";

export default useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState();

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    setError(!response.ok);
    setData(response.data);
    setLoading(false);

    return response;
  };

  return { data, error, loading, request, setData };
};
