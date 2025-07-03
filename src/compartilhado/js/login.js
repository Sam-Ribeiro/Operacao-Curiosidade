if(document.getElementById("login-form")){
  document.getElementById("login-form").addEventListener("submit", logar)
}else{
  document.getElementById("cadastrar-form").addEventListener("submit", cadastrar)
  var erroNome = document.getElementById("erro-nome")
  var erroEmail = document.getElementById("erro-email")
  var erroSenha = document.getElementById("erro-senha")
  var erroConfimarSenha = document.getElementById("erro-confirmar-senha")
  var erroData = document.getElementById("erro-data")
}

function logar(e){
  e.preventDefault()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  var email = document.getElementById("email").value
  var senha = document.getElementById("senha").value
  var ok = true
  const usuario = usuarios.find(u => u.email === email)
  if(!emailRegex.test(email) || !usuario || usuario.senha != senha){
    erro.innerText = "Email ou senha inválidos"
    erro.style.display = 'block'
    campoEmail.classList.add("erro")
    campoSenha.classList.add("erro")
    ok = false
  }
  if (!email || !senha ) {
    erro.innerText = "Preencha todos os campos"
    erro.style.display = 'block'
    ok = false
    campoEmail.classList.add("erro")
    campoSenha.classList.add("erro")
  }
  if(ok){
    window.location.href = "../dashboard/dashboard.html"
    localStorage.setItem("usuario", JSON.stringify(usuario))
  }
}

function cadastrar(e){
  e.preventDefault()
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  var nome = document.getElementById("nome").value
  var email = document.getElementById("email").value
  var senha = document.getElementById("senha").value
  var data = document.getElementById("data").value
  var confimarSenha = document.getElementById("confirmar-senha").value
  var agora = new Date().getFullYear()
  const anotxt = data.substring(6, 10)
  const ano = Number(anotxt)
  var ok = true

  if(!emailRegex.test(email) || usuarios.some(u => u.email === email) || !email){
    erroEmail.innerText = "Email inválido"
    erroEmail.style.display = 'block'
    campoEmail.classList.add("erro")
    ok = false 
  }if(nome.length < 3 || !nome){
    erroNome.innerText = "O Nome deve ter mais que três caracteres"
    erroNome.style.display = 'block'
    ok = false
    campoNome.classList.add("erro")
  }if(senha.length < 6 || !senha){
    erroSenha.innerText = "A Senha deve ter mais que seis caracteres"
    erroSenha.style.display = 'block'
    ok = false
    campoSenha.classList.add("erro")
  }
  if(senha != confimarSenha || !confimarSenha){
    erroConfimarSenha.innerText = "As senhas não conferem"
    erroConfimarSenha.style.display = 'block'
    ok = false
    campoConfirmarSenha.classList.add("erro")
  }
  if(ano>=agora || ano<1910 || !ano){
    erroData.innerText = "Data de nascimento inválida"
    erroData.style.display = 'block'
    ok = false
    campoData.classList.add("erro")
  }
  if(ok){
    const usuario ={
      nome: nome,
      email: email,
      senha: senha,
      data: data,
    }
    usuarios.push(usuario)
    localStorage.setItem("usuario", JSON.stringify(usuario))
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    window.location.href = "../dashboard/dashboard.html"
  }
}

function formatarData(campoData) {

    if (campoData.value) {
        const data = new Date(campoData.value)
        const dia = String(data.getDate() + 1).padStart(2, '0')
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const ano = data.getFullYear()

        campoData.type = 'text'
        campoData.value = `${dia}/${mes}/${ano}`
    } else {
        campoData.type = 'text'
    }
}

function validarUsuario(){
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  if(usuario){window.location.href = "../pages/dashboard.html"}
}


document.addEventListener('keyup', (event) => {
  if (event.key != 'Enter') {
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
    if(document.getElementById("cadastrar-form")){
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
    else{
      if(campoEmail.classList.contains("erro") || campoSenha.classList.contains("erro")){
        erro.style.display = "block"
      }else{
        erro.style.display = "none"
      }
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