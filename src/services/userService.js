import http from "./httpService";
import getJwt from "./getJwt";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export async function getUserInfo(ID) {
  try {
    const { data } = await http.get(`${apiUrl}/users?id=${ID}`);
    return data;
  } catch (err) {
    return { message: "לא נמצא משתמש", error: err };
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (error) {
    // console.log(error);
    // console.trace();
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

export async function signup(name, email, password, phone) {
  console.log("signup running");
  try {
    await http.post(`${apiUrl}/users`, { name, email, password, phone });
  } catch (err) {
    return err;
  }
}

export default {
  getUserInfo,
  login,
  getCurrentUser,
  logout,
  getJwt,
};
