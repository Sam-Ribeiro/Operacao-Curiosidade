const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []

if(document.getElementById("login-form")){
  document.getElementById("login-form").addEventListener("submit", logar)
}else{
  document.getElementById("cadastrar-form").addEventListener("submit", cadastrar)
}

function logar(e){
e.preventDefault()
  var erro = document.getElementById("erro")
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  var email = document.getElementById("email").value
  var senha = document.getElementById("senha").value
  const usuario = usuarios.find(u => u.email === email)
  if (!email || !senha ) {
    erro.innerText = "Preencha todos os campos"
    erro.style.display = 'block'

  }else if(!emailRegex.test(email)){
    erro.innerText = "Email inválido"
    erro.style.display = 'block'

  }else if(!usuario){
    erro.innerText = "Email não cadastrado"
    erro.style.display = 'block'

      

  }else if(usuario.senha != senha){
    erro.innerText = "Senha inválida"
    erro.style.display = 'block'

  }else{
    window.location.href = "../pages/dashboard.html"
    localStorage.setItem("usuario", JSON.stringify(usuario))
  }
}

function cadastrar(e){
    e.preventDefault()
    var erro = document.getElementById("erro")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    var nome = document.getElementById("nome").value
    var email = document.getElementById("email").value
    var senha = document.getElementById("senha").value
    var data = document.getElementById("data").value
    var agora = new Date().getFullYear()
    const anotxt = data.substring(0, 4)
    const ano = Number(anotxt)

    if(!nome || !email || !senha || !data){
        erro.innerText = "Preencha todos os campos"
        erro.style.display = 'block'
    }else if(usuarios.some(u => u.email === email)){
        erro.innerText = "Email já cadastrado"
        erro.style.display = 'block'
    }else if(!emailRegex.test(email)){
        erro.innerText = "Email inválido"
        erro.style.display = 'block'    
    }else if(nome.length < 3){
        erro.innerText = "O Nome deve ter mais que dois caracteres"
        erro.style.display = 'block'
    }else if(senha.length < 6){
        erro.innerText = "A Senha deve ter mais que seis caracteres"
        erro.style.display = 'block'
    }else if(ano>=agora || ano<1910){
        erro.innerText = "Data de nascimento inválida"
        erro.style.display = 'block'
    }else{
        const usuario ={
            nome: nome,
            email: email,
            senha: senha,
            data: data,
        }
        usuarios.push(usuario)
        localStorage.setItem("usuario", JSON.stringify(usuario))
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        window.location.href = "../pages/dashboard.html"
    }
}

function formatarData(campoData) {

    if (campoData.value) {
        const dateObj = new Date(campoData.value)
        const dia = String(dateObj.getDate() + 1).padStart(2, '0')
        const mes = String(dateObj.getMonth() + 1).padStart(2, '0')
        const ano = dateObj.getFullYear()

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

validarUsuario()