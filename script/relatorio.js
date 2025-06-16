

const botaoImprimir = document.getElementById("btn-imprimir")
if(botaoImprimir){
    botaoImprimir.addEventListener("click", function() {
        window.print();
    });
}

validaUsuario()