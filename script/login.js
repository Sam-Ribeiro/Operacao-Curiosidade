const users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("login-form").addEventListener("submit", logar)

function logar(e){
e.preventDefault();
  var erro = document.getElementById("erro")
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;
  const user = users.find(u => u.user_email === email);
  if (!email || !senha ) {
    erro.innerText = "Preencha todos os campos"
    erro.style.display = 'block'

  }else if(!emailRegex.test(email)){
    erro.innerText = "Email inválido"
    erro.style.display = 'block'

  }else if(!user){
    erro.innerText = "Email não cadastrado"
    erro.style.display = 'block'

      

  }else if(user.user_senha != senha){
    erro.innerText = "Senha inválida"
    erro.style.display = 'block'

  }else{
    window.location.href = "../pages/dashboard.html"
    localStorage.setItem("user", JSON.stringify(user))
  }
}
function validarUsuario(){
  const user = JSON.parse(localStorage.getItem("user"));
  if(user){window.location.href = "../pages/dashboard.html"}
}

validarUsuario();