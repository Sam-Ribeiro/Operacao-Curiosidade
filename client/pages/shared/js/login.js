const botaoLogar =  document.getElementById("btn-login")

botaoLogar.onclick = function (){
    login()
}
async function login(){
    if(botaoLogar.classList.contains("disable")){
        return null
    }
    var email = document.getElementById("email").value
    var senha = document.getElementById("senha").value
    var ok = true
    const userData = {
        email: email,
        password: senha,
    }
    if (!email) {
        error.innerText = "Preencha todos os campos"
        error.style.display = 'block'
        ok = false
        campoEmail.classList.add("erro")
    }
    if (!senha) {
        error.innerText = "Preencha todos os campos"
        error.style.display = 'block'
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
            campoSenha.classList.add("erro")
            campoEmail.classList.add("erro")
        }
        else if(result.resultCode === 200)
        {
            notify(result.message,true)
            localStorage.setItem("token",result.data)
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
    },8000)
}

async function validateUser(){
    const result = await QueryUserData()
    if(result.resultCode === 200){
        notify("Usuário carregado, redirecionando...",true)
        setTimeout(()=> {window.location.href = "../dashboard/dashboard.html"},3500)
    }
}

document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        campoEmail.classList.remove("erro")
        campoSenha.classList.remove("erro")
        login()
    }
    else {
        if(event.target == campoEmail){
            campoEmail.classList.remove("erro")
            campoSenha.classList.remove("erro")
        }
        if(event.target == campoSenha){
            campoSenha.classList.remove("erro")
            campoEmail.classList.remove("erro")
        }
        if(campoEmail.classList.contains("erro") || campoSenha.classList.contains("erro")){
            error.style.display = "block"
        }else{
            error.style.display = "none"
        }
    }
})

function showError(){
    const urlParams = new URLSearchParams(window.location.search)
    const pageError = urlParams.get('error')
    if(pageError == 'token'){
        setTimeout(()=> (
           notify("Acesso negado: Faça login para ter acesso aos dados.",false)
        ),500)
        
    }else if(pageError == 'internal'){
        setTimeout(()=> (
           notify("Erro no servidor, tente novamente mais tarde.") 
        ),500)
        
    }else if( pageError == 'rate-limit'){
        setTimeout(()=> (
            notify("Muitas tentativas, tente novamente mais tarde."),
            botaoLogar.classList.add("disable")
        ),500)
        setTimeout(()=> (botaoLogar.classList.remove("disable")),60000)
    }
}

const campoEmail = document.getElementById("email")
const campoSenha = document.getElementById("senha")
var error = document.getElementById("erro")
showError()
validateUser()