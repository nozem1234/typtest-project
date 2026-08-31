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
    getyptewoorden = 0;
    getyptekarakters = 0;
    timerelement.textContent = "60";
    invoerveld.disabled = false;
    invoerveld.value = "";
    invoerveld.focus();

    function starttimer() {
        let tijdover = 60;

        countdowninterval = setInterval(function () {
            if (tijdover > 0) {
                tijdover--;
                timerelement.textContent = tijdover;
            } else {
                clearInterval(countdowninterval);
                timerelement.textContent = "Tijd is om!";
                invoerveld.disabled = true;
                invoerveld.removeEventListener("input", controleerinvoer);
                toonresultaten();
            }
        }, 1000);
    }

    async function haalwoordop() {
        try {
            const response = await fetch("https://random-words-api.vercel.app/word/dutch");
            const data = await response.json();
            return data[0].word.toLowerCase();
        } catch (error) {
            console.error("API fout:", error);
            return "computer";
        }
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
            getyptewoorden++;
            getyptekarakters += getyptwoord.length;

            invoerveld.value = "";
            updatewoordweergave();
        }
    }

    function toonresultaten() {
        woordelement.innerHTML = `
            Aantal goed getypte woorden:
            <span style="color:red;">${getyptewoorden}</span><br>
            Aantal karakters:
            <span style="color:red;">${getyptekarakters}</span>
        `;
    }

    starttimer();
    startweergave();
    updatewoordweergave();
    invoerveld.addEventListener("input", controleerinvoer);
}

startknop.addEventListener("click", starttest);