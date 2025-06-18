
function carregarUsuario(){
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const modal = document.querySelector("dialog")
    const titulo = document.querySelector("dialog #titulo-modal")
    titulo.innerText = "Novo Cadastro"
    if(usuario){
        modal.showModal()
        
        if(usuario.deletado){
            titulo.innerText = "Usuário apagado"
            botaoGravar.style.display = 'none'
            botaoEditar.style.display = 'none'
            botaoExcluir.style.display = 'none'
            botaoRestaurar.style.display = 'block'
        }else{
            titulo.innerText = "Editar Usuário"
            botaoGravar.style.display = 'none'
            botaoEditar.style.display = 'block'
            botaoExcluir.style.display = 'block'
            botaoRestaurar.style.display = 'none'
        }
        document.querySelector("dialog #nome").value = usuario.nome
        document.querySelector("dialog #email").value = usuario.email
        document.querySelector("dialog #idade").value = usuario.idade
        document.querySelector("dialog #endereco").value = usuario.endereco
        document.querySelector("dialog #informacoes").value = usuario.informacoes
        document.querySelector("dialog #interesses").value = usuario.interesses
        document.querySelector("dialog #sentimentos").value = usuario.sentimentos
        document.querySelector("dialog #valores").value = usuario.valores
        let checkbox = document.querySelector("dialog #status-toggle")
        if(usuario.status == "Ativo"){
            checkbox.checked = true
        }
    }
}

function verificaEntrada(){
    var erro = document.getElementById("erro")
    erro.style.display = 'none'
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    const usuarioEditado = JSON.parse(localStorage.getItem("usuario")) || []
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const checkbox = document.querySelector("dialog #status-toggle")
    if(checkbox.checked == true){
        var status = "Ativo"
    }else{
        var status = "Inativo"
    }
    const usuario ={
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
    const outrosUsuarios = usuarios.filter(u => u.email !== usuarioEditado.email)
    if(!usuario.nome || !usuario.email || !usuario.idade || !usuario.endereco){
        erro.innerText = "Preencha os campos obrigatórios!"
        erro.style.display = 'block'
        console.log("retornando esse false")
        return false
    }else if(outrosUsuarios.some(u => u.email === usuario.email)){
        erro.innerText = "Email já cadastrado"
        erro.style.display = 'block'
        return false
    }else if(!emailRegex.test(usuario.email)){
        erro.innerText = "Email inválido"
        erro.style.display = 'block'
        return false
    }else if( Number(usuario.idade)<1 || Number(usuario.idade>120) || isNaN(Number(usuario.idade))){
        erro.innerText = "Idade inválida"
        erro.style.display = 'block'
        return false
    }else{
        localStorage.setItem("usuario", JSON.stringify(usuario))   
        return true     
    }
}

function enviarLog(log){
    const logs = JSON.parse(localStorage.getItem("logs")) || []
    const user = JSON.parse(localStorage.getItem("user")) || []
    const logformatado ={ 
        evento: log,
        data: new Date().toISOString(),
        user: user.user_nome,
    }
    logs.push(logformatado)
    localStorage.setItem("logs", JSON.stringify(logs))
}

const user = JSON.parse(localStorage.getItem("user"))
const modal = document.querySelector("dialog")
const botaoModal = document.getElementById("novo-cadastro")
const botaoClose = document.getElementById("btn-cancelar")
const botaoGravar = document.getElementById("btn-gravar")
const botaoEditar = document.getElementById("btn-editar")
const botaoExcluir = document.getElementById("btn-excluir")
const botaoRestaurar =  document.getElementById("btn-restaurar")

botaoModal.onclick = function (){
    modal.showModal()
    botaoGravar.style.display = 'block'
    botaoEditar.style.display = 'none'
    botaoExcluir.style.display = 'none'
}
botaoGravar.onclick = function (){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    let retorno = verificaEntrada()
    if(retorno){
        const usuario = JSON.parse(localStorage.getItem("usuario"))
        enviarLog("Cadastrou usuário: "+usuario.nome)
        usuarios.push(usuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        localStorage.removeItem("usuario")
        preencherTabela(true)
        modal.close()
        let form = document.getElementById("form-cadastro")
        form.reset()
    }
}
botaoClose.onclick = function(){
    modal.close()
    localStorage.removeItem("usuario")
    let form = document.getElementById("form-cadastro")
    form.reset()
}
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        event.preventDefault()
        modal.close()
        localStorage.removeItem("usuario")
        let form = document.getElementById("form-cadastro")
        form.reset()
    }
})
botaoEditar.onclick = function(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))  
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    let retorno = verificaEntrada()
    if(retorno){
        const usuarioEditado = JSON.parse(localStorage.getItem("usuario"))
        const usuariosAtualizados = usuarios.map(u => {
            if (u.email === usuarioEditado.email) {
                return usuarioEditado
            }
            return u
        })
        localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados))
        let edicao = ""
        if(usuario.nome != usuarioEditado.nome){
            edicao = edicao + " Nome alterado de: "+ usuario.nome + " para "+usuarioEditado.nome + "."
        }
        if(usuario.email != usuarioEditado.email){
            edicao = edicao + " Email alterado de: "+ usuario.email + " para " + usuarioEditado.email + "."
        }
        if(usuario.idade != usuarioEditado.idade){
            edicao = edicao + " Idade alterada de "+ usuario.idade + " para " + usuarioEditado.idade + "."
        }
        if(usuario.status != usuarioEditado.status){
            edicao = edicao + " Status alterada de "+ usuario.status + " para " + usuarioEditado.status + "."
        }
        if(usuario.endereco != usuarioEditado.endereco){
            edicao = edicao + " Endereço atualizado."
        }
        if(usuario.informacoes != usuarioEditado.informacoes){
            edicao = edicao + " Informações de dados e fatos atualizados."
        }
        if(usuario.interesses != usuarioEditado.interesses){
            edicao = edicao + " Interesses atualizados."
        }
        if(usuario.sentimentos != usuarioEditado.sentimentos){
            edicao = edicao + " Sentimentos atualizados."
        }
        if(usuario.valores != usuarioEditado.valores){
            edicao = edicao + " Valores atualizados."
        }
        modal.close()
        enviarLog("Editou usuário: " + usuario.nome +"."+ edicao)
    }
    localStorage.removeItem("usuario")
    preencherTabela(true)
    const form = document.getElementById("form-cadastro")
    form.reset()
}
botaoExcluir.onclick = function(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const usuariosAtualizados = usuarios.map(u => {
        if (u.email === usuario.email) {
            return { ...u, deletado: true }
        }
            return u
        })
    localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados))
    modal.close()
    enviarLog("Excluiu usuário: " + usuario.nome)
    localStorage.removeItem("usuario")
    preencherTabela(true)
    form = document.getElementById("form-cadastro")
    form.reset()
}
botaoRestaurar.onclick = function(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const usuariosAtualizados = usuarios.map(u => {
        if (u.email === usuario.email) {
            return { ...u, deletado: false }
        }
            return u
        })
    localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados))
    modal.close()
    enviarLog("Restaurou usuário: " + usuario.nome)
    localStorage.removeItem("usuario")
    preencherTabela(true)
    form = document.getElementById("form-cadastro")
    form.reset()
}
carregarUsuario()
