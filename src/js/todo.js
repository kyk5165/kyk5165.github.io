const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const liDoing = document.querySelector(".js-doingList");
const liDone = document.querySelector(".js-doneList");

const DOING_LS = "DOING";
const DONE_LS = "DONE";

let doingList = [];
let doneList = [];

//저장하기
function saveToDoList() {
  localStorage.setItem(DOING_LS, JSON.stringify(doingList));
  localStorage.setItem(DONE_LS, JSON.stringify(doneList));
}

//불러오기
function loadToDoList() {
  const loadedPending = localStorage.getItem(DOING_LS);
  if (loadedPending !== null) {
    const parsePending = JSON.parse(loadedPending);
    parsePending.forEach(function(toDo) {
      paintToDo(toDo.text, doingList);
    });
  }

  const loadedFinished = localStorage.getItem(DONE_LS);
  if (loadedFinished !== null) {
    const parseFinished = JSON.parse(loadedFinished);
    parseFinished.forEach(function(toDo) {
      paintToDo(toDo.text, doneList);
    });
  }
  saveToDoList();
}

//목록 삭제
function delToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  let cleanToDos;
  ul.removeChild(li);
  if (ul === liDoing) {
    cleanToDos = doingList.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
    });
    doingList = cleanToDos;
  } else {
    cleanToDos = doneList.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
    });
    doneList = cleanToDos;
  }

  saveToDoList();
}

//목록 추가 및 보여주기
function paintToDo(text, toDos) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const changeBtn = document.createElement("button");
  const span = document.createElement("span");
  //시간만 할경우 밀리세컨까지 동일한 경우 발생하여 크기도 같이 더함
  const newId = new Date().getTime() + toDos.length + 1;
  const toDosObj = {
    id: newId,
    text: text
  };

  delBtn.innerText = "✖";
  delBtn.addEventListener("click", delToDo);
  if (toDos === doingList) {
    changeBtn.innerText = "✔";
  } else {
    changeBtn.innerText = "⏪";
  }
  changeBtn.addEventListener("click", changeToDo);
  span.innerText = text;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(changeBtn);
  li.appendChild(delBtn);

  if (toDos === doingList) {
    liDoing.appendChild(li);
  } else {
    liDone.appendChild(li);
  }
  toDos.push(toDosObj);
}

//Doing <-> Done 전환
function changeToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const ul = li.parentNode;
  let currentValue;
  if (ul === liDoing) {
    currentValue = li.innerText.replace("✔✖", "");
    paintToDo(currentValue, doneList);
  } else {
    currentValue = li.innerText.replace("⏪✖", "");
    paintToDo(currentValue, doingList);
  }
  delToDo(event);
  saveToDoList();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue, doingList);
  toDoInput.value = "";
  saveToDoList();
}

function init() {
  console.log("start!");
  loadToDoList();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
