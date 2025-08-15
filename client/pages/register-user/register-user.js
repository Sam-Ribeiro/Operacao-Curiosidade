var erroNome = document.getElementById("erro-nome")
var erroEmail = document.getElementById("erro-email")
var erroSenha = document.getElementById("erro-senha")
var erroConfimarSenha = document.getElementById("erro-confirmar-senha")
var erroData = document.getElementById("erro-data")
const botaoCadastrar =  document.getElementById("btn-cadastrar")

botaoCadastrar.onclick = function (){
    register()
}

async function register(){
    var nome = document.getElementById("nome").value
    var email = document.getElementById("email").value
    var senha = document.getElementById("senha").value
    var confimarSenha = document.getElementById("confirmar-senha").value
    var date = document.getElementById("data").value
    const userData = {
        name: nome,
        email: email,
        password: senha,
        passwordConfirm: confimarSenha,
        bornDate: date
    }

    if(verifyInvalidFields(userData)){
        const result = await createUserRequest(userData)
        if(result == null){
            notify("Erro ao comunicar com o servidor")
        }
        else{
            if(result.resultCode === 400){ 
                notify(result.message,false)
                const notifications = result.notifications
                for( const n in notifications){
                    getErrorResponse(notifications[n])
                }
            }else if(result.resultCode === 201){
                notify(result.message,true)
                setTimeout(() => { window.location.href = "../login/login.html" },2200)
            }else{
                notify(result.message,false)
            }
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

function getErrorResponse(notification){
    console.log(notification.message)
    if(notification.propertyName == "name"){
        erroNome.innerText = notification.message
        erroNome.style.display = 'block'
        campoNome.classList.add("erro")
    }else if(notification.propertyName == "email"){
        erroEmail.innerText = notification.message
        erroEmail.style.display = 'block'
        campoEmail.classList.add("erro")
    }else if(notification.propertyName == "password"){
        erroSenha.innerText = notification.message
        erroSenha.style.display = 'block'
        campoSenha.classList.add("erro")
    }else if(notification.propertyName == "passwordConfirm"){
        erroConfimarSenha.innerText = notification.message
        erroConfimarSenha.style.display = 'block'
        campoConfirmarSenha.classList.add("erro")
    }else if(notification.propertyName == "bornDate"){
        erroData.innerText = notification.message
        erroData.style.display = 'block'
        campoData.classList.add("erro")
    }
}

function verifyInvalidFields(userData){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    var now = new Date().getFullYear()
    var ok = true
    const anotxt = userData.bornDate.substring(0, 4)
    const ano = Number(anotxt)
    if(!emailRegex.test(userData.email)){
        erroEmail.innerText = "Email inválido"
        erroEmail.style.display = 'block'
        campoEmail.classList.add("erro")
        ok = false 
    }if(userData.name.length < 3){
        erroNome.innerText = "O Nome deve ter mais que três caracteres"
        erroNome.style.display = 'block'
        ok = false
        campoNome.classList.add("erro")
    }if(userData.password.length < 7 ){
        erroSenha.innerText = "A Senha deve ter mais que seis caracteres"
        erroSenha.style.display = 'block'
        ok = false
        campoSenha.classList.add("erro")
    }
    if(userData.password != userData.passwordConfirm){
        erroConfimarSenha.innerText = "As senhas não conferem"
        erroConfimarSenha.style.display = 'block'
        ok = false
        campoConfirmarSenha.classList.add("erro")
    }
    if(ano > now || ano < 1910){
        erroData.innerText = "Data de nascimento inválida"
        erroData.style.display = 'block'
        ok = false
        campoData.classList.add("erro")
    }
    if(!userData.email){
        erroEmail.innerText = "O campo Email deve ser preenchido."
        erroEmail.style.display = 'block'
        campoEmail.classList.add("erro")
        ok = false 
    }if(!userData.name){
        erroNome.innerText = "O campo Nome deve ser preenchido."
        erroNome.style.display = 'block'
        ok = false
        campoNome.classList.add("erro")
    }if(!userData.password){
        erroSenha.innerText = "O campo Senha deve ser preenchido."
        erroSenha.style.display = 'block'
        ok = false
        campoSenha.classList.add("erro")
    }
    if(!userData.passwordConfirm){
        erroConfimarSenha.innerText = "O campo Confirmar Senha deve ser preenchido."
        erroConfimarSenha.style.display = 'block'
        ok = false
        campoConfirmarSenha.classList.add("erro")
    }
    if(!userData.bornDate){
        erroData.innerText = "O campo Data de Nascimento deve ser preenchido."
        erroData.style.display = 'block'
        ok = false
        campoData.classList.add("erro")
    }
    return ok
}

async function CheckLoggedUser(){
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
        register()
    }
    else {
        if(event.target == campoEmail){
        campoEmail.classList.remove("erro")
        if(erroEmail){
            erroEmail.style.display = 'none'
        }
        }
        if(event.target == campoSenha){
        campoSenha.classList.remove("erro")
        if(erroSenha){
            erroSenha.style.display = 'none'
        }
        }
        if(event.target == campoNome){
            campoNome.classList.remove("erro")
            erroNome.style.display = 'none'
        }
        if(event.target == campoData){
            campoData.classList.remove("erro")
            erroData.style.display = 'none'
        }
        if(event.target == campoConfirmarSenha){
            campoConfirmarSenha.classList.remove("erro")
            erroConfimarSenha.style.display = 'none'
        }
    }
})

const campoEmail = document.getElementById("email")
const campoSenha = document.getElementById("senha")
const campoNome = document.getElementById("nome")
const campoData = document.getElementById("data")
const campoConfirmarSenha = document.getElementById("confirmar-senha")
var error = document.getElementById("erro")

CheckLoggedUser()