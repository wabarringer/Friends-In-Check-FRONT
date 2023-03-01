document.querySelector("#new-user-form").addEventListener("submit",e=>{
    e.preventDefault();
    const userObj = {
        user:document.querySelector("#user-input").value
    }
    console.log(userObj)
    fetch("/api/game",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload()
        } else {
            alert("signup failed")
        }
    })
})