import http from "./httpService";
import getJwt from "./getJwt";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";


export function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (error) {
    return error;
  }
}

export async function getUserInfo(userId) {
  try {
    const { data } = await http.get(`${apiUrl}/users?id=${userId}`);
    return data;
  } catch (err) {
    return { message: "לא נמצא משתמש", error: err };
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
  return data.token;
}


export function logout() {
  localStorage.removeItem(tokenKey);
}

export async function signup(name, email, password, phone) {
  await http.post(`${apiUrl}/users`, { name, email, password, phone }).catch((err) => {
    return err.response;
  });
}

export function updateFavorites(array) {
  return http.patch(`${apiUrl}/users/favorites`, array).catch((err) => {
    return err.response;
  });
}

export function getFavorites(userId) {
  return http.get(`${apiUrl}/users/favorites?id=${userId}`).catch((err) => {
    return err.response;
  })
}

export function removeFavorites(array) {
  console.log("running from userService");
  return http.post(`${apiUrl}/users/favorites`, array).catch((err) => {
    return err.response;
  })
}


export default {
  getCurrentUser,
  getUserInfo,
  login,
  logout,
  signup,
  updateFavorites,
  removeFavorites
};
