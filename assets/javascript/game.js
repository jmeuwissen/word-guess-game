const WORDS = ["pineapple", "squash", "astronomy", "rattlesnake", "xylophone", "watermelon", "bumblebee", "butterscotch", "headphones", "obfuscation"]; //muahahaha

let isPlaying = false; //control variable
let partialSolution = []; //stores the in-progress word as an array of strings //hooray for immutable strings... javascript is fun
let answer = ""; //actual answer
let wrongChars = ""; //string of incorrect guesses
let wins = 0; //win counter
let losses = 0; //loss counter
let remainingGuesses = 0;
let animationComplete = false;


const HTMLElements = {
    startButton: document.getElementById("start-button"),
    wins: document.getElementById("wins"),
    losses: document.getElementById("losses"),
    wrongChars: document.getElementById("wrong-chars"),
    remainingGuesses: document.getElementById("guesses-remaining"),
    partialSolution: document.getElementById("partial-solution"),
    message: document.getElementById("message"),
};

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
 * **HYPOTHETICAL**
 * 
 * updates content of html
 * 
 */

function updateHTML(params) {
    for (const key in HTMLElements) {
        if (game.text.hasOwnProperty(key)) {
            const element = game.text[key];
            HTMLElements[key].textContent = element;
        }
    }
}
/**
 * Resets contents of HTML to the initial state
 */


function resetHTMLContent() {
    HTMLElements.message.textContent =          "Press any character (a-z) to guess!";
    HTMLElements.wrongChars.textContent =       "Incorrect characters: " + wrongChars;
    HTMLElements.remainingGuesses.textContent = "Guesses remaining: " + remainingGuesses;
    HTMLElements.partialSolution.textContent =  partialSolution.join("");
    HTMLElements.wins.textContent =             "Wins: " + wins;
    HTMLElements.losses.textContent =           "Losses: " + losses;
}

/**
 * Sets game to initialized state
 */

function initializeGame() {
    resetGameState();
    resetHTMLContent();
}


/**
 * Deals with the player guessing the correct character
 */

function handleCorrectGuess(guess) {
    HTMLElements.message.textContent = "You got it!";
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess) {
            partialSolution[i] = guess;
        }
    }
    HTMLElements.partialSolution.textContent = partialSolution.join("");
    checkGameoverState();
}

/**
 * Deals with the player guessing the incorrect character
 */

function handleWrongGuess(guess) {
    HTMLElements.message.textContent = "That ain't right";
    wrongChars = wrongChars + guess;
    HTMLElements.wrongChars.textContent = "Incorrect characters: " + wrongChars;
    remainingGuesses--;
    HTMLElements.remainingGuesses.textContent = "Guesses remaining: " + remainingGuesses;
    checkGameoverState();
}

/**
 * Deals with the game reaching a defeated state
 */
function handleLoss() {
    HTMLElements.message.textContent = "Woops! You lost! Press any key to play again";
    HTMLElements.partialSolution.textContent = answer;
    losses++;
    HTMLElements.losses.textContent = "Losses: " + losses;
    isPlaying = false;
}

/**
 * Deals with the game reaching a victorious state
 */
function handleWin() {
    HTMLElements.message.textContent = "Hooray! You win! Press any key to play again";
    wins++;
    HTMLElements.wins.textContent = "Wins: " + wins;
    isPlaying = false;
}

function endGame() {
    $('.intergame-text').collapse('toggle');
}

/**
 * Determines whether the game has reached a victorious or a defeated state
 */


function checkGameoverState() {
    if (remainingGuesses < 1) {
        console.log("loss");

        handleLoss();
        endGame();
    }
    if (partialSolution.indexOf("_") === -1) {
        console.log("win");

        handleWin();
        endGame();
    }
}

/**
 * checks if the given user input is valid using regex
 * 
 * @returns false if input is invalid; otherwise true
 */
function validateInput(guess) {
    if (wrongChars.indexOf(guess) !== -1) {
        HTMLElements.message.textContent = "Pick a letter that you haven't guessed, please...";
        return false;
    }

    if (partialSolution.indexOf(guess) !== -1) {
        HTMLElements.message.textContent = "Correct! But you already guessed that...";
        return false;
    }

    if (guess.match(/[^a-z]/m)) {
        HTMLElements.message.textContent = "Non-alphabetical character received! Input a letter, please";
        return false;
    }

    if (guess.match(/[a-z]{2,}/m)) {
        HTMLElements.message.textContent = "Non-alphabetical character received! Input a letter, please";
        return false;
    }
    console.log(guess.length);

    return true;
}

/**
 * Control-flow that handles user input. Checks if "guess" if valid, then if it was 
 * previously guessed or is incorrect.
 * @param {*} guess 
 */
function handleInput(guess) {
    //this block only works with the old "press any key to start" initialization
    if (!isPlaying) {
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

$('#play-again-button').on('click', function (e) {
    initializeGame();
    $('.intergame-text').collapse('toggle');
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
    }
}