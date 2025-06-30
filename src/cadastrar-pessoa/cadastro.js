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
    
    erro.style.display = 'none'
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
    
    if(!pessoa.nome || !pessoa.email || !pessoa.idade || !pessoa.endereco){
        erro.innerText = "Preencha os campos obrigatórios!"
        erro.style.display = 'block'
        if(!pessoa.nome){
            document.querySelector("#tela-cadastro #nome").classList.add("erro")
        }
        if(!pessoa.email){
            document.querySelector("#tela-cadastro #email").classList.add("erro")
        }
        if(!pessoa.idade){
            document.querySelector("#tela-cadastro #idade").classList.add("erro")
        }
        if(!pessoa.endereco){
            document.querySelector("#tela-cadastro #endereco").classList.add("erro")
        }
        return false
    }else if(outrasPessoas.some(u => u.email === pessoa.email|| !pessoa.email)){
        erro.innerText = "Erro ao cadastrar: Email Inválido"
        erro.style.display = 'block'
        document.querySelector("#tela-cadastro #email").classList.add("erro")
        return false
    }else if(!emailRegex.test(pessoa.email)){
        erro.innerText = "Erro ao cadastrar: Email inválido"
        erro.style.display = 'block'
        document.querySelector("#tela-cadastro #email").classList.add("erro")
        return false
    }else if( Number(pessoa.idade)<1 || Number(pessoa.idade>120) || isNaN(Number(pessoa.idade))){
        erro.innerText = "Erro ao cadastrar: Idade inválida"
        erro.style.display = 'block'
        document.querySelector("#tela-cadastro #idade").classList.add("erro")
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
var erro = document.getElementById("erro")

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        event.preventDefault()
        if(!popupExcluir.open){
            fecharCadastro()
        }
        popupExcluir.close()  
    }
    erro.style.display = 'none'
    document.querySelector("#tela-cadastro #email").classList.remove("erro")
    document.querySelector("#tela-cadastro #nome").classList.remove("erro")
    document.querySelector("#tela-cadastro #idade").classList.remove("erro")
    document.querySelector("#tela-cadastro #endereco").classList.remove("erro")
    
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
    botaoExcluir.style.display = 'none'
    botaoRestaurar.style.display = 'none'
}

botaoGravar.onclick = function (){
    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []
    let retorno = verificarEntrada()
    if(retorno){
        const pessoa = JSON.parse(localStorage.getItem("pessoa"))
        enviarLog("Cadastrou a pessoa: "+pessoa.nome)
        notificar("Pessoa cadastrada com sucesso")
        pessoas.push(pessoa)
        localStorage.setItem("pessoas", JSON.stringify(pessoas))
        fecharCadastro()
    }
}

botaoClose.onclick = function(){
    fecharCadastro()
}

botaoEditar.onclick = function(){
    const pessoas = JSON.parse(localStorage.getItem("pessoas"))  
    const pessoa = JSON.parse(localStorage.getItem("pessoa"))
    let retorno = verificarEntrada()
    if(retorno){
        const pessoaEditado = JSON.parse(localStorage.getItem("pessoa"))
        const pessoasAtualizados = pessoas.map(u => {
            if (u.email === pessoaEditado.email) {
                return pessoaEditado
            }
            return u
        })
        localStorage.setItem("pessoas", JSON.stringify(pessoasAtualizados))
        let edicao = ""
        if(pessoa.nome != pessoaEditado.nome){
            edicao = edicao + " Nome alterado de: "+ pessoa.nome + " para "+pessoaEditado.nome + "."
        }
        if(pessoa.email != pessoaEditado.email){
            edicao = edicao + " Email alterado de: "+ pessoa.email + " para " + pessoaEditado.email + "."
        }
        if(pessoa.idade != pessoaEditado.idade){
            edicao = edicao + " Idade alterada de: "+ pessoa.idade + " para " + pessoaEditado.idade + "."
        }
        if(pessoa.status != pessoaEditado.status){
            edicao = edicao + " Status alterado de: "+ pessoa.status + " para " + pessoaEditado.status + "."
        }
        if(pessoa.endereco != pessoaEditado.endereco){
            edicao = edicao + " Endereço atualizado."
        }
        if(pessoa.informacoes != pessoaEditado.informacoes){
            edicao = edicao + " Informações de dados e fatos atualizados."
        }
        if(pessoa.interesses != pessoaEditado.interesses){
            edicao = edicao + " Interesses atualizados."
        }
        if(pessoa.sentimentos != pessoaEditado.sentimentos){
            edicao = edicao + " Sentimentos atualizados."
        }
        if(pessoa.valores != pessoaEditado.valores){
            edicao = edicao + " Valores atualizados."
        }
        enviarLog("Editou a pessoa: " + pessoa.nome +"."+ edicao)
        notificar("Pessoa editada com sucesso")
        fecharCadastro()
    }
}

botaoExcluir.onclick = function(){
    const pessoas = JSON.parse(localStorage.getItem("pessoas"))
    const pessoa = JSON.parse(localStorage.getItem("pessoa"))
    const pessoasAtualizados = pessoas.map(u => {
        if (u.email === pessoa.email) {
            return { ...u, deletado: true, status: "Inativo" }
        }
            return u
        })
    localStorage.setItem("pessoas", JSON.stringify(pessoasAtualizados))
    
    enviarLog("Excluiu a pessoa: " + pessoa.nome)
    notificar("Pessoa excluida com sucesso")
    popupExcluir.close()
    fecharCadastro()
}

botaoRestaurar.onclick = function(){
    const pessoas = JSON.parse(localStorage.getItem("pessoas"))
    const pessoa = JSON.parse(localStorage.getItem("pessoa"))
    const pessoasAtualizados = pessoas.map(u => {
        if (u.email === pessoa.email) {
            return { ...u, deletado: false }
        }
            return u
        })
    localStorage.setItem("pessoas", JSON.stringify(pessoasAtualizados))
    enviarLog("Restaurou a pessoa: " + pessoa.nome)
    notificar("Pessoa restaurada com sucesso")
    fecharCadastro()
}

carregarPessoa()