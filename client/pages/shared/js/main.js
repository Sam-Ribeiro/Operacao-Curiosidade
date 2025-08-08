function listar(){
    return true
} 

async function validateUser(){
    const result = await QueryUserName()
    if(result!= null){
        document.querySelector('.background-loader')?.remove();
        if(result.resultCode === 200){
            nome_perfil = document.getElementById("usuario")
            icone_perfil = document.getElementById("icone")
            if(nome_perfil){
                nome_perfil.innerText = result.data
                icone_perfil.innerText = result.data.charAt(0).toUpperCase()
            }
        }else if(result.resultCode === 401 || 400 ){
            var error = "token"
            window.location.href = `../login/login.html?error=${error}`
        }else if(result.resultCode === 500 ){
            var error = "internal"
            window.location.href = `../login/login.html?error=${error}`
        }
    }else{
        var error = "internal"
        window.location.href = `../login/login.html?error=${error}`
    }
}

const notification = document.getElementById("notification")
function notify(message, isOk){
  if(isOk){
    notification.classList.add("isOk")
    notification.classList.remove("isNotOk")
  }
  else{
    notification.classList.add("isNotOk")
    notification.classList.remove("isOk")
  }
    notification.innerText = message
    notification.classList.remove("hidden")
    setTimeout(() => { notification.classList.add("hidden")},5000)
}

validateUser()