import http from "./httpService";
import { apiUrl } from "../config.json";

export function createFood(form) {
  const formData = new FormData(form);

  return http.post(`${apiUrl}/food`, formData).catch((err) => console.log(err));
}

export function searchFoodByFoodId(foodId) {
  return http
    .get(`${apiUrl}/food?_id=${foodId}`)
    .catch((err) => console.log(err.message));
}

export function searchFoodByCity(city) {
  return http
    .get(`${apiUrl}/food?foodCity=${city}`)
    .catch((err) => console.log(err.message));
}

export function searchFoodByCreator(userId) {
  return http
    .get(`${apiUrl}/food?user_id=${userId}`)
    .catch((err) => console.log(err.message));
}

export default {
  createFood,
  searchFoodByFoodId,
  searchFoodByCity,
  searchFoodByCreator,
};

// formData.append("foodLocation", location);

// for (let p of formData) {
//   console.log(p);
// }
