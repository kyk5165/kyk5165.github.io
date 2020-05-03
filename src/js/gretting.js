const nameForm  = document.querySelector(".js-nameForm");
const nameInput = nameForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const divToDo = document.querySelector(".js-toDoList");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function handleSubmit(e){
    e.preventDefault();
    const currentValue = nameInput.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
    divToDo.classList.add(SHOWING_CN);
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    }else{
        paintGreeting(currentUser);
    }
}

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function init(){
    loadName();
}

init();