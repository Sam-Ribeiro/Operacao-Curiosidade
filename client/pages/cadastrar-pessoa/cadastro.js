async function carregarPessoa(){
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const result = await QueryPersonData(id)
    if(result != null){
        console.log(result)
        const pessoa = result.data
        const modal = document.querySelector("#tela-cadastro")
        const titulo = document.querySelector("#tela-cadastro #titulo-modal")
        titulo.innerText = "Novo Cadastro"
        if(pessoa){
            modal.showModal()
            botaoGravar.style.display = 'none'
            botaoEditar.style.display = 'none'
            botaoExcluirPessoa.style.display = 'none'
            botaoRestaurar.style.display = 'none'
            if(pessoa.removed){
                titulo.innerText = "Usuário apagado"
                botaoRestaurar.style.display = 'block'
            }else{
                titulo.innerText = "Editar pessoa"
                botaoEditar.style.display = 'block'
                botaoExcluirPessoa.style.display = 'block'
            }
            document.querySelector("#tela-cadastro #nome").value = pessoa.name
            document.querySelector("#tela-cadastro #email").value = pessoa.email
            document.querySelector("#tela-cadastro #idade").value = pessoa.age
            document.querySelector("#tela-cadastro #endereco").value = pessoa.address
            document.querySelector("#tela-cadastro #informacoes").value = pessoa.information
            document.querySelector("#tela-cadastro #interesses").value = pessoa.interests
            document.querySelector("#tela-cadastro #sentimentos").value = pessoa.feelings
            document.querySelector("#tela-cadastro #valores").value = pessoa.values
            let checkbox = document.querySelector("#tela-cadastro #status-toggle")
            checkbox.checked = pessoa.status
        }
    }
}

function verificarEntrada(pessoa){
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const checkbox = document.querySelector("#tela-cadastro #status-toggle")
    var status = checkbox.checked
    var ok = true
    
    if(!pessoa.name){
        document.querySelector("#tela-cadastro #nome").classList.add("erro")
        erroNome.innerText = "Campo obrigatório"
        erroNome.style.display = "block"
        ok = false
    }
    if(!pessoa.email){
        document.querySelector("#tela-cadastro #email").classList.add("erro")
        erroEmail.innerText = "Campo obrigatório"
        erroEmail.style.display = "block"
        ok = false
    }
    if(!pessoa.age){
        campoIdade.classList.add("erro")
        erroIdade.innerText = "Campo obrigatório"
        erroIdade.style.display = "block"
        ok = false
    }
    if(!pessoa.address){
        document.querySelector("#tela-cadastro #endereco").classList.add("erro")
        erroEndereco.innerText = "Campo obrigatório"
        erroEndereco.style.display = "block"
        ok = false
    }
    return ok
}

function fecharCadastro(){
    modal.close()
    const urlSemParams = window.location.origin + window.location.pathname;
    history.replaceState({}, document.title, urlSemParams);
    preencherTabela(true)
    form = document.getElementById("form-cadastro")
    form.reset()
}

function readFields(){
    let id = 0
    try{
        const urlParams = new URLSearchParams(window.location.search)
        id = urlParams.get('id')
    }catch{
        id = 0
    }
    const person ={
        id: id,
        name: document.querySelector("#tela-cadastro #nome").value,
        email: document.querySelector("#tela-cadastro #email").value,
        status: document.querySelector("#tela-cadastro #status-toggle").checked,
        age:  document.querySelector("#tela-cadastro #idade").value,
        address: document.querySelector("#tela-cadastro #endereco").value,
        information: document.querySelector("#tela-cadastro #informacoes").value,
        interests: document.querySelector("#tela-cadastro #interesses").value,
        feelings: document.querySelector("#tela-cadastro #sentimentos").value,
        values: document.querySelector("#tela-cadastro #valores").value,
    }
    return person
}

function getErrorResponse(notification){
    if(notification.propertyName == "name"){
        erroNome.innerText = notification.message
        erroNome.style.display = 'block'
        campoNome.classList.add("erro")
    }else if(notification.propertyName == "email"){
        erroEmail.innerText = notification.message
        erroEmail.style.display = 'block'
        campoEmail.classList.add("erro")
    }else if(notification.propertyName == "age"){
        erroIdade.innerText = notification.message
        erroIdade.style.display = 'block'
        campoIdade.classList.add("erro")
    }else if(notification.propertyName == "address"){
        erroEndereco.innerText = notification.message
        erroEndereco.style.display = 'block'
        campoEndereco.classList.add("erro")
    }else if(notification.propertyName == "information"){
        erroInformacoes.innerText = notification.message
        erroInformacoes.style.display = 'block'
        campoInformacao.classList.add("erro")    
    }else if(notification.propertyName == "interests"){
        erroInteresses.innerText = notification.message
        erroInteresses.style.display = 'block'
        campoInteresses.classList.add("erro")
    }else if(notification.propertyName == "feelings"){
        erroSentimentos.innerText = notification.message
        erroSentimentos.style.display = 'block'
        campoSentimentos.classList.add("erro")
    }else if(notification.propertyName == "values"){
        erroValores.innerText = notification.message
        erroValores.style.display = 'block'
        campoValores.classList.add("erro")
    }
}

const modal = document.getElementById("tela-cadastro")
const popupExcluir = document.getElementById("pop-up-excluir")
const botaoModal = document.getElementById("novo-cadastro")
const botaoClose = document.getElementById("btn-cancelar")
const botaoGravar = document.getElementById("btn-gravar")
const botaoEditar = document.getElementById("btn-editar")
const botaoExcluir = document.getElementById("btn-confirmar-excluir")
const botaoCancelar = document.getElementById("btn-cancelar-excluir")
const botaoExcluirPessoa = document.getElementById("btn-excluir")
const botaoRestaurar =  document.getElementById("btn-restaurar")
var erroNome = document.getElementById("erro-nome")
var erroEmail = document.getElementById("erro-email")
var erroIdade = document.getElementById("erro-idade")
var erroEndereco = document.getElementById("erro-endereco")
var erroInformacoes = document.getElementById("erro-info")
var erroInteresses = document.getElementById("erro-interesses")
var erroSentimentos = document.getElementById("erro-sentimentos")
var erroValores = document.getElementById("erro-valores")
const campoEmail = document.querySelector("#tela-cadastro #email")
const campoNome = document.querySelector("#tela-cadastro #nome")
const campoIdade = document.querySelector("#tela-cadastro #idade")
const campoEndereco = document.querySelector("#tela-cadastro #endereco")
const campoInformacao = document.querySelector("#tela-cadastro #informacoes")
const campoInteresses = document.querySelector("#tela-cadastro #interesses")
const campoSentimentos = document.querySelector("#tela-cadastro #sentimentos")
const campoValores = document.querySelector("#tela-cadastro #valores")
const notificationDialog = document.querySelector("#notification-dialog")

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        event.preventDefault()
        if(!popupExcluir.open){
            fecharCadastro()
        }
        popupExcluir.close()  
    }
    if(event.target == campoEmail){
        campoEmail.classList.remove("erro")
        erroEmail.style.display = "none"
    }
    if(event.target == campoNome){
        campoNome.classList.remove("erro")
        erroNome.style.display = "none"
    }
    if(event.target == campoIdade){
        campoIdade.classList.remove("erro")
        erroIdade.style.display = "none"
    }
    if(event.target == campoEndereco){
        campoEndereco.classList.remove("erro")
        erroEndereco.style.display = "none"
    }
    if(event.target == campoInformacao){
        campoInformacao.classList.remove("erro")
        erroInformacoes.style.display = "none"
    }
    if(event.target == campoInteresses){
        campoInteresses.classList.remove("erro")
        erroInteresses.style.display = "none"
    }
    if(event.target == campoSentimentos){
        campoSentimentos.classList.remove("erro")
        erroSentimentos.style.display = "none"
    }
    if(event.target == campoValores){
        campoValores.classList.remove("erro")
        erroValores.style.display = "none"
    }
})

function notifyDialog(message){
    notificationDialog.classList.add("isNotOk")
    notificationDialog.innerText = message
    notificationDialog.classList.remove("hidden")
    setTimeout(() => { notificationDialog.classList.add("hidden") },5000)
}

botaoExcluirPessoa.onclick = function (){
    popupExcluir.showModal()
}

botaoCancelar.onclick = function (){
    popupExcluir.close()
}

botaoModal.onclick = function (){
    modal.showModal()
    botaoGravar.style.display = 'block'
    botaoEditar.style.display = 'none'
    botaoExcluirPessoa.style.display = 'none'
    botaoRestaurar.style.display = 'none'
}

botaoGravar.onclick = async function (){
    const person = readFields()
    if(verificarEntrada(person)){
        const result = await CreatePersonRequest(person)
        if(result.resultCode === 201){
            fecharCadastro()
            notify("Pessoa cadastrada com sucesso!",true)
        }else if(result.resultCode === 400){ 
            notifyDialog(result.message,result.isOk)
            const notifications = result.notifications
            for( const n in notifications){
                getErrorResponse(notifications[n])
            }
        }else{
            notifyDialog(result.message,result.isOk)
        }
    }
}


botaoClose.onclick = function(){
    fecharCadastro()
}

botaoEditar.onclick = async function(){
    const person = readFields()
    if(verificarEntrada(person)){
        const result = await UpdatePersonRequest(person)
        if(result.resultCode === 200){
            fecharCadastro()
            notify("Pessoa editada com sucesso!",true)
        }else if(result.resultCode === 400){ 
            notifyDialog(result.message,result.isOk)
            const notifications = result.notifications
            for( const n in notifications){
                getErrorResponse(notifications[n])
            }
        }else{
            notifyDialog(result.message,result.isOk)
        }
    }
}

botaoExcluir.onclick = async function(){
    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'))
    const request ={
        id: id
    }
    const result = await DeletePersonRequest(request)
    if(result.resultCode === 200){
        popupExcluir.close()
        notify(result.message,true)
        fecharCadastro()
    }
    notifyDialog(result.message,result.isOk)
}

botaoRestaurar.onclick = async function(){
    const urlParams = new URLSearchParams(window.location.search)
    const id = parseInt(urlParams.get('id'))
    const request ={
        id: id
    }
    const result = await RestorePersonRequest(request)
    if(result.resultCode === 200){
        popupExcluir.close()
        notify(result.message,true)
        fecharCadastro()
    }
    notifyDialog(result.message,result.isOk)
    
}

carregarPessoa()