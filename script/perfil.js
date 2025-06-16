const campoNome = document.getElementById("campo-nome")
const campoEmail = document.getElementById("campo-email")
const campoData = document.getElementById("campo-data")
const campoSenhaAntiga = document.getElementById("campo-senha-antiga")
const campoSenhaNova = document.getElementById("campo-senha-nova")
const botaoSalvar = document.getElementById("btn-salvar")
const botaoExcluir = document.getElementById("btn-excluir")

botaoSalvar.onclick = function(){
    salvarDados()
}
function carregarDados(){
    user = JSON.parse(localStorage.getItem("user"))
    campoNome.value = user.user_nome
    campoEmail.value = user.user_email
    campoData.value = user.user_data
    campoSenhaAntiga.value = ""
    campoSenhaNova.value = ""
}

function salvarDados(){
    user = JSON.parse(localStorage.getItem("user"))
    users = JSON.parse(localStorage.getItem("users"))
    users.forEach(u => {
        if(u.user_email == user.user_email){
            var nome = campoNome.value
            var email = campoEmail.value
            var data = campoData.value
            var senhaNova = campoSenhaNova.value
            var senhaAntiga = campoSenhaAntiga.value

            var erro = document.getElementById("erro")
            erro.style.display = 'none'
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            var agora = new Date().getFullYear()
            const anotxt = data.substring(0, 4)
            const ano = Number(anotxt)
            const outrosUsers = users.filter(u => u.user_email !== user.user_email)
            if(senhaNova){
                if(!senhaAntiga || senhaAntiga != user.user_senha){
                    erro.innerText = "Para alterar a senha, preencha a senha antiga corretamente!"
                    erro.style.display = 'block'
                }else{
                    user.user_senha = senhaNova
                }
            }
            if(!nome || !email || !data){
                erro.innerText = "Prencha Nome, Email e data de nascimento"
                erro.style.display = 'block'
            }else if(outrosUsers.some(u => u.user_email === email)){
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
                user.user_nome = nome
                user.user_email = email
                user.user_data = data
                u.user_nome = nome
                u.user_email = email
                u.user_data = data
                u.user_senha = user.user_senha
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("users", JSON.stringify(users))
            }
        }
    });
    carregarDados()            
}

carregarDados()