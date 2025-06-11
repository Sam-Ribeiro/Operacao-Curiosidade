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


const botaoImprimir = document.getElementById("btn-imprimir")
if(botaoImprimir){
    botaoImprimir.addEventListener("click", function() {
        window.print();
    });
}

validaUsuario();