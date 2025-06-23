function preencherTabela(incluido){
    var tabela = document.getElementById("tabela-cadastros")
    if(tabela){
        while (tabela.rows.length > 1) {
            tabela.deleteRow(1)
        }
        let pessoas = JSON.parse(localStorage.getItem("pessoas")) || []
        tamanho = pessoas.length
        ths = document.querySelectorAll("th strong")
        ths.forEach((ordem) => ordem.style.visibility = "hidden")
        switch(orderby){
            case 0:
                pessoas.sort((a, b) => a.nome.localeCompare(b.nome))
                th = document.querySelector("th:nth-child(1) strong")
                th.innerHTML ="&#11167;"
                th.style.visibility = "visible"
                break
            case 1:
                pessoas.sort((a, b) => b.nome.localeCompare(a.nome))
                th = document.querySelector("th:nth-child(1) strong")
                th.innerHTML = "&#11165"
                th.style.visibility = "visible"
                break
            case 2:
                pessoas = organizarStatus(pessoas)
                th = document.querySelector("th:nth-child(3) strong")
                th.innerHTML ="&#11167;"
                th.style.visibility = "visible"
                break
            case 3:
                pessoas = organizarStatusInativo(pessoas)
                th = document.querySelector("th:nth-child(3) strong")
                th.innerHTML = "&#11165"
                th.style.visibility = "visible"
                break
            case 4:
                pessoas.sort((a, b) => a.email.localeCompare(b.email))
                th = document.querySelector("th:nth-child(2) strong")
                th.innerHTML ="&#11167;"
                th.style.visibility = "visible"
                break
            case 5:
                pessoas.sort((a, b) => b.email.localeCompare(a.email))
                th = document.querySelector("th:nth-child(2) strong")
                th.innerHTML = "&#11165"
                th.style.visibility = "visible"
                break
            case 6:
                pessoas = organizarDataRecente(pessoas)
                th = document.querySelector("th:nth-child(4) strong")
                th.innerHTML ="&#11167;"
                th.style.visibility = "visible"
                break
            case 7:
                pessoas = organizarDataAntiga(pessoas)
                th = document.querySelector("th:nth-child(4) strong")
                th.innerHTML = "&#11165"
                th.style.visibility = "visible"
                break                
            default:
                pessoas = JSON.parse(localStorage.getItem("pessoas")) || []
                break            
        }
        if(filtro != ''){
            filtro = filtro.toLowerCase()
            pessoas = pessoas.filter(u => 
                u.email.toLowerCase().includes(filtro) || 
                u.nome.toLowerCase().includes(filtro) || 
                u.status.toLowerCase().startsWith(filtro)
             )
        }
        pessoas = pessoas.filter(u => u.deletado != incluido)

        paginas = pessoas.length / itensPorPagina | 0
        if (pessoas.length % itensPorPagina !== 0) {
            paginas++
        }
        const paginaInicial = (paginaAtual - 1) * itensPorPagina
        let paginaFinal = paginaInicial + itensPorPagina

        if (paginaFinal > pessoas.length) {
            paginaFinal = pessoas.length
        }
        pessoas = pessoas.slice(paginaInicial, paginaFinal)
        for(var i = 0; i < pessoas.length ; i++){
            const pessoa = pessoas[i]
            var qtdLinhas = tabela.rows.length
            var linha = tabela.insertRow(qtdLinhas)
            if(i%2==0){
                linha.classList.add("par")
            }
            var celulaNome = linha.insertCell(0)
            var celulaEmail = linha.insertCell(1)
            var celulaStatus = linha.insertCell(2)
            var celulaData = linha.insertCell(3)
                
            var link = '<a class="link-pessoa" id="'+ i +'" href="#">'+ pessoa.nome +'</a>'

            let data = new Date(pessoa.dataCadastro)
            let dia = String(data.getDate()).padStart(2, '0')
            let mes = String(data.getMonth() + 1).padStart(2, '0')
            let ano = data.getFullYear()

            let dataFormatada = `${dia}/${mes}/${ano}`
            let status = "status" 
            if(pessoa.status == "Ativo"){
                status = `<span class="status-ativo"> Ativo <span>`
            }else{
                status = `<span class="status-inativo"> Inativo <span>`
            }
            celulaNome.innerHTML = link
            celulaEmail.innerText = pessoa.email
            celulaStatus.innerHTML = status
            celulaData.innerText = dataFormatada

        }
        const links = document.querySelectorAll('.link-pessoa')
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                const elementoClicado = event.target
                const idLink = elementoClicado.id
                const pessoa = pessoas[idLink]
                localStorage.setItem("pessoa", JSON.stringify(pessoa))
                window.location.href = "../pages/cadastro.html"
            })
        })
    }
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

function controlaPagina(){
    paginaSpan.innerText = `Exibindo página ${paginaAtual} de ${paginas}`
    botaoPaginaProxima.style.color = "var(--cor-texto)"
    botaoPaginaAnterior.style.color = "var(--cor-texto)"
    if(paginaAtual == paginas){
        botaoPaginaProxima.style.color = "gray"
    }
    if(paginaAtual == 1){
        botaoPaginaAnterior.style.color = "gray"
    }
    if(paginas == 0){
        paginaSpan.innerText = `Nenhuma informação cadastrada`
        botaoPaginaAnterior.style.display = 'none'
        botaoPaginaProxima.style.display = 'none'
    }
}

let filtro = ''
let orderby = 6
let paginaAtual = 1
let paginas = 0
let tamanho = 10
const incluidos = listar()
let itensPorPagina = 10
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
    filtro = document.getElementById("pesquisa").value
    preencherTabela(incluidos)
    if (event.key === 'Enter') {
        event.preventDefault()
    }
})

botaoNome.onclick = function(){
    if(orderby == 0){
        orderby = 1
    }else{
        orderby = 0
    }
    preencherTabela(incluidos)
}
botaoEmail.onclick = function(){
    if(orderby == 4){
        orderby = 5
    }else{
        orderby = 4
    }
    preencherTabela(incluidos)
}
botaoStatus.onclick = function(){
    if(orderby == 2){
        orderby = 3
    }else{
        orderby = 2
    }
    preencherTabela(incluidos)
}
botaoDia.onclick = function(){
    if(orderby == 7){
        orderby = 6
    }else{
        orderby = 7
    }
    preencherTabela(incluidos)
}
botaoSair.onclick = function(){
    localStorage.removeItem("usuario")
}

preencherTabela(incluidos)
controlaPagina()