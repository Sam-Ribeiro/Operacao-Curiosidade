const body = document.body
const checkbox = document.getElementById("switch-17")
const html = document.documentElement
const botoesFonte = document.getElementsByName("fonte")
const divsFonte = document.getElementsByClassName("fonte")
const manterLogin = document.getElementById("conexao")

function aplicarTema(){
    const temaSalvo = JSON.parse(localStorage.getItem('temaSalvo'))
    console.log("tema: "+ temaSalvo.tema)
    if(temaSalvo.tema == "escuro"){
        html.classList.add('tema-escuro');
        if(checkbox){
            checkbox.checked = true
        }
    }else{
        html.classList.remove('tema-escuro');
    }
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
        aplicarTema();
    })
}

function aplicarFonte(){
    const fonteSalva = JSON.parse(localStorage.getItem('fonteSalva'))
    console.log("fonte: "+ fonteSalva.fonte)
    if(fonteSalva.fonte == "pequena"){
        html.classList.add('fonte-pequena')
        html.classList.remove('fonte-grande')
        if(botoesFonte[0]){
            botoesFonte[0].checked = true
            divsFonte[0].classList.add("fonte-ativa")
            divsFonte[1].classList.remove("fonte-ativa")
            divsFonte[2].classList.remove("fonte-ativa")
        }
    }else if(fonteSalva.fonte == "media"){
        html.classList.remove('fonte-pequena')
        html.classList.remove('fonte-grande')
        if(botoesFonte[1]){
            botoesFonte[1].checked = true
            divsFonte[1].classList.add("fonte-ativa")
            divsFonte[0].classList.remove("fonte-ativa")
            divsFonte[2].classList.remove("fonte-ativa")
        }
    }else if(fonteSalva.fonte == "grande"){
        html.classList.remove('fonte-pequena')
        html.classList.add('fonte-grande')
        if(botoesFonte[2]){
            botoesFonte[2].checked = true
            divsFonte[2].classList.add("fonte-ativa")
            divsFonte[0].classList.remove("fonte-ativa")
            divsFonte[1].classList.remove("fonte-ativa")
        }
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
    }))
}

function validaUsuario(){
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
        nome_perfil = document.getElementById("usuario")
        icone_perfil = document.getElementById("icone")
        if(nome_perfil){
            nome_perfil.innerText = user.user_nome
            icone_perfil.innerText = user.user_nome.charAt(0).toUpperCase()
        }
    }else{
        window.location.href = "../pages/login.html"
    }
}


aplicarFonte()
aplicarTema()