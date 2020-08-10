import http from "./httpService";
import { apiUrl } from "../config.json";

export function createFood(form, location) {
  const formData = new FormData(form);
  formData.append("foodLocation", location);

  for (let p of formData) {
    console.log(p);
  }

  return http.post(`${apiUrl}/food`, formData).catch((err) => console.log(err));
}

export default {
  createFood,
};
