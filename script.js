const startknop = document.getElementById("start-button");
const timerelement = document.getElementById("timer");
const woordelement = document.querySelector("h2");
const invoerveld = document.getElementById("input-field");
const resultaatElement = document.getElementById("resultaat");

let countdowninterval;
let huidigwoord = "";
let getyptewoorden = 0;
let getyptekarakters = 0;

function starttest() {

    function starttimer() {
        let tijdover = 5;
        countdowninterval = setInterval(function () {
            if (tijdover > 0) {
                tijdover--;
                timerelement.textContent = tijdover;
            } else {
                clearInterval(countdowninterval);
                timerelement.textContent = "tijd is om!";
                invoerveld.disabled = true;
                invoerveld.removeEventListener("input", controleerinvoer);
                toonresultaten();
            }
        }, 1000);
    }

    async function haalwoordop() {
        const response = await fetch("https://random-word-bit.vercel.app/word");
        const woord = await response.json();
        return woord[0].word.toLowerCase();
    }

    async function updatewoordweergave() {
        huidigwoord = await haalwoordop();
        woordelement.textContent = huidigwoord;
    }

    function startweergave() {
        startknop.style.display = "none";
    }

    function controleerinvoer() {
        const getyptwoord = invoerveld.value.trim().toLowerCase();
        if (getyptwoord === huidigwoord) {
            invoerveld.value = "";
            updatewoordweergave();
            getyptewoorden++;
            getyptekarakters += getyptwoord.length;
        }
    }

    function toonresultaten() {
        woordelement.textContent = `aantal goedgetypte woorden: ${getyptewoorden}, aantal karakters: ${getyptekarakters}`;
    }

    starttimer();
    startweergave();
    updatewoordweergave();

    invoerveld.addEventListener("input", controleerinvoer);
}

startknop.addEventListener("click", starttest);
