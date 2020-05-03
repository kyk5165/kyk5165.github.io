const body = document.querySelector("body");

const IMG_NUMBER  = 5;

function paintImage(imgNum){
    const image = new Image();
    image.src = `src/img/${imgNum+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number
}

function init(){
    const ranNum = genRandom();
    paintImage(ranNum);
}

init();