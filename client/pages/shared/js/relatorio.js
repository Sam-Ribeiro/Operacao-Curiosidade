const botaoImprimir = document.getElementById("btn-imprimir")
const tableSection = document.querySelector(".tabela")
botaoImprimir.addEventListener("click", async function() {
    tableSection.classList.remove("overflow")
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
    tableSection.classList.add("overflow")
})

botaoSair.onclick = function(){
    localStorage.removeItem("token")
    localStorage.removeItem("name")
}

validateUser()