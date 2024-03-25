import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { authorization: token },
  };
  axios
    .post(baseUrl, newObject, config)
    .catch((error) => error.response.data.error);
};

const like = async (id) => {
  const url = `${baseUrl}/${id}`;
  axios.put(url).catch((error) => error);
};

const deleteOne = async (id) => {
  const url = `${baseUrl}/${id}`;

  axios
    .delete(url)
    .then((response) => response)
    .catch((error) => error);
};

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl);
    if (request) {
      return request;
    }
  } catch (error) {
    console.log("FROM THE INSIDE", error, error.message);
    return error;
  }
};

export default { getAll, create, setToken, like, deleteOne };
