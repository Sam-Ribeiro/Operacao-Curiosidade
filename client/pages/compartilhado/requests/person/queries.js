async function QueryPersons(page,order,pageSize,filter){
    const token = localStorage.getItem("token")
    const url = `https://localhost:7182/api/Person/getPersons?Page=${page}&Order=${order}&PageSize=${pageSize}&Filter=${filter}`
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

async function QueryDeletedPersons(page,order,pageSize,filter){
    const token = localStorage.getItem("token")
    const url = `https://localhost:7182/api/Person/getDeletedPersons?Page=${page}&Order=${order}&PageSize=${pageSize}&Filter=${filter}`
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

async function QueryPersonData(id){
    const token = localStorage.getItem("token")
    const url = `https://localhost:7182/api/Person/getPersonData/${id}`
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

