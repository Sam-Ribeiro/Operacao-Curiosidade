
const botaoLogar =  document.getElementById("btn-login")

botaoLogar.onclick = function (){
    login();
}
async function login(){
    var email = document.getElementById("email").value
    var senha = document.getElementById("senha").value
    var ok = true
    const userData = {
        email: email,
        password: senha,
    }
    if (!email) {
        erro.innerText = "Preencha todos os campos"
        erro.style.display = 'block'
        ok = false
        campoEmail.classList.add("erro")
    }
    if (!senha) {
        erro.innerText = "Preencha todos os campos"
        erro.style.display = 'block'
        ok = false
        campoSenha.classList.add("erro")
    }
    if(ok){
        const result = await loginRequest(userData)
        if(result == null){
            notify("Erro ao comunicar com o servidor")
        }
        if(result.resultCode === 400)
        { 
            notify(result.message,false)
        }
        else if(result.resultCode === 200)
        {
            notify(result.message,true)
            localStorage.setItem("token",result.data.token)
            setTimeout(() => { window.location.href = "../dashboard/dashboard.html" },1500)
        }
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

async function validarUsuario(){
    const result = await QueryUserData()
    if(result.resultCode === 200){
        notify("Usuário carregado, redirecionando...",true)
        setTimeout(()=> {window.location.href = "../dashboard/dashboard.html"},2000)
    }else if(result.resultCode === 401){
        console.log("Token invalido")
    }
}

document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        login()
    }
    else {
        if(event.target == campoEmail){
            campoEmail.classList.remove("erro")
            erroEmail.style.display = 'none'
        }
        if(event.target == campoSenha){
            campoSenha.classList.remove("erro")
            erroSenha.style.display = 'none'
        }
        if(campoEmail.classList.contains("erro") || campoSenha.classList.contains("erro")){
            erro.style.display = "block"
        }else{
            erro.style.display = "none"
        }
    }
})

const campoEmail = document.getElementById("email")
const campoSenha = document.getElementById("senha")
var erro = document.getElementById("erro")

validarUsuario()