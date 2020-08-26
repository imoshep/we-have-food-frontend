import http from "./httpService";
import { apiUrl } from "../config.json";

export function createFood(form) {
  const formData = new FormData(form);

  return http.post(`${apiUrl}/food`, formData).catch((err) => {
    console.log(err.response.data);
    return err.response.data;
  });
}

export function deleteFood(id) {
  return http.delete(`${apiUrl}/food/${id}`);
}

export function updateFood(id, form) {
  const formData = new FormData(form);
  for (let p of formData) {
    console.log(p);
  }
  return http.put(`${apiUrl}/food/${id}`, formData).catch((err) => {
    return err.response.data;
  });
}

export function searchFoodByFoodId(foodId) {
  return http.get(`${apiUrl}/food?_id=${foodId}`).catch((err) => {
    console.log(err.response.data);
    return err.response.data;
  });
}

export function searchFoodByCity(city) {
  return http.get(`${apiUrl}/food?foodCity=${city}`).catch((err) => {
    console.log(err.response.data);
    return err.response.data;
  });
}

export function searchFoodByCreator(userId) {
  return http.get(`${apiUrl}/food?user_id=${userId}`).catch((err) => {
    console.log(err.response.data);
    return err.response.data;
  });
}

export default {
  createFood,
  deleteFood,
  updateFood,
  searchFoodByFoodId,
  searchFoodByCity,
  searchFoodByCreator,
};

// formData.append("foodLocation", location);

// for (let p of formData) {
//   console.log(p);
// }
