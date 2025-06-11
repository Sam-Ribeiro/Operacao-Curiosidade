const body = document.body
const checkbox = document.getElementById("switch-17")

function aplicarTema(){
    const temaSalvo = JSON.parse(localStorage.getItem('temaSalvo'));
    console.log("tema: "+ temaSalvo.tema)
    if(temaSalvo.tema == "escuro"){
        body.classList.add('tema-escuro');
        if(checkbox){
            checkbox.checked = true
        }
        console.log("tema escuro")
    }else{
        body.classList.remove('tema-escuro');
        console.log("tema claro")
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