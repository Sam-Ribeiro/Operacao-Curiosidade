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
if(document.getElementById("tabela-cadastros")){
    function preencherTabela(){

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        for(var i = usuarios.length - 1; i >= 0 ; i--){
            const usuario = usuarios[i];
            if(usuario.status == "Ativo"){
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
            }
        }
        for(var i = usuarios.length - 1; i >= 0 ; i--){
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
                const modal = document.querySelector("dialog")
                modal.showModal()
            });
        });
}
}


const modal = document.querySelector("dialog")
const botaoModal = document.getElementById("novo-cadastro")
const botaoClose = document.getElementById("btn-cancelar")

botaoModal.onclick = function (){
    modal.showModal()
}
botaoClose.onclick = function(){
    modal.close()
    localStorage.removeItem("usuario")
}

function editarUsuario(){
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const modal = document.querySelector("dialog")
    if(usuario){
        modal.showModal()
    }
}
 
preencherTabela();
validaUsuario();
editarUsuario();
