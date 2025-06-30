if(document.getElementById("login-form")){
  document.getElementById("login-form").addEventListener("submit", logar)
}else{
  document.getElementById("cadastrar-form").addEventListener("submit", cadastrar)
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
  const anotxt = data.substring(0, 4)
  const ano = Number(anotxt)
  var ok = true

  if(!emailRegex.test(email) || usuarios.some(u => u.email === email) || !email){
    erro.innerText = "Email inválido"
    erro.style.display = 'block'
    campoEmail.classList.add("erro")
    ok = false 
  }if(nome.length < 3 || !nome){
    erro.innerText = "O Nome deve ter mais que três caracteres"
    erro.style.display = 'block'
    ok = false
    campoNome.classList.add("erro")
  }if(senha.length < 6 || !senha){
    erro.innerText = "A Senha deve ter mais que seis caracteres"
    erro.style.display = 'block'
    ok = false
    campoSenha.classList.add("erro")
  }
  if(senha != confimarSenha || !confimarSenha){
    erro.innerText = "As senhas não conferem"
    erro.style.display = 'block'
    ok = false
    campoConfirmarSenha.classList.add("erro")
    campoSenha.classList.add("erro")
  }
  if(ano>=agora || ano<1910 || !ano){
    erro.innerText = "Data de nascimento inválida"
    erro.style.display = 'block'
    ok = false
    campoData.classList.add("erro")
  }
  if(!nome || !email || !senha || !data || !confimarSenha){
    erro.innerText = "Preencha todos os campos"
    erro.style.display = 'block'
    ok = false
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
    campoEmail.classList.remove("erro")
    campoSenha.classList.remove("erro")
    erro.style.display = 'none'
    if(document.getElementById("cadastrar-form")){
      campoNome.classList.remove("erro")
      campoData.classList.remove("erro")
      campoConfirmarSenha.classList.remove("erro")
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