function erro(){
  var d = document.getElementById("erro")
  d.style.display = 'block';
}
function fecharerro(){
  var d = document.getElementById("erro")
  d.style.display = 'none';
}

document.getElementById("login-form").addEventListener("submit", function (e)
{
  e.preventDefault();

  var email = document.getElementById("email").value.trim();
  var senha = document.getElementById("senha").value.trim();
  
  if (email == "a@e" && senha == "1") {
    window.location.href = "../pages/dashboard.html"
  } else {
    erro();
  }
}
);