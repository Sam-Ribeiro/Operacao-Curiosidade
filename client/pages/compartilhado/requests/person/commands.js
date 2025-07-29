async function CreatePersonRequest(personData){
    const token = localStorage.getItem("token")
    const url = 'https://localhost:7182/api/Person/create'
    try{
    const r = await fetch(url,{
        method: 'POST',
        headers: { 
            'accept': 'text/plain', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(personData)
    })
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}

async function DeletePersonRequest(personData){
    const token = localStorage.getItem("token")
    const url = 'https://localhost:7182/api/Person/delete'
    try{
    const r = await fetch(url,{
        method: 'DELETE',
        headers: { 
            'accept': 'text/plain', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(personData)
    })
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}

async function RestorePersonRequest(personData){
    const token = localStorage.getItem("token")
    const url = 'https://localhost:7182/api/Person/restore'
    try{
    const r = await fetch(url,{
        method: 'POST',
        headers: { 
            'accept': 'text/plain', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(personData)
    })
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}

async function UpdatePersonRequest(personData){
    const token = localStorage.getItem("token")
    const url = 'https://localhost:7182/api/Person/update'
    try{
    const r = await fetch(url,{
        method: 'PUT',
        headers: { 
            'accept': 'text/plain', 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(personData)
    })
        const result = await r.json()
        return result
    }catch(ex){
        return null
    }
}