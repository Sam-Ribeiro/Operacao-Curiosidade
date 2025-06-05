
function validaUsuario(){
    const user = JSON.parse(localStorage.getItem("user"))
    if(user.user_email == "adm@teste"){
        document.getElementById("aside").style.display = 'block';
    }else{
        document.getElementById("aside").style.display = 'none';
    }
};
function preencherTabela(){
    const users = JSON.parse(localStorage.getItem("users")) || [];
    for(var i = 0; i<users.length; i++){
        const user = users[i];
        var tabela = document.getElementById("tabela-usuarios")
        var qtdLinhas = tabela.rows.length;
        var linha = tabela.insertRow(qtdLinhas)

        var celulaNome = linha.insertCell(0)

        var link = '<a href="#">'+user.user_nome+'</a>';    

        celulaNome.innerHTML = link
        }
    }

preencherTabela()
validaUsuario()