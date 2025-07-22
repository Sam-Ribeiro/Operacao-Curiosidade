usuario = JSON.parse(localStorage.getItem("usuario"))
function preencherTabela(){
    if(usuario){
        var tabela = document.getElementById("tabela-logs")
        let logs = JSON.parse(localStorage.getItem("logs")) || []
        tamanho = logs.length

        while (tabela.rows.length > 1) {
            tabela.deleteRow(1)
        }
        
        logs = ordenarTabela(logs)
        logs = filtrarPesquisa(logs)
        logs = dividirPaginas(logs)
        
        for(var i = 0; i < logs.length ; i++){
            const log = logs[i]
            var totalLinhas = tabela.rows.length
            var linha = tabela.insertRow(totalLinhas)

            var celulausuario = linha.insertCell(0)
            var celulaEvento = linha.insertCell(1)
            var celulaData = linha.insertCell(2)
            if(i%2==0){
                linha.classList.add("par")
            }

            let data = new Date(log.data)
            dataFormatada = formatarData(data)

            celulausuario.innerHTML = log.usuario
            celulaEvento.innerText = log.evento
            celulaData.innerText = dataFormatada
        }
    }
}
function ordenarTabela(logs){
    ths = document.querySelectorAll("th strong")
    ths.forEach((iconeOrdem) => iconeOrdem.style.visibility = "hidden")
    switch(ordem){
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
    return logs
}

function filtrarPesquisa(logs){
    if(filtro != ''){
        paginaAtual = 1
        controlaPagina()
        filtro = filtro.toLowerCase()
        logs = logs.filter(u => 
            u.evento.toLowerCase().includes(filtro) || 
            u.usuario.toLowerCase().includes(filtro)
        )
    }
    return logs
}

function dividirPaginas(logs){
    paginas = logs.length / itensPorPagina | 0
    if (logs.length % itensPorPagina !== 0) {
        paginas++
    }
    const logInicial = (paginaAtual - 1) * itensPorPagina
    let logFinal = logInicial + itensPorPagina

    if (logFinal > logs.length) {
        logFinal = logs.length
    }
    logs = logs.slice(logInicial, logFinal)
    return logs
}

function formatarData(data){
    let dia = String(data.getDate()).padStart(2, '0')
    let mes = String(data.getMonth() + 1).padStart(2, '0')
    let ano = data.getFullYear()
    let hora = String(data.getHours()).padStart(2, '0')
    let minutos = String(data.getMinutes()).padStart(2, '0')
    let dataFormatada = `${dia}/${mes}/${ano} - ${hora}:${minutos}`
    return dataFormatada
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
        botaoPaginaProxima.style.color = "gray"
        botaoPaginaAnterior.style.color = "gray"
    }
}

let filtro = ''
let ordem = 4
let paginaAtual = 1
let paginas = 1
let tamanho = 10
let itensPorPagina = 10

const paginaSpan = document.getElementById("span-pagina")
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

document.addEventListener('keyup', (event) => {
    filtro = document.getElementById("pesquisa").value
    preencherTabela()
    if (event.key === 'Enter') {
        event.preventDefault()
    }
    controlaPagina()
})

botaoUsuario.onclick = function(){
    if(ordem == 0){
        ordem = 1
    }else{
        ordem = 0
    }
    preencherTabela()
}

botaoEvento.onclick = function(){
    if(ordem == 2){
        ordem = 3
    }else{
        ordem = 2
    }
    preencherTabela()
}

botaoData.onclick = function(){
    if(ordem == 4){
        ordem = 5
    }else{
        ordem = 4
    }
    preencherTabela()
}

botaoSair.onclick = function(){
    localStorage.removeItem("usuario")
}

preencherTabela()
validarUsuario()
controlaPagina()