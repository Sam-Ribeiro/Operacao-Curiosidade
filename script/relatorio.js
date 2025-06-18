

const botaoImprimir = document.getElementById("btn-imprimir")

if(botaoImprimir){
    botaoImprimir.addEventListener("click", function() {
        paginaAtual = 1
        itensPorPagina = tamanho
        preencherTabela(listar())
        window.print()
        itensPorPagina = 22
        preencherTabela(listar())
    })
}

validaUsuario()