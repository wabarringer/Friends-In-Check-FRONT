document.querySelector("#signUpForm").addEventListener("submit",e=>{
    e.preventDefault();
    const signupObj = {
        email:document.querySelector("#signUpEmail").value,
        password:document.querySelector("#signUpPw").value,
        username:document.querySelector("#signupUsername").value
    }
    console.log(signupObj)
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(signupObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/profile"
        } else {
            alert("signup failed")
        }
    })
})