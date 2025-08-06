const botaoImprimir = document.getElementById("btn-imprimir")
botaoImprimir.addEventListener("click", async function() {
    paginaAtual = 1
    var pageSize = itensPorPagina
    itensPorPagina = -1
    var ready = await preencherTabela(incluidos)
    if(ready){
        window.print()
    }
    
    itensPorPagina = pageSize
    controlaPagina()
    preencherTabela(incluidos)
})

botaoSair.onclick = function(){
    localStorage.removeItem("token")
}

validateUser()