const tokenKey = "token";

export default function getJwt() {
  return localStorage.getItem(tokenKey);
}
