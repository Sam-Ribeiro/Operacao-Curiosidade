document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  
  if (email === "a@e" && senha === "1") {
    window.location.href = "../pages/dashboard.html"
  } else {
    window.body
  }

});