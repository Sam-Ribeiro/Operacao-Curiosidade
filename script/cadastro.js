
function validaUsuario(){
    if(user){
        nome_perfil = document.getElementById("usuario")
        icone_perfil = document.getElementById("icone")
        nome_perfil.innerText = user.user_nome
        icone_perfil.innerText = user.user_nome.charAt(0).toUpperCase()
    }else{
        window.location.href = "../pages/login.html"
    }
};

function preencherTabela(){
    var tabela = document.getElementById("tabela-cadastros")
    if(tabela){
        while (tabela.rows.length > 1) {
            tabela.deleteRow(1);
        }
        let usuarios = null
        switch(orderby){
            case 0:
                usuarios = organizarAZ()
                break
            case 1:
                usuarios = organizarZA()
                break
            case 2:
                usuarios = organizarStatus()
                break
            case 3:
                usuarios = organizarStatusInativo()
                break
            case 4:
                usuarios = organizarAZ()
                break
            case 5:
                usuarios = organizarZA()
                break        
            default:
                usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
                break            
        }
        for(var i = 0; i < usuarios.length ; i++){
            const usuario = usuarios[i];
            var qtdLinhas = tabela.rows.length;
            var linha = tabela.insertRow(qtdLinhas)

            var celulaNome = linha.insertCell(0)
            var celulaEmail = linha.insertCell(1)
            var celulaStatus = linha.insertCell(2)
                
            var link = '<a class="link-usuario" id="'+ i +'" href="#">'+ usuario.nome +'</a>';     

            celulaNome.innerHTML = link
            celulaEmail.innerText = usuario.email
            celulaStatus.innerText = usuario.status

            if(usuario.status == "Inativo"){
                linha.style.color = 'gray'
            }
        }
        const links = document.querySelectorAll('.link-usuario');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                const elementoClicado = event.target;
                const idLink = elementoClicado.id;
                const usuario = usuarios[idLink];
                localStorage.setItem("usuario", JSON.stringify(usuario))
                const modal = document.querySelector("dialog")
                window.location.href = "../pages/cadastro.html"
            });
        });
    }
}

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

function organizarAZ(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => a.nome.localeCompare(b.nome))
    return usuarios
}

function organizarZA(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => a.nome.localeCompare(b.nome))
    return usuarios
}

function organizarStatus(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => {
        if (a.status === "Ativo" && b.status === "Inativo") {
            return -1;
        }
        if (a.status === "Inativo" && b.status === "Ativo") {
            return 1;
        }
            return 0;
    });
    return usuarios
}

function organizarStatusInativo(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => {
        if (b.status === "Ativo" && a.status === "Inativo") {
            return -1;
        }
        if (b.status === "Inativo" && a.status === "Ativo") {
            return 1;
        }
            return 0;
    });
    return usuarios
}
/////////
let orderby = 0
const user = JSON.parse(localStorage.getItem("user"));
const modal = document.querySelector("dialog")
const botaoModal = document.getElementById("novo-cadastro")
const botaoClose = document.getElementById("btn-cancelar")
const botaoGravar = document.getElementById("btn-gravar")
const botaoSair = document.getElementById("sair")
const botaoNome = document.getElementById("nome")
const botaoEmail = document.getElementById("email")
const botaoStatus = document.querySelector("tr #status")
const botaoDia = document.getElementById("cad-data")

botaoNome.onclick = function(){
    if(orderby == 0){
        orderby = 1
    }else{
        orderby = 0
    }
    preencherTabela();
}
botaoEmail.onclick = function(){
    if(orderby == 4){
        orderby = 5
    }else{
        orderby = 4
    }
    preencherTabela();
}
botaoStatus.onclick = function(){
    if(orderby == 2){
        orderby = 3
    }else{
        orderby = 2
    }
    preencherTabela();
}
botaoDia.onclick = function(){
    if(orderby == 0){
        orderby = 1
    }else{
        orderby = 0
    }
    preencherTabela();
}

botaoSair.onclick = function(){
    localStorage.removeItem("user")
}
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

//////////////
organizarAZ();

preencherTabela();
validaUsuario();
carregarUsuario();
