async function QueryLogs(page,order,pageSize,filter){
    const token = localStorage.getItem("token")
    const url = `https://localhost:7182/api/Log/getLogs?Page=${page}&Order=${order}&PageSize=${pageSize}&Filter=${filter}`
    
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

async function getLogsPages(pageSize,filter){
    const token = localStorage.getItem("token")
    const url = `https://localhost:7182/api/PageContent/getLogsPages?PageSize=${pageSize}&Filter=${filter}`
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


