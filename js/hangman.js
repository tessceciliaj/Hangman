// I remember that arrays should'nt be consts. In this case it works because the 7 deadly sins is always 7. 

const DEADLY_SINS = [
    "pride",
    "greed",
    "lust",
    "envy",
    "gluttony",
    "wrath",
    "sloth"
]

let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
    answer = DEADLY_SINS[Math.floor(Math.random() * DEADLY_SINS.length)];
}

function generateButtons() {
    let buttonsHTML = "abcdefghijklmnopqrstuvwxyz".split("").map(letter =>
        `
    <button
      class="btn"
      id='${letter}'
      onClick="handleGuess('${letter}')"
    >
    ${letter}
    </button>
    `).join("");

    document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute("disabled", true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = "../img/" + mistakes + ".jpg";
}

function guessedWord() {
    wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");

    document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

function checkIfGameLost() {
    if (mistakes === maxWrong) {  
        document.getElementById("wordSpotlight").innerHTML = "He died because of to much: " + answer;
        document.getElementById("keyboard").innerHTML = "You did this on purpuse didnt you?"
    }
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById("keyboard").innerHTML = "You saved him even though he was doomed by " + answer + ". You are a humble person.";
    }
}

function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes;
}

function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById("hangmanPic").src = "../img/0.jpg";

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById("maxWrong").innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();


