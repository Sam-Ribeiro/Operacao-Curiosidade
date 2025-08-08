async function preencherTabela(){
    var tabela = document.getElementById("tabela-logs")
    const result = await QueryLogs(paginaAtual,ordem,itensPorPagina,filtro)
    let logs = result.data
    orderHeaderRefresh()
    while (tabela.rows.length > 1) {
        tabela.deleteRow(1)
    }
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

        let data = new Date(log.eventDate)
        dataFormatada = formatarData(data)

        celulausuario.innerHTML = log.username
        celulaEvento.innerText = log.message
        celulaData.innerText = dataFormatada
    }
    return true
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

async function controlaPagina(){
    const result = await getLogsPages(itensPorPagina,filtro)
    if(await result.isOk){
        paginas = result.data
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
}

function orderHeaderRefresh(){
    ths = document.querySelectorAll("th strong")
    ths.forEach((iconeOrdem) => iconeOrdem.style.visibility = "hidden")
    switch(ordem){
        case 0:
            th = document.querySelector("th:nth-child(1) strong")
            th.innerHTML ="&#11167"
            th.style.visibility = "visible"
            break
        case 1:
            th = document.querySelector("th:nth-child(1) strong")
            th.innerHTML = "&#11165"
            th.style.visibility = "visible"
            break
        case 2:
            th = document.querySelector("th:nth-child(2) strong")
            th.innerHTML ="&#11167"
            th.style.visibility = "visible"
            break
        case 3:
            th = document.querySelector("th:nth-child(2) strong")
            th.innerHTML = "&#11165"
            th.style.visibility = "visible"
            break
        case 4:
            th = document.querySelector("th:nth-child(3) strong")
            th.innerHTML ="&#11167"
            th.style.visibility = "visible"
            break
        case 5:
            th = document.querySelector("th:nth-child(3) strong")
            th.innerHTML = "&#11165"
            th.style.visibility = "visible"
            break                
        default:
            break            
        }
}

let filtro = ''
let ordem = 5
let paginaAtual = 1
let paginas = 1
let itensPorPagina = 10
const incluidos = true
const paginaSpan = document.getElementById("span-pagina")
const botaoSair = document.getElementById("sair")
const botaoUsuario = document.getElementById("evento-usuario")
const botaoEvento = document.getElementById("evento-nome")
const botaoData = document.getElementById("evento-data")
const botaoPesquisar = document.getElementById("btn-pesquisar")
const botaoPaginaProxima = document.getElementById("btn-proxima")
const botaoPaginaAnterior = document.getElementById("btn-anterior")
let timeOut
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
    if (event.key === 'Enter') {
        event.preventDefault()
        filtro = document.getElementById("pesquisa").value
        paginaAtual = 1;
        preencherTabela(true)
    }
})

document.addEventListener('keyup', (event) => {
    if(event.target == document.getElementById("pesquisa")){
        clearTimeout(timeOut)
        timeOut = setTimeout(() => { 
            paginaAtual = 1;
            preencherTabela(true)
        },750)
        filtro = document.getElementById("pesquisa").value
    }
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
    localStorage.removeItem("token")
}

preencherTabela()
validateUser()
controlaPagina()