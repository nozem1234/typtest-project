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
    invoerveld.disabled = false;
    invoerveld.value = "";
    invoerveld.focus();

    function starttimer() {
        let tijdover = 60;
        timerelement.textContent = tijdover;

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
            const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");

            if (!response.ok) {
                throw new Error("API werkt niet");
            }

            const data = await response.json();
            return data[0].toLowerCase();
        } catch (error) {
            console.error("Fout bij ophalen woord:", error);
            woordelement.textContent = "API fout";
            return "";
        }
    }

    async function updatewoordweergave() {
        huidigwoord = await haalwoordop();
        if (huidigwoord) {
            woordelement.textContent = huidigwoord;
        }
    }

    function startweergave() {
        startknop.style.display = "none";
    }

    function controleerinvoer() {
        const getyptwoord = invoerveld.value.trim().toLowerCase();

        if (getyptwoord === huidigwoord && huidigwoord !== "") {
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

    invoerveld.removeEventListener("input", controleerinvoer);
    invoerveld.addEventListener("input", controleerinvoer);
}

startknop.addEventListener("click", starttest);