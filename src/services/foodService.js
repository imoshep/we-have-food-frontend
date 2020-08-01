import http from "./httpService";
import { apiUrl } from "../config.json";

export function createFood(food) {
  return http.post(`${apiUrl}/food`, food);
}

export default {
  createFood,
};
