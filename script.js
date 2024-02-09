const buttons = document.querySelectorAll("input[class*=btn-theme--]");
const btnContainer = document.querySelector(".tri-state-toggle");

btnContainer.addEventListener("click", (e) => {
  console.log("hai");
  if (e.target.classList.contains("btn-theme--1")) {
    buttons.forEach((btn) => {
      btn.style.opacity = 0;
    });
    document.documentElement.setAttribute("data-theme", "1");
    document.querySelector(".btn-theme--1").style.opacity = 1;
  } else if (e.target.classList.contains("btn-theme--2")) {
    buttons.forEach((btn) => {
      btn.style.opacity = 0;
    });
    document.documentElement.setAttribute("data-theme", "2");
    document.querySelector(".btn-theme--2").style.opacity = 1;
  } else if (e.target.classList.contains("btn-theme--3")) {
    buttons.forEach((btn) => {
      btn.style.opacity = 0;
    });
    document.documentElement.setAttribute("data-theme", "3");
    document.querySelector(".btn-theme--3").style.opacity = 1;
  }
});
