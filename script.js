const audioList = [
    new Audio("audio/kuruto.mp3"),
    new Audio("audio/kuru1.mp3"),
    new Audio("audio/kuru2.mp3"),
];

for (const audio of audioList) {
    audio.preload = "auto";
}
  
let firstSquish = true;

function playKuru() {
    let audio;

    if (firstSquish) {
        firstSquish = false;
        audio = audioList[0].cloneNode();
    } else {
        const random = Math.floor(Math.random() * 2) + 1;
        audio = audioList[random].cloneNode();
    }

    audio.play();

    audio.addEventListener("ended", function () {
        this.remove();
    });
}

function animateHerta() {
    let id = null;

    const random = Math.floor(Math.random() * 2) + 1;
    const elem = document.createElement("img");
    elem.src = `img/hertaa${random}.gif`;
    elem.style.position = "absolute";
    elem.style.right = "-500px";
    elem.style.top = counterButton.getClientRects()[0].bottom + scrollY - 430 + "px"
    elem.style.zIndex = "-1";
    document.body.appendChild(elem);

    let pos = -500;
    const limit = window.innerWidth + 500;
    clearInterval(id);
    id = setInterval(() => {
        if (pos >= limit) {
            clearInterval(id);
            elem.remove()
        } else {
            pos += 20;
            elem.style.right = pos + 'px';
        }
    }, 12);
}

const messages = [
    "The kuru~ has been squished",
    "kuru~kuru~to ><",
];

const messageElement = document.querySelector("#content h3");

function changeMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    messageElement.textContent = randomMessage;
}

function handleSpacebarPress(event) {
    if (event.key === " " || event.key === "Spacebar") {
        simulateButtonClick();
    }
}

function simulateButtonClick() {
    const clickEvent = new MouseEvent("click", {
    });
    counterButton.dispatchEvent(clickEvent);
}

document.addEventListener("keydown", handleSpacebarPress);
const counterButton = document.getElementById("counter-button");
const localCounter = document.getElementById("local-counter");
let count = parseInt(localStorage.getItem("counter")) || 0;
localCounter.textContent = count;

counterButton.addEventListener("click", () => {
    count++;
    localStorage.setItem("counter", count);
    localCounter.textContent = count;
    playKuru();
    animateHerta();
    changeMessage();
});