import axios from "axios";

const setAuthToken = (token) => {
  axios.defaults.headers.common["x-auth-token"] = token;
};

export default setAuthToken;
