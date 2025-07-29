function listar(){
    return true
} 

async function validarUsuario(){
    const result = await QueryUserData()
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
}


const notificacao = document.getElementById("notification")
function notify(message, isOk){
  if(isOk){
    notificacao.classList.add("isOk")
    notificacao.classList.remove("isNotOk")
  }
  else{
    notificacao.classList.add("isNotOk")
    notificacao.classList.remove("isOk")
  }
    notificacao.innerText = message
    notificacao.classList.remove("hidden")
    setTimeout(() => {
        notificacao.classList.add("hidden")
    },5000)
}


validarUsuario()