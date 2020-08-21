import axios from "axios";
import { toast } from "react-toastify";
import getJwt from "./getJwt";

const mainInstance = axios.create({
  headers: { "x-auth-token": getJwt() },
});

mainInstance.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError)
    toast.error("An unexpected error occured. Please try again later.");
  return Promise.reject(error);
});

export default {
  get: mainInstance.get,
  post: mainInstance.post,
  put: mainInstance.put,
  patch: mainInstance.patch,
  delete: mainInstance.delete,
};
