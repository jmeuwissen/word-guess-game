const WORDS = ["pineapple", "squash", "astronomy", "rattlesnake", "xylophone", "watermelon", "bumblebee", "butterscotch", "headphones", "obfuscation"]; //muahahaha

let isPlaying = false; //control variable
let partialSolution = []; //stores the in-progress word as an array of strings //hooray for immutable strings... javascript is fun
let answer = ""; //actual answer
let wrongChars = ""; //string of incorrect guesses
let wins = 0; //win counter
let losses = 0; //loss counter
let remainingGuesses = 0;
let animationComplete = false;

const startButtonEl = document.getElementById("start-button");
const winsEL = document.getElementById("wins");
const lossesEL = document.getElementById("losses");
const wrongCharsEL = document.getElementById("wrong-chars");
const remainingGuessesEL = document.getElementById("guesses-remaining");
const partialSolutionEL = document.getElementById("partial-solution");
const messageEL = document.getElementById("message");


/**
 * picks a random word from the array of possible words to guess
 * 
 * @returns Random word from WORDS array
 */
function chooseRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

/**
 * fills partialSolution with underscores to indicate unguessed characters
 */

function fillpartialSolution() {
    for (let i = 0; i < answer.length; i++) {
        partialSolution.push("_");
    }
}

/**
 * Resets the variables for tracking game to their state at game start
 */

function resetGameState() {
    wrongChars = "";
    partialSolution = [];
    remainingGuesses = 7;
    answer = chooseRandomWord();
    fillpartialSolution();
    isPlaying = true;
}

/**
 * Resets contents of HTML to the initial state
 */

function resetHTMLContent() {
    messageEL.textContent = "Press any character (a-z) to guess!";
    winsEL.textContent = "Wins: " + wins;
    lossesEL.textContent = "Losses: " + losses;
    wrongCharsEL.textContent = "Incorrect characters: " + wrongChars;
    remainingGuessesEL.textContent = "Guesses remaining: " + remainingGuesses;
    partialSolutionEL.textContent = partialSolution.join("");
}

/**
 * Sets game to initialized state
 */

function initializeGame() {
    resetGameState();
    resetHTMLContent();
}


/**
 * checks if the given user input is valid
 * 
 * @returns false if input is invalid; otherwise true
 */
function validateInput(guess) {
    if (wrongChars.indexOf(guess) !== -1) {
        messageEL.textContent = "Pick a letter that you haven't guessed, please...";
        return false;
    }

    if (partialSolution.indexOf(guess) !== -1) {
        messageEL.textContent = "Correct! But you already guessed that...";
        return false
    }

    if (guess.match(/[^a-z]/m)) {
        messageEL.textContent = "Non-alphabetical character received! Input a letter, please";
        return false
    }

    if (guess.match(/[a-z]{2,}/m)) {
        messageEL.textContent = "Non-alphabetical character received! Input a letter, please";
        return false
    }
    console.log(guess.length);
    
    return true;
}

/**
 * Deals with the player guessing the correct character
 */

function handleCorrectGuess(guess) {
    messageEL.textContent = "You got it!";
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess) {
            partialSolution[i] = guess;
        }
    }
    partialSolutionEL.textContent =  partialSolution.join("");
}

/**
 * Deals with the player guessing the incorrect character
 */

function handleWrongGuess(guess) {
    messageEL.textContent = "That ain't right";
    wrongChars = wrongChars + guess;
    wrongCharsEL.textContent = "Incorrect characters: " + wrongChars;

    remainingGuesses--;
    remainingGuessesEL.textContent = "Guesses remaining: " + remainingGuesses;
}

/**
 * Deals with the game reaching a defeated state
 */
function handleLoss() {
    messageEL.textContent = "Woops! You lost! Press any key to play again";
    partialSolutionEL.textContent =  answer;
    losses++;
    lossesEL.textContent = "Losses: " + losses;
    isPlaying = false;
}

/**
 * Deals with the game reaching a victorious state
 */
function handleWin() {
    messageEL.textContent = "Hooray! You win! Press any key to play again";
    wins++;
    winsEL.textContent = "Wins: " + wins;
    isPlaying = false;
}

/**
 * Determines whether the game has reached a victorious or a defeated state
 */


function checkGameoverState() {
    if (remainingGuesses < 1) {
        console.log("loss");

        handleLoss();
        initializeGame();
    }
    if (partialSolution.indexOf("_") === -1) {
        console.log("win");

        handleWin();
        initializeGame();
    }
}
/**
 * Control-flow that handles user input. Checks if "guess" if valid, then if it was 
 * previously guessed or is incorrect.
 * @param {*} guess 
 */
function handleInput(guess) {
    //this block only works with the old "press any key to start" initialization
    if (!isPlaying) {
        initializeGame();
        return;
    }

    if (!validateInput(guess)) {
        return;
    }

    if (answer.indexOf(guess) !== -1) {

        handleCorrectGuess(guess);
        return;
    }

    if (answer.indexOf(guess) === -1) {

        handleWrongGuess(guess);
        return;
    }
}


$('#start-button').on('click', function (e) {
    initializeGame();
    $('.game-info').collapse('toggle');
})


// $('#start-button-area').on('hide.bs.collapse', function (e) {
//     console.log("animationComplete");
//     initializeGame();
// })

$('#welcome-container').on('hidden.bs.collapse', function (e) {
    animationComplete = true;
    console.log("animationComplete");
})

document.onkeyup = function (e) {
    if (animationComplete) {
        const guess = e.key.toLowerCase();
        handleInput(guess);
        checkGameoverState();
    }
}