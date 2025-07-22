const body = document.body
const html = document.documentElement

function aplicarTema(){
    try{
        const temaSalvo = JSON.parse(localStorage.getItem('temaSalvo'))
        if(temaSalvo.tema == "escuro"){
            html.classList.add('tema-escuro')
        }else{
            html.classList.remove('tema-escuro')
        }
    }catch{
        const temaSalvo ={tema: "claro"}
        localStorage.setItem("temaSalvo",JSON.stringify(temaSalvo))
    }
}

function aplicarFonte(){
    try{
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
    }catch{
        const fonteSalva ={fonte: "media"}
        localStorage.setItem("fonteSalva",JSON.stringify(fonteSalva))
    }
}

aplicarFonte()
aplicarTema()