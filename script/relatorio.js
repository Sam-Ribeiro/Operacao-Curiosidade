

const botaoImprimir = document.getElementById("btn-imprimir")

if(botaoImprimir){
    botaoImprimir.addEventListener("click", function() {
        paginaAtual = 1
        itensPorPagina = tamanho
        preencherTabela(listar())
        window.print()
        itensPorPagina = 10
        preencherTabela(listar())
    })
}

validarUsuario()