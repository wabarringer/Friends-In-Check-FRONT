const URL_PREFIX = "TODO: DEPLOYED BACKEND HERE";

const API = {
  login:loginObj=>{
    return fetch(`${URL_PREFIX}/api/users/login`,{
        method:"POST",
        body:JSON.stringify(loginObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json())
  },
  signup:signupObj=>{
      return fetch(`${URL_PREFIX}/api/users`,{
          method:"POST",
          body:JSON.stringify(signupObj),
          headers:{
              "Content-Type":"application/json"
          }
      }).then(res=>res.json())
  },
};

export default API;