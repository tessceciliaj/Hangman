// I remember that arrays should'nt be consts. In this case it works because the 7 deadly sins is always 7. 
// I have reset button instead of cancel button.

const DEADLY_SINS = [
    "pride",
    "greed",
    "lust",
    "envy",
    "gluttony",
    "wrath",
    "sloth"
]

const MAXWRONG = 6;
let answer = "";
let mistakes = 0;
let guessed = [];
let wordStatus = null;

randomWord = () => {
    answer = DEADLY_SINS[Math.floor(Math.random() * DEADLY_SINS.length)];
}

generateButtons = () => {
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

handleGuess = (chosenLetter) => {
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

updateHangmanPicture = () => {
    document.getElementById('hangmanPic').src = "../img/" + mistakes + ".jpg";
}

guessedWord = () => {
    wordStatus = answer.split("").map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join("");

    document.getElementById("wordSpotlight").innerHTML = wordStatus;
}

checkIfGameLost = () => {
    if (mistakes === MAXWRONG) {
        document.getElementById("wordSpotlight").innerHTML = "He died because of to much: " + answer;
        document.getElementById("keyboard").innerHTML = "You did this on purpose didnt you?";
        document.getElementById("hangman-title").innerHTML = "Deadman";
        for (let i = 0; i < DEADLY_SINS.length; i++) {
            document.getElementById("show-sins").innerHTML += DEADLY_SINS[i] + ".  ";
            /*
            while (mistakes === MAXWRONG) {
                DEADLY_SINS[i] = DEADLY_SINS[i].charAt(0).toUpperCase() + DEADLY_SINS[i].slice(1);
            } */
        }
    }
}


checkIfGameWon = () => {
    if (wordStatus === answer) {
        document.getElementById("keyboard").innerHTML = "You saved him even though he was doomed by " + answer + ". You are a humble person.";
        document.getElementById("hangman-title").innerHTML = "Saveman";
    }
}

// Why doesnt While loop work on the one above?

updateMistakes = () => {
    document.getElementById("mistakes").innerHTML = mistakes;
}


reset = () => {
    mistakes = 0;
    guessed = [];
    document.getElementById("hangmanPic").src = "../img/0.jpg";
    document.getElementById("show-sins").innerHTML = null;
    document.getElementById("hangman-title").innerHTML = "Hangman";

    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

document.getElementById("maxWrong").innerHTML = MAXWRONG;

randomWord();
generateButtons();
guessedWord();