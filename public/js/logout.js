document.querySelector("#logoutBtn").addEventListener("click",()=>{
    fetch("/api/user/logout",{
        method:"DELETE"
    }).then(res=>{
        if(res.ok){
            location.reload()
        } else {
            alert("success")
        }
    })
})