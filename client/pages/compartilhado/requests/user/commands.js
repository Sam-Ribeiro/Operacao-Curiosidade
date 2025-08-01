async function loginRequest(userData){
    const url = 'https://localhost:7182/api/User/login'
    try{
        const r = await fetch(url,{
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        if(r.status === 429){
            window.location.href = `../login/login.html?error=rate-limit`
        }
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}

async function createUserRequest(userData){
    const url = 'https://localhost:7182/api/User/register'
    try{
    const r = await fetch(url,{
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}

async function updateUserRequest(userData){
    const token = localStorage.getItem("token")
    const url = 'https://localhost:7182/api/User/updateUser'
    try{
    const r = await fetch(url,{
        method: 'PUT',
        headers: { 
            'accept': 'text/plain', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    })
    
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}

async function updatePasswordRequest(userData){
    const token = localStorage.getItem("token")
    const url = 'https://localhost:7182/api/User/updatePassword'
    try{
    const r = await fetch(url,{
        method: 'PUT',
        headers: {
            'accept': 'text/plain', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    })
    
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}
