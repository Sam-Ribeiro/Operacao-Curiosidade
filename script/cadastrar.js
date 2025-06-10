const users = JSON.parse(localStorage.getItem("users")) || [];
document.getElementById("cadastrar-form").addEventListener("submit", cadastrar)

function cadastrar(e){
    e.preventDefault();
    var erro = document.getElementById("erro")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    }else if(users.some(u => u.user_email === email)){
        erro.innerText = "Email já cadastrado"
        erro.style.display = 'block'
    }else if(!emailRegex.test(email)){
        erro.innerText = "Email inválido"
        erro.style.display = 'block'    
    }else if(nome.length < 3){
        erro.innerText = "Nome deve ter mais que dois caracteres"
        erro.style.display = 'block'
    }else if(ano>=agora || ano<1910){
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
function formatDateInput(inputElement) {

    if (inputElement.value) {
        const dateObj = new Date(inputElement.value);
        const dia = String(dateObj.getDate() + 1).padStart(2, '0');
        const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
        const ano = dateObj.getFullYear();

        inputElement.type = 'text';
        inputElement.value = `${dia}/${mes}/${ano}`;
    } else {
        inputElement.type = 'text';
    }
}



validarUsuario();