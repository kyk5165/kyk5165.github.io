const divClock = document.querySelector(".js-clock"),
    clockTitle = divClock.querySelector("h1");

function getTime(){
    const date = new Date();
    const min = getTwoNum(date.getMinutes());
    const hour = getTwoNum(date.getHours());
    const sec = getTwoNum(date.getSeconds());
    clockTitle.innerText = `${hour}:${min}:${sec}`
}

function getTwoNum(num){
    return `${num<10 ? `0${num}` : num}`
}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();