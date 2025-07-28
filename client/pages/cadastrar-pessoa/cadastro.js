function carregarPessoa(){
    const pessoa = JSON.parse(localStorage.getItem("pessoa"))
    const modal = document.querySelector("#tela-cadastro")
    const titulo = document.querySelector("#tela-cadastro #titulo-modal")
    titulo.innerText = "Novo Cadastro"
    if(pessoa){
        modal.showModal()
        botaoGravar.style.display = 'none'
        botaoEditar.style.display = 'none'
        botaoExcluirPessoa.style.display = 'none'
        botaoRestaurar.style.display = 'none'
        if(pessoa.deletado){
            titulo.innerText = "Usuário apagado"
            botaoRestaurar.style.display = 'block'
        }else{
            titulo.innerText = "Editar pessoa"
            botaoEditar.style.display = 'block'
            botaoExcluirPessoa.style.display = 'block'
        }
        document.querySelector("#tela-cadastro #nome").value = pessoa.nome
        document.querySelector("#tela-cadastro #email").value = pessoa.email
        document.querySelector("#tela-cadastro #idade").value = pessoa.idade
        document.querySelector("#tela-cadastro #endereco").value = pessoa.endereco
        document.querySelector("#tela-cadastro #informacoes").value = pessoa.informacoes
        document.querySelector("#tela-cadastro #interesses").value = pessoa.interesses
        document.querySelector("#tela-cadastro #sentimentos").value = pessoa.sentimentos
        document.querySelector("#tela-cadastro #valores").value = pessoa.valores
        let checkbox = document.querySelector("#tela-cadastro #status-toggle")
        if(pessoa.status == "Ativo"){
            checkbox.checked = true
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
        return false    
    }else{
        localStorage.setItem("pessoa", JSON.stringify(pessoa))   
        return true     
    }
}

function enviarLog(log){
    const logs = JSON.parse(localStorage.getItem("logs")) || []
    const usuario = JSON.parse(localStorage.getItem("usuario")) || []
    const logformatado ={ 
        evento: log,
        data: new Date().toISOString(),
        usuario: usuario.nome,
    }
    logs.push(logformatado)
    localStorage.setItem("logs", JSON.stringify(logs))
}

function fecharCadastro(){
    modal.close()
    localStorage.removeItem("pessoa")
    preencherTabela(true)
    form = document.getElementById("form-cadastro")
    form.reset()
}

function notificar(mensagem){
    console.log(mensagem)
    notificacao.innerText = mensagem
    notificacao.classList.remove("escondido")
    setTimeout(() => {
        notificacao.classList.add("escondido")
    },5000)
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
const notificacao = document.getElementById("notificacao")
var erroNome = document.getElementById("erro-nome")
var erroEmail = document.getElementById("erro-email")
var erroIdade = document.getElementById("erro-idade")
var erroEndereco = document.getElementById("erro-endereco")
const campoEmail = document.querySelector("#tela-cadastro #email")
const campoNome = document.querySelector("#tela-cadastro #nome")
const campoIdade = document.querySelector("#tela-cadastro #idade")
const campoEndereco = document.querySelector("#tela-cadastro #endereco")

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

botaoGravar.onclick = function (){
    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []
    let retorno = verificarEntrada()
    if(retorno){
        const pessoa = JSON.parse(localStorage.getItem("pessoa"))
        enviarLog("Cadastrou a pessoa: "+pessoa.nome)
        notificar("Pessoa cadastrada com sucesso!")
        pessoas.push(pessoa)
        localStorage.setItem("pessoas", JSON.stringify(pessoas))
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