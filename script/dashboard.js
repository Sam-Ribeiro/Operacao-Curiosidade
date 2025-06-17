function atualizaDados(){
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let usuariosInativos = 0
    let usuariosMes = 0
    const mesAtras = new Date();
    mesAtras.setMonth(new Date().getMonth() - 1);
    for(let i = usuarios.length - 1; i >= 0 ; i--){
        const usuario = usuarios[i];
        if(usuario.status == "Inativo"){
            usuariosInativos++
        }
        const dataCadastro = new Date(usuario.dataCadastro);
        if (dataCadastro >= mesAtras){
            usuariosMes++
        }
    }
    totalCadastros = document.querySelector("#bloco1 h1")
    cadastrosMes = document.querySelector("#bloco2 h1")
    cadastrosRevisao = document.querySelector("#bloco3 h1")

    totalCadastros.innerText = usuarios.length
    cadastrosMes.innerText = usuariosMes
    cadastrosRevisao.innerText = usuariosInativos
}
atualizaDados();
