const user = JSON.parse(localStorage.getItem("user"));
document.getElementById("sair").addEventListener("click",function sair(){
    localStorage.removeItem("user")}
)

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

function atualizaDados(){
    totalCadastros = document.querySelector("#bloco1 h1")
    cadastrosMes = document.querySelector("#bloco2 h1")
    cadastrosRevisao = document.querySelector("#bloco3 h1")

    totalCadastros.innerText = "25"
    cadastrosMes.innerText = "50"
    cadastrosRevisao.innerText = "75"
}
atualizaDados();
validaUsuario();

function preencherTabela(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    for(var i = usuarios.length - 1; i>usuarios.length-11; i--){
        const usuario = usuarios[i];
        if(usuario.status == "Ativo"){
        var tabela = document.getElementById("tabela-cadastros")
        var qtdLinhas = tabela.rows.length;
        var linha = tabela.insertRow(qtdLinhas)

        var celulaNome = linha.insertCell(0)
        var celulaEmail = linha.insertCell(1)
        var celulaStatus = linha.insertCell(2)

        var link = '<a class="link-usuario" id="'+i+'" href="#">'+usuario.nome+'</a>';    

        celulaNome.innerHTML = link
        celulaEmail.innerText = usuario.email
        celulaStatus.innerText = usuario.status
        }
    }
    for(var i = usuarios.length - 1; i>usuarios.length-11; i--){
        const usuario = usuarios[i];
        if(usuario.status == "Inativo"){
        var tabela = document.getElementById("tabela-cadastros")
        var qtdLinhas = tabela.rows.length;
        var linha = tabela.insertRow(qtdLinhas)  
        var celulaNome = linha.insertCell(0)
        var celulaEmail = linha.insertCell(1)
        var celulaStatus = linha.insertCell(2)

        var link = '<a class="link-usuario" id="'+ i +'" href="#">'+ usuario.nome +'</a>';    

        celulaNome.innerHTML = link
        celulaEmail.innerText = usuario.email
        celulaStatus.innerText = usuario.status

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
preencherTabela()







/* Preencher Tabela pra teste
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
function preencheStorage(){
    const usuario ={
            nome: "Evandro Padilha",
            email: "dinho123@outlook.com",
            status: "Ativo",
        }
    usuarios.push(usuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
}
preencheStorage();
*/