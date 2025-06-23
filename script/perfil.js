const campoNome = document.getElementById("campo-nome")
const campoEmail = document.getElementById("campo-email")
const campoData = document.getElementById("campo-data")
const campoSenhaAntiga = document.getElementById("campo-senha-antiga")
const campoSenhaNova = document.getElementById("campo-senha-nova")
const botaoSalvar = document.getElementById("btn-salvar")
const botaoExcluir = document.getElementById("btn-excluir")
const checkbox = document.getElementById("botao-tema")
const botoesFonte = document.getElementsByName("fonte")
const divsFonte = document.getElementsByClassName("fonte")

botaoSalvar.onclick = function(){
    salvarDados()
}
function carregarDados(){
    usuario = JSON.parse(localStorage.getItem("usuario"))
    campoNome.value = usuario.nome
    campoEmail.value = usuario.email
    campoData.value = usuario.data
    campoSenhaAntiga.value = ""
    campoSenhaNova.value = ""
}

function salvarDados(){
    usuario = JSON.parse(localStorage.getItem("usuario"))
    usuarios = JSON.parse(localStorage.getItem("usuarios"))
    usuarios.forEach(u => {
        if(u.email == usuario.email){
            var nome = campoNome.value
            var email = campoEmail.value
            var data = campoData.value
            var senhaNova = campoSenhaNova.value
            var senhaAntiga = campoSenhaAntiga.value

            var erro = document.getElementById("erro")
            erro.style.display = 'none'
            erro.style.color = 'rgb(220, 74, 74)'
            erro.style.textDecorationColor = 'rgb(220, 74, 74)'
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            var agora = new Date().getFullYear()
            const anotxt = data.substring(0, 4)
            const ano = Number(anotxt)
            const outrosusuarios = usuarios.filter(u => u.email !== usuario.email)
            if(senhaNova){
                if(!senhaAntiga || senhaAntiga != usuario.senha){
                    erro.innerText = "Para alterar a senha, preencha a senha antiga corretamente!"
                    erro.style.display = 'block'
                }else{
                    usuario.senha = senhaNova
                }
            }
            if(!nome || !email || !data){
                erro.innerText = "Prencha Nome, Email e data de nascimento"
                erro.style.display = 'block'
            }else if(outrosusuarios.some(u => u.email === email)){
                erro.innerText = "Email já cadastrado"
                erro.style.display = 'block'
            }else if(!emailRegex.test(email)){
                erro.innerText = "Email inválido"
                erro.style.display = 'block'    
            }else if(nome.length < 3){
                erro.innerText = "Nome deve ter mais que dois caracteres"
                erro.style.display = 'block'
            }else if(ano>=agora || ano<1910){
                erro.innerText = "Data de nascimento inválida"
                erro.style.display = 'block'
            }else{
                erro.style.color = 'rgb(115, 220, 74)'
                erro.style.textDecorationColor = 'rgb(115, 220, 74)'
                erro.innerText = "Usuário alterado com sucesso!"
                erro.style.display = 'block'

                usuario.nome = nome
                usuario.email = email
                usuario.data = data
                u.nome = nome
                u.email = email
                u.data = data
                u.senha = usuario.senha
                localStorage.setItem("usuario", JSON.stringify(usuario))
                localStorage.setItem("usuarios", JSON.stringify(usuarios))
            }
        }
    });
    carregarDados()            
}

if(checkbox){
    checkbox.addEventListener('change', function() {
        if(checkbox.checked == true){
            const temaSalvo ={
                tema: "escuro"
            }
            localStorage.setItem("temaSalvo",JSON.stringify(temaSalvo))
        }else{
            const temaSalvo ={
                tema: "claro"
            }
            localStorage.setItem("temaSalvo",JSON.stringify(temaSalvo))
        }
        aplicarTema()
    })
}

function carregarConfiguracao(){
    const temaSalvo = JSON.parse(localStorage.getItem('temaSalvo'))
    const fonteSalva = JSON.parse(localStorage.getItem('fonteSalva'))
    if(temaSalvo.tema == "escuro"){
            checkbox.checked = true
    }
    if(fonteSalva.fonte == "pequena"){
        botoesFonte[0].checked = true
        divsFonte[0].classList.add("fonte-ativa")
        divsFonte[1].classList.remove("fonte-ativa")
        divsFonte[2].classList.remove("fonte-ativa")
    }else if(fonteSalva.fonte == "media"){
        botoesFonte[1].checked = true
        divsFonte[1].classList.add("fonte-ativa")
        divsFonte[0].classList.remove("fonte-ativa")
        divsFonte[2].classList.remove("fonte-ativa")
    }else if(fonteSalva.fonte == "grande"){
        botoesFonte[2].checked = true
        divsFonte[2].classList.add("fonte-ativa")
        divsFonte[0].classList.remove("fonte-ativa")
        divsFonte[1].classList.remove("fonte-ativa")
    }
}

if(botoesFonte){
    botoesFonte.forEach(b => b.addEventListener('change', function() {
        if(botoesFonte[0].checked == true){
            const fonteSalva ={
                fonte: "pequena"
            }
            localStorage.setItem("fonteSalva",JSON.stringify(fonteSalva))
        }else if(botoesFonte[2].checked == true){
            const fonteSalva ={
                fonte: "grande"
            }
            localStorage.setItem("fonteSalva",JSON.stringify(fonteSalva))
        }else{
            const fonteSalva ={
                fonte: "media"
            }
            localStorage.setItem("fonteSalva",JSON.stringify(fonteSalva))
        }
        aplicarFonte();
        carregarConfiguracao()
    }))
}
carregarDados()
carregarConfiguracao()