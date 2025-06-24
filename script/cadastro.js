function carregarPessoa(){
    const pessoa = JSON.parse(localStorage.getItem("pessoa"))
    const modal = document.querySelector("dialog")
    const titulo = document.querySelector("dialog #titulo-modal")
    titulo.innerText = "Novo Cadastro"
    if(pessoa){
        modal.showModal()
        
        if(pessoa.deletado){
            titulo.innerText = "Usuário apagado"
            botaoGravar.style.display = 'none'
            botaoEditar.style.display = 'none'
            botaoExcluir.style.display = 'none'
            botaoRestaurar.style.display = 'block'
        }else{
            titulo.innerText = "Editar pessoa"
            botaoGravar.style.display = 'none'
            botaoEditar.style.display = 'block'
            botaoExcluir.style.display = 'block'
            botaoRestaurar.style.display = 'none'
        }
        document.querySelector("dialog #nome").value = pessoa.nome
        document.querySelector("dialog #email").value = pessoa.email
        document.querySelector("dialog #idade").value = pessoa.idade
        document.querySelector("dialog #endereco").value = pessoa.endereco
        document.querySelector("dialog #informacoes").value = pessoa.informacoes
        document.querySelector("dialog #interesses").value = pessoa.interesses
        document.querySelector("dialog #sentimentos").value = pessoa.sentimentos
        document.querySelector("dialog #valores").value = pessoa.valores
        let checkbox = document.querySelector("dialog #status-toggle")
        if(pessoa.status == "Ativo"){
            checkbox.checked = true
        }
    }
}

function verificarEntrada(){
    var erro = document.getElementById("erro")
    erro.style.display = 'none'
    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []
    const pessoaEditado = JSON.parse(localStorage.getItem("pessoa")) || []
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const checkbox = document.querySelector("dialog #status-toggle")
    if(checkbox.checked == true){
        var status = "Ativo"
    }else{
        var status = "Inativo"
    }

    const pessoa ={
        nome: document.querySelector("dialog #nome").value,
        email: document.querySelector("dialog #email").value,
        status: status,
        idade:  document.querySelector("dialog #idade").value,
        endereco: document.querySelector("dialog #endereco").value,
        informacoes: document.querySelector("dialog #informacoes").value,
        interesses: document.querySelector("dialog #interesses").value,
        sentimentos: document.querySelector("dialog #sentimentos").value,
        valores: document.querySelector("dialog #valores").value,
        dataCadastro: new Date().toISOString(),
        deletado: false
    }

    const outrasPessoas = pessoas.filter(u => u.email !== pessoaEditado.email)
    
    if(!pessoa.nome || !pessoa.email || !pessoa.idade || !pessoa.endereco){
        erro.innerText = "Preencha os campos obrigatórios!"
        erro.style.display = 'block'
        return false
    }else if(outrasPessoas.some(u => u.email === pessoa.email)){
        erro.innerText = "Email Inválido"
        erro.style.display = 'block'
        return false
    }else if(!emailRegex.test(pessoa.email)){
        erro.innerText = "Email inválido"
        erro.style.display = 'block'
        return false
    }else if( Number(pessoa.idade)<1 || Number(pessoa.idade>120) || isNaN(Number(pessoa.idade))){
        erro.innerText = "Idade inválida"
        erro.style.display = 'block'
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

const modal = document.querySelector("dialog")
const botaoModal = document.getElementById("novo-cadastro")
const botaoClose = document.getElementById("btn-cancelar")
const botaoGravar = document.getElementById("btn-gravar")
const botaoEditar = document.getElementById("btn-editar")
const botaoExcluir = document.getElementById("btn-excluir")
const botaoRestaurar =  document.getElementById("btn-restaurar")

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        event.preventDefault()
        modal.close()
        localStorage.removeItem("pessoa")
        let form = document.getElementById("form-cadastro")
        form.reset()
    }
})

botaoModal.onclick = function (){
    modal.showModal()
    botaoGravar.style.display = 'block'
    botaoEditar.style.display = 'none'
    botaoExcluir.style.display = 'none'
}

botaoGravar.onclick = function (){
    const pessoas = JSON.parse(localStorage.getItem("pessoas")) || []
    let retorno = verificarEntrada()
    if(retorno){
        const pessoa = JSON.parse(localStorage.getItem("pessoa"))
        enviarLog("Cadastrou a pessoa: "+pessoa.nome)
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
    fecharCadastro()
}

carregarPessoa()