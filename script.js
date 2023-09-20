// Variable
const audioList = [
    new Audio("audio/kuruto.mp3"),
    new Audio("audio/kuru1.mp3"),
    new Audio("audio/kuru2.mp3"),
];

for (const audio of audioList) {
    audio.preload = "auto";
}

let firstSquish = true;

const getTimePassed = () => Date.parse(new Date());

const localCounter = document.querySelector('#local-counter');
let localCount = localStorage.getItem('count-v2') || 0;
let heldCount = 0;

function update(e, resetCount = true) {
    const data = {
        count: heldCount,
        e: e // check if request is triggered by event
    };

    // Update local count
    localCount += heldCount;
    localCounter.textContent = localCount.toLocaleString('en-US');

    if (resetCount) heldCount = 0;
    localStorage.setItem('count-v2', localCount);
}

let timer;

// Counter button
const counterButton = document.querySelector('#counter-button');
counterButton.addEventListener('click', (e) => {    
    prevTime = getTimePassed();

    heldCount++;
    localCount++; // Update local count
    localCounter.textContent = localCount.toLocaleString('en-US'); // Update local counter

    if (heldCount === 10) {
        // Update on 10 counts
        update(e, false);
        heldCount -= 10;
    } else {
        // Update 5 seconds after the last click
        clearTimeout(timer);
        timer = setTimeout(() => update(e), 5000);
    }

    triggerRipple(e);

    playKuru();
    animateHerta();
});

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

function triggerRipple(e) {
    let ripple = document.createElement("span");
        
    ripple.classList.add("ripple");

    const counter_button = document.getElementById("counter-button");
    counter_button.appendChild(ripple);

    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => {
        ripple.remove();
    }, 300);
}
