async function carregarPessoa(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
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

function verificarEntrada(){
    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []
    const pessoaEditado = JSON.parse(localStorage.getItem("pessoa")) || []
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const checkbox = document.querySelector("#tela-cadastro #status-toggle")
    if(checkbox.checked == true){
        var status = "Ativo"
    }else{
        var status = "Inativo"
    }

    const pessoa ={
        nome: document.querySelector("#tela-cadastro #nome").value,
        email: document.querySelector("#tela-cadastro #email").value,
        status: status,
        idade:  document.querySelector("#tela-cadastro #idade").value,
        endereco: document.querySelector("#tela-cadastro #endereco").value,
        informacoes: document.querySelector("#tela-cadastro #informacoes").value,
        interesses: document.querySelector("#tela-cadastro #interesses").value,
        sentimentos: document.querySelector("#tela-cadastro #sentimentos").value,
        valores: document.querySelector("#tela-cadastro #valores").value,
        dataCadastro: new Date().toISOString(),
        deletado: false
    }

    const outrasPessoas = pessoas.filter(u => u.email !== pessoaEditado.email)
    var ok = true
    
    if(!pessoa.nome || pessoa.nome.length < 3){
        document.querySelector("#tela-cadastro #nome").classList.add("erro")
        erroNome.innerText = "O nome deve ter mais que dois caracteres"
        erroNome.style.display = "block"
        ok = false
    }
    if(!pessoa.email || !emailRegex.test(pessoa.email)){
        document.querySelector("#tela-cadastro #email").classList.add("erro")
        erroEmail.innerText = "Email inválido"
        erroEmail.style.display = "block"
        ok = false
    }
    if(outrasPessoas.some(u => u.email === pessoa.email)){
        document.querySelector("#tela-cadastro #email").classList.add("erro")
        erroEmail.innerText = "Email já cadastrado"
        erroEmail.style.display = "block"
        ok = false
    }
    if(!pessoa.idade || Number(pessoa.idade)<1 || Number(pessoa.idade>120) || isNaN(Number(pessoa.idade))){
        campoIdade.classList.add("erro")
        erroIdade.innerText = "Idade inválida"
        erroIdade.style.display = "block"
        ok = false
    }
    if(!pessoa.endereco){
        document.querySelector("#tela-cadastro #endereco").classList.add("erro")
        erroEndereco.innerText = "Endereço inválido"
        erroEndereco.style.display = "block"
        ok = false
    }
    if(!ok){
        notifyDialog("Erro ao validar dados")   
        return false
    }else{
        return true
    }
}

function fecharCadastro(){
    modal.close()
    const urlSemParams = window.location.origin + window.location.pathname;
    history.replaceState({}, document.title, urlSemParams);
    preencherTabela(true)
    form = document.getElementById("form-cadastro")
    form.reset()
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
const campoEmail = document.querySelector("#tela-cadastro #email")
const campoNome = document.querySelector("#tela-cadastro #nome")
const campoIdade = document.querySelector("#tela-cadastro #idade")
const campoEndereco = document.querySelector("#tela-cadastro #endereco")
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
    if(verificarEntrada()){
        const result = await CreatePersonRequest(personData)
        fecharCadastro()
    }
}


botaoClose.onclick = function(){
    fecharCadastro()
}

botaoEditar.onclick = function(){
    notificar("Pessoa editada com sucesso!")
    fecharCadastro()
}

botaoExcluir.onclick = function(){
    notificar("Pessoa excluida com sucesso!")
    popupExcluir.close()
    fecharCadastro()
}

botaoRestaurar.onclick = function(){
    notificar("Pessoa restaurada com sucesso!")
    fecharCadastro()
}

carregarPessoa()