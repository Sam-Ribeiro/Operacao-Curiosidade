const body = document.body
const html = document.documentElement


function aplicarTema(){
    const temaSalvo = JSON.parse(localStorage.getItem('temaSalvo'))
    if(temaSalvo.tema == "escuro"){
        html.classList.add('tema-escuro');
    }else{
        html.classList.remove('tema-escuro');
    }
}

function aplicarFonte(){
    const fonteSalva = JSON.parse(localStorage.getItem('fonteSalva'))
    if(fonteSalva.fonte == "pequena"){
        html.classList.add('fonte-pequena')
        html.classList.remove('fonte-grande')

    }else if(fonteSalva.fonte == "media"){
        html.classList.remove('fonte-pequena')
        html.classList.remove('fonte-grande')

    }else if(fonteSalva.fonte == "grande"){
        html.classList.remove('fonte-pequena')
        html.classList.add('fonte-grande')
    }
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

if(JSON.parse(localStorage.getItem("manter-login"))){
    onunlo
}

aplicarFonte()
aplicarTema()