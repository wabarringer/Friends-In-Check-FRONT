document.querySelector("#loginForm").addEventListener("submit",e=>{
    e.preventDefault();
    const loginObj = {
        email:document.querySelector("#loginEmail").value,
        password:document.querySelector("#loginPw").value
    }
    console.log(loginObj)
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(loginObj),
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