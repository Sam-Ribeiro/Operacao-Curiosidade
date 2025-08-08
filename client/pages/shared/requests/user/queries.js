async function QueryUserData(){
    const token = localStorage.getItem("token")
    const url = "https://localhost:7182/api/User/getProfile"
    try{
        const r  = await fetch(url,{
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}

async function QueryUserName(){
    const token = localStorage.getItem("token")
    const url = "https://localhost:7182/api/User/getUserName"
    try{
        const r  = await fetch(url,{
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}