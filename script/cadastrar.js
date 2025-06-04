const users = JSON.parse(localStorage.getItem("users")) || [];
document.getElementById("cadastrar-form").addEventListener("submit", cadastrar)

function cadastrar(e){
    e.preventDefault();
    var erro = document.getElementById("erro")
    var nome = document.getElementById("nome").value
    var email = document.getElementById("email").value
    var senha = document.getElementById("senha").value
    var data = document.getElementById("data").value
    var agora = new Date().getFullYear()
    const anotxt = data.substring(0, 4)
    const ano = Number(anotxt)

    if(!nome || !email || !senha || !data){
        erro.innerText = "preencha todos os campos"
        erro.style.display = 'block'
    }else if(users.some(u => u.user_email === email)){
        erro.innerText = "Email já cadastrado"
        erro.style.display = 'block'
    }else if(nome.length < 3){
        erro.innerText = "Nome deve ter mais que dois caracteres"
        erro.style.display = 'block'
    }else if(ano>=agora){
        erro.innerText = "Data de nascimento inválida"
        erro.style.display = 'block'
    }else if(ano<1910){
        erro.innerText = "Data de nascimento inválida"
        erro.style.display = 'block'    
    }else{
        const user ={
            user_nome: nome,
            user_email: email,
            user_senha: senha,
            user_data: data,
        }
        users.push(user)
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("users", JSON.stringify(users))
        window.location.href = "../pages/dashboard.html"
    }
}

function validarUsuario(){
  const user = JSON.parse(localStorage.getItem("user"));
  if(user){window.location.href = "../pages/dashboard.html"}
}

validarUsuario();