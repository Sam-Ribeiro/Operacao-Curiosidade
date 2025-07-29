const botaoImprimir = document.getElementById("btn-imprimir")
botaoImprimir.addEventListener("click", async function() {
    paginaAtual = 1
    var pageSize = itensPorPagina
    itensPorPagina = -1
    var ready = await preencherTabela()
    if(ready){
        window.print()
    }
    controlaPagina()
    itensPorPagina = pageSize
    preencherTabela()
})

validarUsuario()
