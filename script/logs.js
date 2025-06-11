function preencherTabela(){
    var tabela = document.getElementById("tabela-logs")
    if(tabela){
        while (tabela.rows.length > 1) {
            tabela.deleteRow(1);
        }
        let logs = JSON.parse(localStorage.getItem("logs")) || [];
        ths = document.querySelectorAll("th strong")
        ths.forEach((ordem) => ordem.style.visibility = "hidden")
        switch(orderby){
            case 0:
                logs.sort((a, b) => a.user.localeCompare(b.user))
                th = document.querySelector("th:nth-child(1) strong")
                th.innerHTML ="&#11167;"
                th.style.visibility = "visible"
                break
            case 1:
                logs.sort((a, b) => b.user.localeCompare(a.user))
                th = document.querySelector("th:nth-child(1) strong")
                th.innerHTML = "&#11165"
                th.style.visibility = "visible"
                break
            case 2:
                logs.sort((a, b) => a.evento.localeCompare(b.evento))
                th = document.querySelector("th:nth-child(2) strong")
                th.innerHTML ="&#11167;"
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
                th.innerHTML ="&#11167;"
                th.style.visibility = "visible"
                break
            case 5:
                logs = organizarDataAntiga(logs)
                th = document.querySelector("th:nth-child(3) strong")
                th.innerHTML = "&#11165"
                th.style.visibility = "visible"
                break                
            default:
                logs = JSON.parse(localStorage.getItem("logs")) || [];
                break            
        }
        if(filtro != ''){
            filtro = filtro.toLowerCase();
            logs = logs.filter(u => 
                u.evento.toLowerCase().includes(filtro) || 
                u.user.toLowerCase().includes(filtro)
             )
        }
        paginas = logs.length / itensPorPagina | 0;
        if (logs.length % itensPorPagina !== 0) {
            paginas++;
        }
        const paginaInicial = (paginaAtual - 1) * itensPorPagina;
        let paginaFinal = paginaInicial + itensPorPagina;

        if (paginaFinal > logs.length) {
            paginaFinal = logs.length;
        }
        logs = logs.slice(paginaInicial, paginaFinal);
        for(var i = 0; i < logs.length ; i++){
            const log = logs[i];
            var qtdLinhas = tabela.rows.length;
            var linha = tabela.insertRow(qtdLinhas)

            var celulaUser = linha.insertCell(0)
            var celulaEvento = linha.insertCell(1)
            var celulaData = linha.insertCell(2)

            let data = new Date(log.data);
            let dia = String(data.getDate()).padStart(2, '0');
            let mes = String(data.getMonth() + 1).padStart(2, '0');
            let ano = data.getFullYear();

            let dataFormatada = `${dia}/${mes}/${ano}`; 

            celulaUser.innerHTML = log.user
            celulaEvento.innerText = log.evento
            celulaData.innerText = dataFormatada
        }
    }
}

function organizarDataAntiga(logs) {
    logs.sort((a, b) => {
        return new Date(a.data) - new Date(b.data);
    });
    return logs;
}

function organizarDataRecente(logs) {
    logs.sort((a, b) => {
        return new Date(b.data) - new Date(a.data);
    });
    return logs;
}

function controlaPagina(){
    paginaSpan.innerText = `Exibindo pagina ${paginaAtual} de ${paginas}`
    botaoPaginaProxima.classList.add("ativo")
    botaoPaginaAnterior.classList.add("ativo")
    if(paginaAtual == paginas){
        botaoPaginaProxima.classList.remove("ativo")
    }
    if(paginaAtual == 1){
        botaoPaginaAnterior.classList.remove("ativo")
    }
}

let filtro = ''
let orderby = 4
let paginaAtual = 1
let paginas = 1
const paginaSpan = document.getElementById("span-pagina")
const itensPorPagina = 15
const botaoSair = document.getElementById("sair")
const botaoUser = document.getElementById("evento-user")
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
    if (event.key === 'Enter') {
        event.preventDefault()
        botaoPesquisar.click();
    }
});

botaoPesquisar.onclick = function(){
    filtro = document.getElementById("pesquisa").value
    preencherTabela();
}
botaoUser.onclick = function(){
    if(orderby == 0){
        orderby = 1
    }else{
        orderby = 0
    }
    preencherTabela();
}
botaoEvento.onclick = function(){
    if(orderby == 2){
        orderby = 3
    }else{
        orderby = 2
    }
    preencherTabela();
}
botaoData.onclick = function(){
    if(orderby == 4){
        orderby = 5
    }else{
        orderby = 4
    }
    preencherTabela();
}
botaoSair.onclick = function(){
    localStorage.removeItem("user")
}

preencherTabela();
validaUsuario();
controlaPagina();