function listar(){
    return true
} 

function validarUsuario(){
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if(usuario){
        nome_perfil = document.getElementById("usuario")
        icone_perfil = document.getElementById("icone")
        if(nome_perfil){
            nome_perfil.innerText = usuario.nome
            icone_perfil.innerText = usuario.nome.charAt(0).toUpperCase()
        }
    }else{
        window.location.href = "../pages/login.html"
    }
}

validarUsuario()