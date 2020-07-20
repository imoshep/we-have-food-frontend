import http from "./httpService";
import getJwt from "./getJwt";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

export async function signup(name, email, password) {
  try {
    await http.post(`${apiUrl}/users`, { name, email, password });
  } catch (err) {
    return err;
  }
}

export default {
  login,
  getCurrentUser,
  logout,
  getJwt,
};
