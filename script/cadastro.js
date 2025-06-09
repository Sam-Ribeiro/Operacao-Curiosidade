
function carregarUsuario(){
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const modal = document.querySelector("dialog")
    if(usuario){
        modal.showModal()
        botaoGravar.style.display = 'none'
        botaoEditar.style.display = 'block'
        botaoExcluir.style.display = 'block'
        document.querySelector("dialog #nome").value = usuario.nome
        document.querySelector("dialog #email").value = usuario.email
        document.querySelector("dialog #idade").value = usuario.idade
        document.querySelector("dialog #endereco").value = usuario.endereco
        document.querySelector("dialog #informacoes").value = usuario.informacoes
        document.querySelector("dialog #interesses").value = usuario.interesses
        document.querySelector("dialog #sentimentos").value = usuario.sentimentos
        document.querySelector("dialog #valores").value = usuario.valores
        let checkbox = document.querySelector("dialog #status")
        if(usuario.status == "Ativo"){
            checkbox.checked = true
        }
    }
}

function preencheStorage(){
    var erro = document.getElementById("erro")
    erro.style.display = 'none'
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const checkbox = document.querySelector("dialog #status")
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
            dataCadastro: new Date().toISOString()
        }
    if(!usuario.nome || !usuario.email || !usuario.status || !usuario.idade || !usuario.endereco || !usuario.informacoes || !usuario.interesses || !usuario.sentimentos || !usuario.valores){
        erro.innerText = "Preencha todos os campos"
        erro.style.display = 'block'
    }else if(usuarios.some(u => u.email === usuario.email)){
        erro.innerText = "Email já cadastrado"
        erro.style.display = 'block'
    }else if(!emailRegex.test(usuario.email)){
        erro.innerText = "Email inválido"
        erro.style.display = 'block'
    }else if( Number(usuario.idade)<1 || Number(usuario.idade>120) || isNaN(Number(usuario.idade))){
        erro.innerText = "Idade inválida"
        erro.style.display = 'block'
    }else{   
        usuarios.push(usuario)
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
        preencherTabela();
        modal.close()
        localStorage.removeItem("usuario")
    }
}

const user = JSON.parse(localStorage.getItem("user"));
const modal = document.querySelector("dialog")
const botaoModal = document.getElementById("novo-cadastro")
const botaoClose = document.getElementById("btn-cancelar")
const botaoGravar = document.getElementById("btn-gravar")
const botaoEditar = document.getElementById("btn-editar")
const botaoExcluir = document.getElementById("btn-excluir")

botaoModal.onclick = function (){
    modal.showModal()
    botaoGravar.style.display = 'block'
    botaoEditar.style.display = 'none'
    botaoExcluir.style.display = 'none'
}
botaoGravar.onclick = function (){
    preencheStorage();
}
botaoClose.onclick = function(){
    modal.close()
    localStorage.removeItem("usuario")
}
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        modal.close()
        localStorage.removeItem("usuario")
    }
});
botaoEditar.onclick = function(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))  
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const usuariosAtualizados = usuarios.filter(u => u.email !== usuario.email)
    localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados))
    preencheStorage()
}


carregarUsuario();
