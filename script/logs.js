function preencherTabela(){
    var tabela = document.getElementById("tabela-logs")
    if(tabela){
        while (tabela.rows.length > 1) {
            tabela.deleteRow(1)
        }
        let logs = JSON.parse(localStorage.getItem("logs")) || []
        tamanho = logs.length
        ths = document.querySelectorAll("th strong")
        ths.forEach((ordem) => ordem.style.visibility = "hidden")
        switch(orderby){
            case 0:
                logs.sort((a, b) => a.usuario.localeCompare(b.usuario))
                th = document.querySelector("th:nth-child(1) strong")
                th.innerHTML ="&#11167"
                th.style.visibility = "visible"
                break
            case 1:
                logs.sort((a, b) => b.usuario.localeCompare(a.usuario))
                th = document.querySelector("th:nth-child(1) strong")
                th.innerHTML = "&#11165"
                th.style.visibility = "visible"
                break
            case 2:
                logs.sort((a, b) => a.evento.localeCompare(b.evento))
                th = document.querySelector("th:nth-child(2) strong")
                th.innerHTML ="&#11167"
                th.style.visibility = "visible"
                break
            case 3:
                logs.sort((a, b) => b.evento.localeCompare(a.evento))
                th = document.querySelector("th:nth-child(2) strong")
                th.innerHTML = "&#11165"
                th.style.visibility = "visible"
                break
            case 4:
                logs = organizarDataRecente(logs)
                th = document.querySelector("th:nth-child(3) strong")
                th.innerHTML ="&#11167"
                th.style.visibility = "visible"
                break
            case 5:
                logs = organizarDataAntiga(logs)
                th = document.querySelector("th:nth-child(3) strong")
                th.innerHTML = "&#11165"
                th.style.visibility = "visible"
                break                
            default:
                logs = JSON.parse(localStorage.getItem("logs")) || []
                break            
        }
        if(filtro != ''){
            filtro = filtro.toLowerCase()
            logs = logs.filter(u => 
                u.evento.toLowerCase().includes(filtro) || 
                u.usuario.toLowerCase().includes(filtro)
             )
        }
        paginas = logs.length / itensPorPagina | 0
        if (logs.length % itensPorPagina !== 0) {
            paginas++
        }
        const paginaInicial = (paginaAtual - 1) * itensPorPagina
        let paginaFinal = paginaInicial + itensPorPagina

        if (paginaFinal > logs.length) {
            paginaFinal = logs.length
        }
        logs = logs.slice(paginaInicial, paginaFinal)
        for(var i = 0; i < logs.length ; i++){
            const log = logs[i]
            var qtdLinhas = tabela.rows.length
            var linha = tabela.insertRow(qtdLinhas)

            var celulausuario = linha.insertCell(0)
            var celulaEvento = linha.insertCell(1)
            var celulaData = linha.insertCell(2)
            if(i%2==0){
                linha.classList.add("par")
            }
            let data = new Date(log.data)
            let dia = String(data.getDate()).padStart(2, '0')
            let mes = String(data.getMonth() + 1).padStart(2, '0')
            let ano = data.getFullYear()
            let hora = String(data.getHours()).padStart(2, '0')
            let minutos = String(data.getMinutes()).padStart(2, '0')

            let dataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minutos}`

            celulausuario.innerHTML = log.usuario
            celulaEvento.innerText = log.evento
            celulaData.innerText = dataFormatada
        }
    }
}

function organizarDataAntiga(logs) {
    logs.sort((a, b) => {
        return new Date(a.data) - new Date(b.data)
    })
    return logs
}

function organizarDataRecente(logs) {
    logs.sort((a, b) => {
        return new Date(b.data) - new Date(a.data)
    })
    return logs
}

function controlaPagina(){
    paginaSpan.innerText = `Exibindo página ${paginaAtual} de ${paginas}`
    botaoPaginaProxima.style.color = "var(--cor-texto)"
    botaoPaginaAnterior.style.color = "var(--cor-texto)"
    if(paginaAtual >= paginas){
        botaoPaginaProxima.style.color = "gray"
    }
    if(paginaAtual <= 1){
        botaoPaginaAnterior.style.color = "gray"
    }
    if(paginas == 0){
        paginaSpan.innerText = `Nenhuma informação cadastrada`
        botaoPaginaAnterior.style.display = 'none'
        botaoPaginaProxima.style.display = 'none'
    }
}

let filtro = ''
let orderby = 4
let paginaAtual = 1
let paginas = 1
let tamanho = 10
const paginaSpan = document.getElementById("span-pagina")
let itensPorPagina = 10
const botaoSair = document.getElementById("sair")
const botaoUsuario = document.getElementById("evento-usuario")
const botaoEvento = document.getElementById("evento-nome")
const botaoData = document.getElementById("evento-data")
const botaoPesquisar = document.getElementById("btn-pesquisar")
const botaoPaginaProxima = document.getElementById("btn-proxima")
const botaoPaginaAnterior = document.getElementById("btn-anterior")

botaoPaginaAnterior.onclick = function(){
    if(paginaAtual>1){
        paginaAtual--
        controlaPagina()
        preencherTabela()
    }
}
botaoPaginaProxima.onclick = function(){
    if(paginaAtual < paginas){
        paginaAtual++
        controlaPagina()
        preencherTabela()
    }
}

document.addEventListener('keydown', (event) => {
    filtro = document.getElementById("pesquisa").value
    preencherTabela()
    if (event.key === 'Enter') {
        event.preventDefault()
    }
    controlaPagina()
})

botaoUsuario.onclick = function(){
    if(orderby == 0){
        orderby = 1
    }else{
        orderby = 0
    }
    preencherTabela()
}
botaoEvento.onclick = function(){
    if(orderby == 2){
        orderby = 3
    }else{
        orderby = 2
    }
    preencherTabela()
}
botaoData.onclick = function(){
    if(orderby == 4){
        orderby = 5
    }else{
        orderby = 4
    }
    preencherTabela()
}
botaoSair.onclick = function(){
    localStorage.removeItem("usuario")
}

preencherTabela()
validarUsuario()
controlaPagina()