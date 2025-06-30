function carregarDados(){
    usuario = JSON.parse(localStorage.getItem("usuario"))
    campoNome.value = usuario.nome
    campoEmail.value = usuario.email
    campoData.value = usuario.data
    campoSenhaAntiga.value = ""
    campoSenhaNova.value = ""
}

function salvarSenha(){
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    usuarios.forEach(u => {
        if(u.email == usuario.email){
            senhaAntiga = campoSenhaAntiga.value
            senhaNova = campoSenhaNova.value
            var ok = true
            if(senhaNova.length < 6){
                erroSenha.innerText = "A Senha deve ter mais que seis caracteres"
                erroSenha.style.display = 'block'
                ok = false
                campoSenhaNova.classList.add("erro")
            }
            if(!senhaAntiga || senhaAntiga != usuario.senha || !senhaNova){
                erroSenha.innerText = "Para alterar a senha, preencha a senha antiga corretamente!"
                erroSenha.style.display = 'block'
                ok = false
                campoSenhaAntiga.classList.add("erro")
                campoSenhaNova.classList.add("erro")    
            }
            if(ok){
                usuario.senha = senhaNova
                u.senha = usuario.senha
                localStorage.setItem("usuario", JSON.stringify(usuario))
                localStorage.setItem("usuarios", JSON.stringify(usuarios))
                erroSenha.style.color = 'var(--cor-verde)'
                erroSenha.style.textDecorationColor = 'var(--cor-verde)'
                erroSenha.innerText = "Usuário alterado com sucesso!"
                erroSenha.style.display = 'block'
            }
        }   
    })
}

function salvarDados(){
    const usuario = JSON.parse(localStorage.getItem("usuario"))
    const usuarios = JSON.parse(localStorage.getItem("usuarios"))
    usuarios.forEach(u => {
        if(u.email == usuario.email){
            var nome = campoNome.value
            var email = campoEmail.value
            var data = campoData.value
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            var agora = new Date().getFullYear()
            var ok = true
            const anotxt = data.substring(0, 4)
            const ano = Number(anotxt)
            const outrosUsuarios = usuarios.filter(u => u.email !== usuario.email)
            
            if(outrosUsuarios.some(outros => outros.email === email) || !emailRegex.test(email)|| !email){
                erro.innerText = "Email inválido"
                erro.style.display = 'block'
                ok = false
                campoEmail.classList.add("erro")
            }
            if(nome.length < 4 || !nome){
                erro.innerText = "Nome deve ter mais que três caracteres"
                erro.style.display = 'block'
                ok = false
                campoNome.classList.add("erro")
            }if(ano>=agora || ano<1910 || !data){
                erro.innerText = "Data de nascimento inválida"
                erro.style.display = 'block'
                ok = false
                campoNome.classList.add("erro")
            if(!nome || !email || !data){
                erro.innerText = "Prencha todos os campos acima"
                erro.style.display = 'block'
                ok = false
                campoNome.classList.add("erro")
            }
            }if(ok){
                erro.style.color = 'var(--cor-verde)'
                erro.style.textDecorationColor = 'var(--cor-verde)'
                erro.innerText = "Usuário alterado com sucesso!"
                erro.style.display = 'block'
                usuario.nome = nome
                usuario.email = email
                usuario.data = data
                u.nome = nome
                u.email = email
                u.data = data
                localStorage.setItem("usuario", JSON.stringify(usuario))
                localStorage.setItem("usuarios", JSON.stringify(usuarios))
            }
        }
    })
    carregarDados()            
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

document.addEventListener('keyup', (event) => {
  if (event.key != 'Enter') {
    campoNome.classList.remove("erro")
    campoData.classList.remove("erro")
    campoEmail.classList.remove("erro")
    campoSenhaAntiga.classList.remove("erro")
    campoSenhaNova.classList.remove("erro")
    erro.style.display = 'none'
    erroSenha.style.display = 'none'
    erro.style.color = 'rgb(220, 74, 74)'
    erro.style.textDecorationColor = 'rgb(220, 74, 74)'
    erroSenha.style.color = 'rgb(220, 74, 74)'
    erroSenha.style.textDecorationColor = 'rgb(220, 74, 74)'
  }
})

const botaoSalvar = document.getElementById("btn-salvar")
const botaoSalvarSenha = document.getElementById("btn-salvar-senha")
const campoNome = document.getElementById("campo-nome")
const campoEmail = document.getElementById("campo-email")
const campoData = document.getElementById("campo-data")
const campoSenhaAntiga = document.getElementById("campo-senha-antiga")
const campoSenhaNova = document.getElementById("campo-senha-nova")
const botaoExcluir = document.getElementById("btn-excluir")
const checkbox = document.getElementById("botao-tema")
const botoesFonte = document.getElementsByName("fonte")
const divsFonte = document.getElementsByClassName("fonte")
var erro = document.getElementById("erro")
var erroSenha = document.getElementById("erro-senha")

botaoSalvar.onclick = function(){
    salvarDados()
}

botaoSalvarSenha.onclick = function(){
    salvarSenha()
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
        aplicarFonte()
        carregarConfiguracao()
    }))
}

carregarDados()
carregarConfiguracao()
