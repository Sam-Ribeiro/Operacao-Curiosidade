

var erroNome = document.getElementById("erro-nome")
var erroEmail = document.getElementById("erro-email")
var erroSenha = document.getElementById("erro-senha")
var erroConfimarSenha = document.getElementById("erro-confirmar-senha")
var erroData = document.getElementById("erro-data")
const botaoCadastrar =  document.getElementById("btn-cadastrar")

botaoCadastrar.onclick = function (){
    cadastrar();
}

async function cadastrar(){
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

    if(verifyNotNullFields(userData)){
        createUserRequest(userData)
    }
}

async function createUserRequest(userData){
    const url = 'https://localhost:7182/api/User/register'
    const r = await fetch(url,{
    method: 'POST',
    headers: { 
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
    })
    try{
        const result = await r.json()
        if(result.resultCode === 400){ 
            notify(result.message,false)
            const notifications = result.notifications
            for( const n in notifications){
                getErrorResponse(notifications[n])
            }
        }else if(result.resultCode === 201){
            notify(result.message,true)
            setTimeout(() => {
                window.location.href = "../login/login.html"
            },2200)
        }else{
            notify(result.message,false)
        }
    }catch(error){
        notify(error,false)
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
    var error
    if(notification.propertyName == "name"){
        error = erroNome
        campoNome.classList.add("erro")
    }else if(notification.propertyName == "email"){
        error = erroEmail
        campoEmail.classList.add("erro")
    }else if(notification.propertyName == "password"){
        error = erroSenha
        campoSenha.classList.add("erro")
    }else if(notification.propertyName == "passwordConfirm"){
        error = erroConfimarSenha
        campoConfirmarSenha.classList.add("erro")
    }else if(notification.propertyName == "bornDate"){
        error = erroData
        campoData.classList.add("erro")
    }
}

function verifyNotNullFields(userData){
    var ok = true
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

async function validarUsuario(){
    const token = JSON.parse(localStorage.getItem("token"))
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
            window.location.href = "../dashboard/dashboard.html"
        }else if(result.resultCode === 401){
            console.log("Token invalido")
        }
    }catch(error)
    {
        console.log(error)
    }
}

document.addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        cadastrar()
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


const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
const campoEmail = document.getElementById("email")
const campoSenha = document.getElementById("senha")
const campoNome = document.getElementById("nome")
const campoData = document.getElementById("data")
const campoConfirmarSenha = document.getElementById("confirmar-senha")
var erro = document.getElementById("erro")

validarUsuario()