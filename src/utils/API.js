// for localhost testing
// const URL_PREFIX = "http://localhost:3001";
// production
const URL_PREFIX = "https://fic-backend.herokuapp.com";

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
  addFriend: (friendObj, userId) => {
    return fetch(`${URL_PREFIX}/api/users/${userId}/friends`, {
      method: "POST",
      body: JSON.stringify(friendObj),
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
  getUsersByUsername: (username) => {
    return fetch(`${URL_PREFIX}/api/users?username=${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
  addBio: (bioObj, token) => {
    return fetch(`${URL_PREFIX}/api/users`, {
      method: "POST",
      body: JSON.stringify(bioObj),
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    }).then(res => res.json())
  },
  editBio: (bioObj, token) => {
    return fetch(`${URL_PREFIX}/api/users`, {
      method: "PUT",
      body: JSON.stringify(bioObj),
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }
    }).then(res => res.json())
  }
};

export default API;
