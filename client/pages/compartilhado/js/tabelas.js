
async function preencherTabela(incluido){
    var tabela = document.getElementById("tabela-cadastros")
    
    let result = null
    if(incluido){
        result = await QueryPersons(paginaAtual,ordem,itensPorPagina,filtro)
    }else{
        result = await QueryDeletedPersons(paginaAtual,ordem,itensPorPagina,filtro)
    }
    let pessoas = await result.data

    while (tabela.rows.length > 1) {
        tabela.deleteRow(1)
    }
    orderHeaderRefresh()
    for(var i = 0; i < pessoas.length ; i++){
        const pessoa = pessoas[i]
        var totalLinhas = tabela.rows.length
        var linha = tabela.insertRow(totalLinhas)
        if(i%2==0){
            linha.classList.add("par")
        }
        var celulaNome = linha.insertCell(0)
        var celulaEmail = linha.insertCell(1)
        var celulaStatus = linha.insertCell(2)
        var celulaData = linha.insertCell(3)
            
        var link = '<a class="link-pessoa" id="'+ pessoa.id +'" href="#">'+ pessoa.name +'</a>'

        let data = new Date(pessoa.registrationDate)
        let dataFormatada = formatarData(data)

        let status = "status" 
        if(pessoa.status){
            status = `<span class="status-ativo"> Ativo <span>`
        }else{
            status = `<span class="status-inativo"> Inativo <span>`
        }

        celulaNome.innerHTML = link
        celulaEmail.innerText = pessoa.email
        celulaStatus.innerHTML = status
        celulaData.innerText = dataFormatada
    }
    criarLinks(pessoas)
    return true
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
            th = document.querySelector("th:nth-child(3) strong")
            th.innerHTML ="&#11167"
            th.style.visibility = "visible"
            break
        case 3:
            th = document.querySelector("th:nth-child(3) strong")
            th.innerHTML = "&#11165"
            th.style.visibility = "visible"
            break
        case 4:
            th = document.querySelector("th:nth-child(2) strong")
            th.innerHTML ="&#11167"
            th.style.visibility = "visible"
            break
        case 5:
            th = document.querySelector("th:nth-child(2) strong")
            th.innerHTML = "&#11165"
            th.style.visibility = "visible"
            break
        case 6:
            th = document.querySelector("th:nth-child(4) strong")
            th.innerHTML ="&#11167"
            th.style.visibility = "visible"
            break
        case 7:
            th = document.querySelector("th:nth-child(4) strong")
            th.innerHTML = "&#11165"
            th.style.visibility = "visible"
            break                
        default:
            break            
    }
}

function criarLinks(pessoas){
    const links = document.querySelectorAll('.link-pessoa')
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const elementoClicado = event.target
            const personId = elementoClicado.id
            window.location.href = `../../../client/pages/cadastrar-pessoa/cadastro.html?id=${personId}`
        })
    })
}

function formatarData(data){
    let dia = String(data.getDate()).padStart(2, '0')
    let mes = String(data.getMonth() + 1).padStart(2, '0')
    let ano = data.getFullYear()
    let dataFormatada = `${dia}/${mes}/${ano}`
    return dataFormatada
}

function organizarStatus(pessoas){
    pessoas.sort((a, b) => {
        if (a.status === "Ativo" && b.status === "Inativo") {
            return -1
        }
        if (a.status === "Inativo" && b.status === "Ativo") {
            return 1
        }
            return 0
    })
    return pessoas
}

function organizarStatusInativo(pessoas){
    pessoas.sort((a, b) => {
        if (b.status === "Ativo" && a.status === "Inativo") {
            return -1
        }
        if (b.status === "Inativo" && a.status === "Ativo") {
            return 1
        }
            return 0
    })
    return pessoas
}

function organizarDataAntiga(pessoas) {
    pessoas.sort((a, b) => {
        return new Date(a.dataCadastro) - new Date(b.dataCadastro)
    })
    return pessoas
}

function organizarDataRecente(pessoas) {
    pessoas.sort((a, b) => {
        return new Date(b.dataCadastro) - new Date(a.dataCadastro)
    })
    return pessoas
}

async function controlaPagina(){
    const result = await getPersonPages(incluidos,itensPorPagina,filtro)
    if(await result.isOk){
        paginas = result.data
    paginaSpan.innerText = `Exibindo página ${paginaAtual} de ${paginas}`
    botaoPaginaProxima.style.color = "var(--cor-texto)"
    botaoPaginaAnterior.style.color = "var(--cor-texto)"
    if(paginaAtual == paginas){
        botaoPaginaProxima.style.display = 'block'
        botaoPaginaProxima.style.color = "gray"
    }
    if(paginaAtual == 1){
        botaoPaginaAnterior.style.display = 'block'
        botaoPaginaAnterior.style.color = "gray"
    }
    if(paginas == 0){
        paginaSpan.innerText = `Nenhuma informação cadastrada`
        botaoPaginaProxima.style.color = "gray"
        botaoPaginaAnterior.style.color = "gray"
    }
    }
}

let filtro = ''
let ordem = 7
let paginaAtual = 1
let paginas = 0
let itensPorPagina = 10
let search = false
let timeOut
const incluidos = listar()
const paginaSpan = document.getElementById("span-pagina")
const botaoSair = document.getElementById("sair")
const botaoNome = document.getElementById("nome")
const botaoEmail = document.getElementById("email")
const botaoStatus = document.querySelector("tr #status")
const botaoDia = document.getElementById("cad-data")
const botaoPesquisar = document.getElementById("btn-pesquisar")
const botaoPaginaProxima = document.getElementById("btn-proxima")
const botaoPaginaAnterior = document.getElementById("btn-anterior")

botaoPaginaAnterior.onclick = function(){
    if(paginaAtual>1){
        paginaAtual--
        controlaPagina()
        preencherTabela(incluidos)
    }
}
botaoPaginaProxima.onclick = function(){
    if(paginaAtual < paginas){
        paginaAtual++
        controlaPagina()
        preencherTabela(incluidos)
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        filtro = document.getElementById("pesquisa").value
        preencherTabela(incluidos)
    }
})

document.addEventListener('keyup', (event) => {
    if(event.target == document.getElementById("pesquisa")){
        clearTimeout(timeOut)
        timeOut = setTimeout(() => { 
            preencherTabela(incluidos)
            controlaPagina()
        },1000)
        filtro = document.getElementById("pesquisa").value
    }
})

botaoNome.onclick = function(){
    if(ordem == 0){
        ordem = 1
    }else{
        ordem = 0
    }
    preencherTabela(incluidos)
}
botaoEmail.onclick = function(){
    if(ordem == 4){
        ordem = 5
    }else{
        ordem = 4
    }
    preencherTabela(incluidos)
}
botaoStatus.onclick = function(){
    if(ordem == 2){
        ordem = 3
    }else{
        ordem = 2
    }
    preencherTabela(incluidos)
}
botaoDia.onclick = function(){
    if(ordem == 7){
        ordem = 6
    }else{
        ordem = 7
    }
    preencherTabela(incluidos)
}
botaoSair.onclick = function(){
    localStorage.removeItem("token")
}

preencherTabela(incluidos)
controlaPagina()