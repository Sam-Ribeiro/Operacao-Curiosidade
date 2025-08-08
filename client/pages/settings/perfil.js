async function LoadUser(){
    const result = await QueryUserData()
    if(result == null){
        notify("Erro ao comunicar com o servidor")
    }
    if(result.resultCode === 200){
        campoNome.value = result.data.name
        campoEmail.value = result.data.email
        campoData.value = result.data.bornDate
        campoSenhaAntiga.value = ""
        campoSenhaNova.value = ""
        campoSenhaConfirm.value = ""
    }else{
        notify("Erro ao carregar usuário",false)
    }
}

async function ChangePassword(){
    var ok = true
    var senhaAntiga = campoSenhaAntiga.value
    var senhaNova = campoSenhaNova.value
    var senhaConfirm = campoSenhaConfirm.value
    if(senhaNova.length <= 6 || !senhaNova){
        erroSenhaNova.innerText = "A Senha deve ter mais que seis caracteres"
        erroSenhaNova.style.display = 'block'
        ok = false
        campoSenhaNova.classList.add("erro")
    }
    if(senhaConfirm != senhaNova){
        ok =  false
        erroSenhaConfirm.innerText ="As senhas não conferem."
        erroSenhaConfirm.style.display = 'block'
        campoSenhaConfirm.classList.add("erro")
    }
    if(!senhaConfirm){
        ok = false
        erroSenhaConfirm.innerText ="O Campo de confirmar senha é obrigatório."
        erroSenhaConfirm.style.display = 'block'
        campoSenhaConfirm.classList.add("erro")
    }
    if(!senhaAntiga){
        erroSenhaAntiga.innerText = "Para alterar a senha, preencha a senha antiga corretamente!"
        erroSenhaAntiga.style.display = 'block'
        ok = false
        campoSenhaAntiga.classList.add("erro")   
    }
    if(ok){
        const userData = {
            oldPassword: senhaAntiga,
            newPassword: senhaNova,
            newPasswordConfirm: senhaConfirm
        }
        const result = await updatePasswordRequest(userData)
        if(result != null){
            notify(result.message,result.isOk)
            if(result.resultCode === 403 ){
                erroSenhaAntiga.innerText = "Senha antiga inválida."
                erroSenhaAntiga.style.display = 'block'
                campoSenhaAntiga.classList.add("erro")  
            }
            const notifications = result.notifications
            for( const n in notifications){
                getErrorResponse(notifications[n])
            }
        }
    } 
    
}

async function ChangeProfileData(){
    var nome = campoNome.value
    var email = campoEmail.value
    var data = campoData.value
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    var agora = new Date().getFullYear()
    var ok = true
    const anotxt = data.substring(0, 4)
    const ano = Number(anotxt)
    
    if(!emailRegex.test(email)|| !email){
        erroEmail.innerText = "Email inválido"
        erroEmail.style.display = 'block'
        ok = false
        campoEmail.classList.add("erro")
    }
    if(nome.length < 4 || !nome){
        erroNome.innerText = "Nome deve ter mais que três caracteres"
        erroNome.style.display = 'block'
        ok = false
        campoNome.classList.add("erro")
    }if(ano>=agora || ano<1910 || !data){
        erroData.innerText = "Data de nascimento inválida"
        erroData.style.display = 'block'
        ok = false
        campoData.classList.add("erro")
    }if(ok){
        const userData ={
            name: nome,
            email: email,
            bornDate: data
        }
        const result = await updateUserRequest(userData)
        if(result != null)
        {
            notify(result.message,result.isOk)
            const notifications = result.notifications
            for( const n in notifications){
                getErrorResponse(notifications[n])
            }
            LoadUser()
        }
    }else{
        LoadUser()
    }
         
}

function LoadSettings(){
    const temaSalvo = JSON.parse(localStorage.getItem('temaSalvo'))
    const fonteSalva = JSON.parse(localStorage.getItem('fonteSalva'))
    if(temaSalvo.tema == "escuro"){
            checkbox.checked = true
    }
    if(fonteSalva.fonte == "pequena"){
        botoesFonte[0].checked = true
        divsFonte[0].classList.add("fonte-ativa")
        divsFonte[1].classList.remove("fonte-ativa")
        divsFonte[2].classList.remove("fonte-ativa")
    }else if(fonteSalva.fonte == "media"){
        botoesFonte[1].checked = true
        divsFonte[1].classList.add("fonte-ativa")
        divsFonte[0].classList.remove("fonte-ativa")
        divsFonte[2].classList.remove("fonte-ativa")
    }else if(fonteSalva.fonte == "grande"){
        botoesFonte[2].checked = true
        divsFonte[2].classList.add("fonte-ativa")
        divsFonte[0].classList.remove("fonte-ativa")
        divsFonte[1].classList.remove("fonte-ativa")
    }
}

document.addEventListener('keyup', (event) => {
  if (event.key != 'Enter') {
    if(event.target == campoNome){
        campoNome.classList.remove("erro")
        erroNome.style.display = 'none'
        error.style.display = 'none'
    }
    if(event.target == campoEmail){
        campoEmail.classList.remove("erro")
        erroEmail.style.display = 'none'
        error.style.display = 'none'
    }
    if(event.target == campoData){
        campoData.classList.remove("erro")
        erroData.style.display = 'none'
        error.style.display = 'none'
    }

    if(event.target == campoSenhaAntiga){
        campoSenhaAntiga.classList.remove("erro")
        erroSenha.style.display = 'none'
        erroSenhaAntiga.style.display = 'none'
        erroSenha.style.color = 'var(--cor-vermelho)'
        erroSenha.style.textDecorationColor = 'var(--cor-vermelho)'
    }else if(event.target == campoSenhaNova){
        campoSenhaNova.classList.remove("erro")
        erroSenha.style.display = 'none'
        erroSenhaNova.style.display = 'none'
        erroSenha.style.color = 'var(--cor-vermelho)'
        erroSenha.style.textDecorationColor = 'var(--cor-vermelho)'
    }else if(event.target == campoSenhaConfirm){
        campoSenhaConfirm.classList.remove("erro")
        erroSenha.style.display = 'none'
        erroSenhaConfirm.style.display = 'none'
        erroSenha.style.color = 'var(--cor-vermelho)'
        erroSenha.style.textDecorationColor = 'var(--cor-vermelho)'
    }else{
        error.style.color = 'var(--cor-vermelho)'
        error.style.textDecorationColor = 'var(--cor-vermelho)'
    }
  }
  else{
    if(event.target == campoNome || event.target == campoEmail || event.target == campoData){
        ChangeProfileData()
    }else if(event.target == campoSenhaAntiga || event.target == campoSenhaNova || event.target == campoSenhaConfirm){
        ChangePassword()
    }
  }
})

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
        erroSenhaNova.innerText = notification.message
        erroSenhaNova.style.display = 'block'
        campoSenhaNova.classList.add("erro")
    }else if(notification.propertyName == "passwordConfirm"){
        erroSenhaConfirm.innerText = notification.message
        erroSenhaConfirm.style.display = 'block'
        campoSenhaConfirm.classList.add("erro")
    }else if(notification.propertyName == "bornDate"){
        erroData.innerText = notification.message
        erroData.style.display = 'block'
        campoData.classList.add("erro")
    }
}

const botaoSalvar = document.getElementById("btn-salvar")
const botaoSalvarSenha = document.getElementById("btn-salvar-senha")
const campoNome = document.getElementById("campo-nome")
const campoEmail = document.getElementById("campo-email")
const campoData = document.getElementById("campo-data")
const campoSenhaAntiga = document.getElementById("campo-senha-antiga")
const campoSenhaNova = document.getElementById("campo-senha-nova")
const campoSenhaConfirm = document.getElementById("campo-senha-confirm")
const botaoExcluir = document.getElementById("btn-excluir")
const checkbox = document.getElementById("botao-tema")
const botoesFonte = document.getElementsByName("fonte")
const divsFonte = document.getElementsByClassName("fonte")
var error = document.getElementById("erro")
var erroEmail = document.getElementById("erro-email")
var erroNome = document.getElementById("erro-nome")
var erroData = document.getElementById("erro-data")
var erroSenha = document.getElementById("erro-senha")
var erroSenhaAntiga = document.getElementById("erro-senha-antiga")
var erroSenhaNova = document.getElementById("erro-senha-nova")
var erroSenhaConfirm = document.getElementById("erro-senha-confirm")

botaoSalvar.onclick = function(){
    ChangeProfileData()
}

botaoSalvarSenha.onclick = function(){
    ChangePassword()
}

checkbox.addEventListener('change', function() {
    if(checkbox.checked == true){
        const temaSalvo ={
            tema: "escuro"
        }
        localStorage.setItem("temaSalvo",JSON.stringify(temaSalvo))
    }else{
        const temaSalvo ={
            tema: "claro"
        }
        localStorage.setItem("temaSalvo",JSON.stringify(temaSalvo))
    }
    aplicarTema()
})

botoesFonte.forEach(b => b.addEventListener('change', function() {
    if(botoesFonte[0].checked == true){
        const fonteSalva ={
            fonte: "pequena"
        }
        localStorage.setItem("fonteSalva",JSON.stringify(fonteSalva))
    }else if(botoesFonte[2].checked == true){
        const fonteSalva ={
            fonte: "grande"
        }
        localStorage.setItem("fonteSalva",JSON.stringify(fonteSalva))
    }else{
        const fonteSalva ={
            fonte: "media"
        }
        localStorage.setItem("fonteSalva",JSON.stringify(fonteSalva))
    }
    aplicarFonte()
    LoadSettings()
}))

validateUser()
LoadUser()
LoadSettings()
