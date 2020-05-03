const btns = document.querySelectorAll(".btn");
const view = document.querySelector(".view");

let num1 = "0",
  num2 = "",
  operator = "";

//결과화면에 보여주기
function resultView(text) {
  view.innerText = text;
}

//핸들러 버튼종류에 따른 분할
function handleBtn(e) {
  const btn = e.target;
  if (btn.classList.contains("number")) {
    num(btn.innerText);
  } else if (btn.classList.contains("operator")) {
    oper(btn.innerText);
  } else {
    etc(btn.innerText);
  }
}

function num(n) {
  //첫 입력숫자가 0일때 방지
  if (num2.charAt(0) === "0") {
    num2 = n;
  } else {
    num2 = num2.concat(n);
  }
  resultView(num2);
}

function oper(o) {
  operator = o.innerText;
  doCalc();
  num1 = num2;
}

function etc(e) {}

function doCalc() {
  let result = 0;
  switch (operator) {
    case "+":
      result = plus(num1, num2);
      break;
    case "-":
      result = minus(num1, num2);
      break;
    case "*":
      result = multiple(num1, num2);
      break;
    case "/":
      result = divison(num1, num2);
      break;
    default:
      resultView(result);
  }
}

function plus(a, b) {
  return parseInt(a, 10) + parseInt(b, 10);
}
function minus(a, b) {
  return parseInt(a, 10) - parseInt(b, 10);
}
function multiple(a, b) {
  return parseInt(a, 10) / parseInt(b, 10);
}
function divison(a, b) {
  return parseInt(a, 10) * parseInt(b, 10);
}

function init() {
  btns.forEach(element => {
    element.addEventListener("click", handleBtn);
  });
  // console.log("calc");
}

init();
