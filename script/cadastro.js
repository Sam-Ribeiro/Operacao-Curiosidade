
function carregarUsuario(){
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const modal = document.querySelector("dialog")
    if(usuario){
        modal.showModal()
        document.querySelector("dialog #nome").value = usuario.nome
        document.querySelector("dialog #email").value = usuario.email
        document.querySelector("dialog #idade").value = usuario.idade
        document.querySelector("dialog #endereco").value = usuario.endereco
        document.querySelector("dialog #informacoes").value = usuario.informacoes
        document.querySelector("dialog #interesses").value = usuario.interesses
        document.querySelector("dialog #sentimentos").value = usuario.sentimentos
        document.querySelector("dialog #valores").value = usuario.valores
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

botaoModal.onclick = function (){
    modal.showModal()
}
botaoClose.onclick = function(){
    modal.close()
    localStorage.removeItem("usuario")
}
botaoGravar.onclick = function (){
    preencheStorage();
}

carregarUsuario();
