const homebtn = document.querySelector(".homebtn");
if (homebtn)
  homebtn.addEventListener("click", () => {
    window.location.href = `http://localhost:${port}/movies`;
  });