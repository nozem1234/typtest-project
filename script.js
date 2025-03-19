const start = document.getElementById("start-button");
const timer = document.getElementById("timer");
const woorden = document.querySelector("h2");
const input = document.getElementById("input-field");
const resultaat = document.getElementById("resultaat");

let countdownInterval;
let currentWord = "";
let typedWords = 0;
let typedCharacters = 0;

function starttest() {

    function starttimer() {
        let timeLeft = 60;
        countdownInterval = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft--;
                timer.textContent = timeLeft;
            } else {
                clearInterval(countdownInterval);
                timer.textContent = "tijd is om!";
                input.disabled = true;
                input.removeEventListener("input", checkInput);
                showresults();
            }
        }, 1000);
    }

    async function getWord() {
        const response = await fetch("https://random-word-bit.vercel.app/word");
        const word = await response.json();
        return word[0].word.toLowerCase();
    }

    async function updateWordDisplay() {
        currentWord = await getWord();
        woorden.textContent = currentWord;
    }

    function startdisplay() {
        start.style.display = "none";
    }

    function checkInput() {
        const typedWord = input.value.trim().toLowerCase();
        if (typedWord === currentWord) {
            input.value = "";
            updateWordDisplay();
            typedWords++;
            typedCharacters += typedWord.length;
        }
    }

    function showresults() {
        woorden.textContent = `Aantal goedgetypte woorden: ${typedWords}, Aantal karakters: ${typedCharacters}`;
    }

    starttimer();
    startdisplay();
    updateWordDisplay();

    input.addEventListener("input", checkInput);
}

start.addEventListener("click", starttest);
