function atualizarDados(){
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || []
    let pessoasInativos = 0
    let pessoasMes = 0
    let pessoasTotal = 0
    const mesAtras = new Date()
    mesAtras.setMonth(new Date().getMonth() - 1)
    pessoas = pessoas.filter(p => !p.deletado)
    for(let i = pessoas.length - 1; i >= 0 ; i--){
        const pessoa = pessoas[i]
        if(pessoa.status == "Inativo"){
            pessoasInativos++
        }
        const dataCadastro = new Date(pessoa.dataCadastro)
        if (dataCadastro >= mesAtras){
            pessoasMes++
        }
        pessoasTotal++
    }
    totalCadastros = document.querySelector("#bloco1 h1")
    cadastrosMes = document.querySelector("#bloco2 h1")
    cadastrosRevisao = document.querySelector("#bloco3 h1")

    totalCadastros.innerText = pessoasTotal
    cadastrosMes.innerText = pessoasMes
    cadastrosRevisao.innerText = pessoasInativos
}

atualizarDados()