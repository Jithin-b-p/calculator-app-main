const toggleBtns = document.querySelectorAll("input[class*=btn-theme--]");
const btnContainer = document.querySelector(".tri-state-toggle");

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-theme--1")) {
    toggleBtns.forEach((btn) => {
      btn.style.opacity = 0;
    });
    document.documentElement.setAttribute("data-theme", "1");
    document.querySelector(".btn-theme--1").style.opacity = 1;
  } else if (e.target.classList.contains("btn-theme--2")) {
    toggleBtns.forEach((btn) => {
      btn.style.opacity = 0;
    });
    document.documentElement.setAttribute("data-theme", "2");
    document.querySelector(".btn-theme--2").style.opacity = 1;
  } else if (e.target.classList.contains("btn-theme--3")) {
    toggleBtns.forEach((btn) => {
      btn.style.opacity = 0;
    });
    document.documentElement.setAttribute("data-theme", "3");
    document.querySelector(".btn-theme--3").style.opacity = 1;
  }
});

const calcBtnContainer = document.querySelector(".calculator-buttons");
const calcDisplay = document.querySelector(".calculator-display");

const operators = new Set(["+", "-", "x", "/"]);

let displayValue = "";
let canIncludeDecimal = true;

calcBtnContainer.addEventListener("click", (e) => {
  const target = e.target.classList;
  if (target.contains("btn")) {
    const displayValueArray = displayValue.split("");

    if (target.contains("btn--decimal")) {
      if (displayValueArray[displayValueArray.length - 1] === "=") return;
      if (!canIncludeDecimal) return;
      if (displayValue === "") {
        canIncludeDecimal = false;
        displayValue = "0";
        calcDisplay.innerText = displayValue;
        return;
      }
      canIncludeDecimal = false;
    }

    if (target.contains("btn--reset")) {
      displayValue = "";
      calcDisplay.innerText = "0";
      return;
    }

    if (target.contains("btn--del")) {
      if (!displayValueArray.length) displayValue = "";

      if (displayValueArray[displayValueArray.length - 1] === "=")
        displayValue = displayValue.slice(0, -2);
      else displayValue = displayValue.slice(0, -1);

      calcDisplay.innerText = displayValue ? displayValue : "0";
      return;
    }

    if (
      displayValueArray[displayValueArray.length - 1] === "=" &&
      target.contains("btn-number")
    ) {
      displayValue = "";
    }
    if (target.contains("btn--equal")) {
      if (
        displayValueArray.includes("+") &&
        displayValueArray[displayValueArray.length - 1] !== "+"
      ) {
        let x = displayValue.split("+").at(0);
        let y = displayValue.split("+").at(1);
        displayValue = Number(x) + Number(y);
      } else if (
        displayValueArray.includes("-") &&
        displayValueArray[displayValueArray.length - 1] !== "-"
      ) {
        let x = displayValue.split("-").at(0);
        let y = displayValue.split("-").at(1);
        displayValue = Number(x) - Number(y);
      } else if (
        displayValueArray.includes("x") &&
        displayValueArray[displayValueArray.length - 1] !== "x"
      ) {
        let x = displayValue.split("x").at(0);
        let y = displayValue.split("x").at(1);
        displayValue = Number(x) * Number(y);
      } else if (
        displayValueArray.includes("/") &&
        displayValueArray[displayValueArray.length - 1] !== "/"
      ) {
        let x = displayValue.split("/").at(0);
        let y = displayValue.split("/").at(1);

        if (Number(y) === 0) {
          displayValue = "Math error";
        } else {
          let ans = Number(x) / Number(y);
          displayValue = Number.isInteger(ans) ? ans : ans.toPrecision(10) / 1;
        }
      } else {
        return;
      }
    }

    if (
      !target.contains("btn--del") &&
      !target.contains("btn--reset") &&
      !target.contains("btn--equal")
    ) {
      if (target.contains("btn-operator")) {
        if (displayValue === "") return;
        canIncludeDecimal = true;
        if (operators.has(displayValueArray[displayValueArray.length - 1])) {
          return;
        }
        if (
          displayValueArray.includes("+") &&
          displayValueArray[displayValueArray.length - 1] !== "+"
        ) {
          let x = displayValue.split("+").at(0);
          let y = displayValue.split("+").at(1);
          displayValue = Number(x) + Number(y);
        } else if (
          displayValueArray.includes("-") &&
          displayValueArray[displayValueArray.length - 1] !== "-"
        ) {
          let x = displayValue.split("-").at(0);
          let y = displayValue.split("-").at(1);
          displayValue = Number(x) - Number(y);
        } else if (
          displayValueArray.includes("x") &&
          displayValueArray[displayValueArray.length - 1] !== "x"
        ) {
          let x = displayValue.split("x").at(0);
          let y = displayValue.split("x").at(1);
          displayValue = Number(x) * Number(y);
        } else if (
          displayValueArray.includes("/") &&
          displayValueArray[displayValueArray.length - 1] !== "/"
        ) {
          let x = displayValue.split("/").at(0);
          let y = displayValue.split("/").at(1);

          if (Number(y) === 0) {
            displayValue = "Math error";
          } else {
            let ans = Number(x) / Number(y);
            displayValue = Number.isInteger(ans) ? ans : ans.toPrecision(4);
          }
        }

        if (displayValueArray[displayValueArray.length - 1] === "=") {
          displayValue = displayValue.slice(0, -1);
        }
      }
    }

    if (displayValue !== "") {
      console.log(Number(displayValueArray[displayValueArray.length - 1]));
    }
    displayValue += e.target.innerText;
    calcDisplay.innerText = displayValue;
  }
});
