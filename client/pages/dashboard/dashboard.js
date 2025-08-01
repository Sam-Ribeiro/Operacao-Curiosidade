async function atualizarDados(){
    let pessoasInativos = 0
    let pessoasMes = 0
    let pessoasTotal = 0

    totalCadastros = document.querySelector("#bloco1 h1")
    cadastrosMes = document.querySelector("#bloco2 h1")
    cadastrosRevisao = document.querySelector("#bloco3 h1")

     pessoasTotal
    cadastrosMes.innerText = await LoadRecordsCount("https://localhost:7182/api/PageContent/getMonthRecordsCount")
    cadastrosRevisao.innerText = await LoadRecordsCount("https://localhost:7182/api/PageContent/getInactiveCount")
    totalCadastros.innerText = await LoadRecordsCount("https://localhost:7182/api/PageContent/getPersonsCount")
}

async function LoadRecordsCount(url){
    const token = (localStorage.getItem("token"))
    const r = await fetch(url,{
        method: 'GET',
        headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
    })
    try{
        const result = await r.json()
        if(result.resultCode === 200){
            return result.data
        }
    }catch(error)
    {
        console.log(error)
    }
}

atualizarDados()
