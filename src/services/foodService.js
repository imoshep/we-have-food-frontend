import http from "./httpService";
import { apiUrl } from "../config.json";

export function createFood(form) {
  const formData = new FormData(form);
  return http.post(`${apiUrl}/food`, formData);
}

export default {
  createFood,
};
