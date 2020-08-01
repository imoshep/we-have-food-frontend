import http from "./httpService";
import { apiUrl } from "../config.json";

export function createFood(food) {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  formData.append("foodTitle", food.foodTitle);
  formData.append("foodDesc", food.foodDesc);
  formData.append("foodImage", food.foodImage ? food.foodImage : null);
  formData.append("foodLocation", food.foodLocation);
  return http.post(`${apiUrl}/food`, formData, config);
}

export default {
  createFood,
};
