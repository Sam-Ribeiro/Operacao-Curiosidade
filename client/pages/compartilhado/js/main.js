function listar(){
    return true
} 

function validarUsuario(){
    const token = JSON.parse(localStorage.getItem("token"))
    
    if(user){
        nome_perfil = document.getElementById("usuario")
        icone_perfil = document.getElementById("icone")
        if(nome_perfil){
            nome_perfil.innerText = user.name
            icone_perfil.innerText = user.name.charAt(0).toUpperCase()
        }
    }else{
        window.location.href = "../login/login.html"
    }
}

validarUsuario()