// const URL_PREFIX = "http://localhost:3001";
// production
//const URL_PREFIX = "https://fic-backend.herokuapp.com/"
const URL_PREFIX = "http://localhost:3001";

const API = {
  isValidToken: (token) => {
    return fetch(`${URL_PREFIX}/api/users/isValidToken`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },
  login: (loginObj) => {
    return fetch(`${URL_PREFIX}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(loginObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
  signup: (signupObj) => {
    return fetch(`${URL_PREFIX}/api/users/signup`, {
      method: "POST",
      body: JSON.stringify(signupObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
  getUsersById: (userId) => {
    return fetch(`${URL_PREFIX}/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};

export default API;
