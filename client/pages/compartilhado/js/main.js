function listar(){
    return true
} 

async function validarUsuario(){
    const token = localStorage.getItem("token")
    const url = "https://localhost:7182/api/User/getProfile"
    const r = await fetch(url,{
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        })
    try{
        const result = await r.json()
        if(result.resultCode === 200){
            nome_perfil = document.getElementById("usuario")
            icone_perfil = document.getElementById("icone")
            if(nome_perfil){
                nome_perfil.innerText = result.data.name
                icone_perfil.innerText = result.data.name.charAt(0).toUpperCase()
            }
        }else if(result.resultCode === 401){
            window.location.href = "../login/login.html"
        }
    }catch(error)
    {
        console.log(error)
    }
}


validarUsuario()