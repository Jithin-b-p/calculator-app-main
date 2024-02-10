const toggleBtns = document.querySelectorAll("input[class*=btn-theme--]");
const btnContainer = document.querySelector(".tri-state-toggle");
const calcBtnContainer = document.querySelector(".calculator-buttons");
const calcDisplay = document.querySelector(".calculator-display");

const operators = new Set(["+", "-", "x", "/"]);
const REGEX = /(\d)(?=(?:\d{3})+(?!\d))/g;

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

let displayValue = "";
let canIncludeDecimal = true;

calcBtnContainer.addEventListener("click", (e) => {
  const target = e.target.classList;
  if (target.contains("btn")) {
    const displayValueArray = displayValue.split("");

    if (target.contains("btn--0")) {
      if (calcDisplay.innerHTML === "0") {
        return;
      }
    }
    if (target.contains("btn--decimal")) {
      if (!canIncludeDecimal) return;
      if (displayValueArray[displayValueArray.length - 1] === "=") return;
      if (displayValue === "" || calcDisplay.innerHTML === "0") {
        canIncludeDecimal = false;
        displayValue = "0";
      } else {
        canIncludeDecimal = false;
      }
    }

    if (target.contains("btn--reset")) {
      displayValue = "";
      canIncludeDecimal = true;
      calcDisplay.innerText = "0";
      return;
    }

    if (target.contains("btn--del")) {
      if (!displayValueArray.length) displayValue = "";

      if (displayValueArray[displayValueArray.length - 1] === "=") {
        if (displayValueArray[displayValueArray.length - 2] === ".") {
          canIncludeDecimal = true;
        }
        displayValue = displayValue.slice(0, -2);
      } else {
        if (displayValueArray[displayValueArray.length - 1] === ".") {
          canIncludeDecimal = true;
        }
        displayValue = displayValue.slice(0, -1);
      }

      calcDisplay.innerText = displayValue
        ? displayValue.toString().replace(REGEX, "$1,")
        : "0";
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
        displayValue = (Number(x) + Number(y)).toPrecision(4) / 1;
      } else if (
        displayValueArray.includes("-") &&
        displayValueArray[displayValueArray.length - 1] !== "-"
      ) {
        let x = displayValue.split("-").at(0);
        let y = displayValue.split("-").at(1);
        displayValue = (Number(x) - Number(y)).toPrecision(4) / 1;
      } else if (
        displayValueArray.includes("x") &&
        displayValueArray[displayValueArray.length - 1] !== "x"
      ) {
        let x = displayValue.split("x").at(0);
        let y = displayValue.split("x").at(1);
        displayValue = (Number(x) * Number(y)).toPrecision(4) / 1;
      } else if (
        displayValueArray.includes("/") &&
        displayValueArray[displayValueArray.length - 1] !== "/"
      ) {
        let x = displayValue.split("/").at(0);
        let y = displayValue.split("/").at(1);

        if (Number(y) === 0) {
          displayValue = "math error";
        } else {
          let ans = Number(x) / Number(y);
          displayValue = Number.isInteger(ans) ? ans : ans.toPrecision(4) / 1;
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
        if (operators.has(displayValueArray[displayValueArray.length - 1])) {
          return;
        }

        canIncludeDecimal = true;

        if (
          displayValueArray.includes("+") &&
          displayValueArray[displayValueArray.length - 1] !== "+"
        ) {
          let x = displayValue.split("+").at(0);
          let y = displayValue.split("+").at(1);
          displayValue = (Number(x) + Number(y)).toPrecision(4) / 1;
        } else if (
          displayValueArray.includes("-") &&
          displayValueArray[displayValueArray.length - 1] !== "-"
        ) {
          let x = displayValue.split("-").at(0);
          let y = displayValue.split("-").at(1);
          displayValue = (Number(x) - Number(y)).toPrecision(4) / 1;
        } else if (
          displayValueArray.includes("x") &&
          displayValueArray[displayValueArray.length - 1] !== "x"
        ) {
          let x = displayValue.split("x").at(0);
          let y = displayValue.split("x").at(1);
          displayValue = (Number(x) * Number(y)).toPrecision(4) / 1;
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

        if (displayValue.toString().charAt(0) === "-") {
          calcDisplay.innerText = displayValue + "=";
          displayValue = "";
          return;
        }

        if (displayValueArray[displayValueArray.length - 1] === "=") {
          displayValue = displayValue.toString().slice(0, -1);
        }
      }
    }

    displayValue += e.target.innerText;
    console.log(displayValue);
    const arr = displayValue.split("");

    if (arr.includes(".")) {
      if (arr.includes("+")) {
        const [num1, num2] = displayValue.split("+");
        const [integerPartOfnum1, decimalPartOfnum1] = num1.split(".");
        const [integerPartOfnum2, decimalPartOfnum2] = num2.split(".");

        calcDisplay.innerText = `${formatNumber(
          integerPartOfnum1
        )}.${decimalPartOfnum1}+${formatNumber(integerPartOfnum2)}${
          decimalPartOfnum2 ? "." + decimalPartOfnum2 : ""
        }`;
        if (num2.charAt(num2.length - 1) === ".") {
          calcDisplay.innerText += ".";
        }
        return;
      } else if (arr.includes("-") && arr[0] !== "-") {
        const [num1, num2] = displayValue.split("-");
        const [integerPartOfnum1, decimalPartOfnum1] = num1.split(".");
        const [integerPartOfnum2, decimalPartOfnum2] = num2.split(".");

        calcDisplay.innerText = `${formatNumber(
          integerPartOfnum1
        )}.${decimalPartOfnum1}-${formatNumber(integerPartOfnum2)}${
          decimalPartOfnum2 ? "." + decimalPartOfnum2 : ""
        }`;
        if (num2.charAt(num2.length - 1) === ".") {
          calcDisplay.innerText += ".";
        }
        return;
      } else if (arr.includes("x")) {
        const [num1, num2] = displayValue.split("x");
        const [integerPartOfnum1, decimalPartOfnum1] = num1.split(".");
        const [integerPartOfnum2, decimalPartOfnum2] = num2.split(".");

        calcDisplay.innerText = `${formatNumber(
          integerPartOfnum1
        )}.${decimalPartOfnum1}x${formatNumber(integerPartOfnum2)}${
          decimalPartOfnum2 ? "." + decimalPartOfnum2 : ""
        }`;
        if (num2.charAt(num2.length - 1) === ".") {
          calcDisplay.innerText += ".";
        }
        return;
      } else if (arr.includes("/")) {
        const [num1, num2] = displayValue.split("/");
        const [integerPartOfnum1, decimalPartOfnum1] = num1.split(".");
        const [integerPartOfnum2, decimalPartOfnum2] = num2.split(".");

        calcDisplay.innerText = `${formatNumber(
          integerPartOfnum1
        )}.${decimalPartOfnum1}/${formatNumber(integerPartOfnum2)}${
          decimalPartOfnum2 ? "." + decimalPartOfnum2 : ""
        }`;
        if (num2.charAt(num2.length - 1) === ".") {
          calcDisplay.innerText += ".";
        }
        return;
      } else {
        if (arr[arr.length - 1] !== ".") {
          const [integerPart, decimalPart] = displayValue.split(".");
          calcDisplay.innerText = `${formatNumber(integerPart)}.${decimalPart}`;
          return;
        }
      }
    }

    calcDisplay.innerText = formatNumber(displayValue.toString());
  }
});

function formatNumber(num) {
  return num.toString().replace(REGEX, "$1,");
}
