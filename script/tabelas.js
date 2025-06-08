function validaUsuario(){
    const user = JSON.parse(localStorage.getItem("user"));
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
                usuarios = organizarEmailAZ()
                break
            case 5:
                usuarios = organizarEmailZA()
                break
            case 6:
                usuarios = organizarDataRecente()
                break
            case 7:
                usuarios = organizarDataAntiga()
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
            var celulaData = linha.insertCell(3)
                
            var link = '<a class="link-usuario" id="'+ i +'" href="#">'+ usuario.nome +'</a>';

            let data = new Date(usuario.dataCadastro);
            let dia = String(data.getDate()).padStart(2, '0');
            let mes = String(data.getMonth() + 1).padStart(2, '0');
            let ano = data.getFullYear();

            let dataFormatada = `${dia}/${mes}/${ano}`; 

            celulaNome.innerHTML = link
            celulaEmail.innerText = usuario.email
            celulaStatus.innerText = usuario.status
            celulaData.innerText = dataFormatada

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
                window.location.href = "../pages/cadastro.html"
            });
        });
    }
}

function organizarAZ(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => a.nome.localeCompare(b.nome))
    return usuarios
}

function organizarZA(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => b.nome.localeCompare(a.nome))
    return usuarios
}

function organizarEmailAZ(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => a.email.localeCompare(b.email))
    return usuarios
}

function organizarEmailZA(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => b.email.localeCompare(a.email))
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

function organizarDataAntiga() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => {
        return new Date(a.dataCadastro) - new Date(b.dataCadastro);
    });
    return usuarios;
}

function organizarDataRecente() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.sort((a, b) => {
        return new Date(b.dataCadastro) - new Date(a.dataCadastro);
    });
    return usuarios;
}

let orderby = 0
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
    console.log(orderby)
}
botaoEmail.onclick = function(){
    if(orderby == 4){
        orderby = 5
    }else{
        orderby = 4
    }
    preencherTabela();
    console.log(orderby)
}
botaoStatus.onclick = function(){
    if(orderby == 2){
        orderby = 3
    }else{
        orderby = 2
    }
    preencherTabela();
    console.log(orderby)
}
botaoDia.onclick = function(){
    if(orderby == 7){
        orderby = 6
    }else{
        orderby = 7
    }
    preencherTabela();
    console.log(orderby)
}
botaoSair.onclick = function(){
    localStorage.removeItem("user")
}

preencherTabela();
validaUsuario();