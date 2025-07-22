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

async function cadastrar(e){
  e.preventDefault()
  var nome = document.getElementById("nome").value
  var email = document.getElementById("email").value
  var senha = document.getElementById("senha").value
  var confimarSenha = document.getElementById("confirmar-senha").value
  var data = document.getElementById("data").value

  var ok = true

  if(!email){
    erroEmail.innerText = "O campo Email deve ser preenchido."
    erroEmail.style.display = 'block'
    campoEmail.classList.add("erro")
    ok = false 
  }if(!nome){
    erroNome.innerText = "O campo Nome deve ser preenchido."
    erroNome.style.display = 'block'
    ok = false
    campoNome.classList.add("erro")
  }if(!senha){
    erroSenha.innerText = "O campo Senha deve ser preenchido."
    erroSenha.style.display = 'block'
    ok = false
    campoSenha.classList.add("erro")
  }
  if(!confimarSenha){
    erroConfimarSenha.innerText = "O campo Confirmar Senha deve ser preenchido."
    erroConfimarSenha.style.display = 'block'
    ok = false
    campoConfirmarSenha.classList.add("erro")
  }
  if(!data){
    erroData.innerText = "O campo Data de Nascimento deve ser preenchido."
    erroData.style.display = 'block'
    ok = false
    campoData.classList.add("erro")
  }
  if(ok){
    const userData = {
      name: nome,
      email: email,
      password: senha,
      passwordConfirm: confimarSenha,
      bornDate: data
    };
    console.log(userData)
    const url = 'http://localhost:5207/api/User/create'
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
        })
    const responseData = await response.json
    console.log(responseData.Result)
  }
}



function validarUsuario(){
  const usuario = JSON.parse(localStorage.getItem("usuario"))
  if(usuario){window.location.href = "../dashboard/dashboard.html"}
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