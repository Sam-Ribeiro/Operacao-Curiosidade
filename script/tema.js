const body = document.body
const checkbox = document.getElementById("switch-17")
const html = document.documentElement
function aplicarTema(){
    const temaSalvo = JSON.parse(localStorage.getItem('temaSalvo'));
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
aplicarTema();