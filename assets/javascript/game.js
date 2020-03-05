
const WORDS = ["pineapple", "squash", "astronomy", "rattlesnake", "xylophone", "watermelon", "bumblebee", "butterscotch", "headphones", "obfuscation"]; //muahahaha

let isPlaying = false;      //control variable
let partialSolution = [];    //stores the in-progress word as an array of strings //hooray for immutable strings... javascript is fun
let answer = "";            //actual answer
let wrongChars = "";        //string of incorrect guesses
let wins = 0;               //win counter
let losses = 0;             //loss counter
let remainingGuesses = 0;


const directionsTextEL = document.getElementById("directions-text");
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
    return  WORDS[Math.floor(Math.random() * WORDS.length)];
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
}

/**
 * Resets contents of HTML to the initial state
 */

function resetHTMLContent() {
    directionsTextEL.textContent = " ";
    messageEL.textContent =             "Here's a round of Word Guess!";
    winsEL.textContent =                "Wins: " + wins;
    lossesEL.textContent =              "Losses: " + losses;
    wrongCharsEL.textContent =          "Incorrect characters: " + wrongChars;
    remainingGuessesEL.textContent =    "Guesses remaining: " + remainingGuesses;
    partialSolutionEL.textContent =      "Incomplete word: " + partialSolution.join("");
    return;
}

/**
 * Sets game to initialized state
 *
 */

function initializeGame() {

    resetHTMLContent();
    resetGameState();

}

document.onkeyup = function (event) {

    const guess = event.key.toLowerCase();


    //I should have proabably done this whole control flow with a switch instead of nested if else
    //time and stamina permitting, I will

    /////////////////(re)initialization/////////////////
    if (!isPlaying) {
        initializeGame();
    }


    ///////////////////////////////////////////////////////////////////////
    ///////////////////////// MAIN GAMEPLAY LOGIC /////////////////////////
    else {

        console.log("entered main loop")

        
        //begin input validation
        if (wrongChars.indexOf(guess) !== -1) {
            ///display "you already guessed that!" in user feedback element
            messageEL.textContent = "Pick a letter that you haven't guessed, please...";
        } else if (partialSolution.indexOf(guess) !== -1) {
            ///display "you already guessed that!" in user feedback element
            messageEL.textContent = "Correct! But you already guessed that...";
        } else if(guess.match(/[^a-z]/)){
            messageEL.textContent = "Non-alphabetical character received! Input a letter, please";
        }
        //end input validation




        /////////////////////RIGHT GUESS//////////////////////

        else if (answer.indexOf(guess) !== -1) {
            console.log("nice");
            //display "correct guess!" in user feedback element
            messageEL.textContent = "You got it!";

            //replace underscores with guess character in indexes that correspond to correct ones in answer
            for (let i = 0; i < answer.length; i++) {

                //replaces underscore with if guess character is at the current index
                if (answer[i] === guess) {


                    partialSolution[i] = guess;
                    console.log(true + " " + partialSolution[i]);
                }
            }

            //update partialSolution
            partialSolutionEL.textContent = "Incomplete word: " + partialSolution.join("");


        }


        /////////////////////WRONG GUESS//////////////////////

        else {
            console.log("oops");
            console.log("guess char: " + guess);

            //display "incorrect guess" in user feedback element
            messageEL.textContent = "That ain't right";

            //put guess in incorrect char array
            wrongChars = wrongChars + guess;
            //update wrong-chars display
            wrongCharsEL.textContent = "Incorrect characters: " + wrongChars;

            //update remaining guesses
            remainingGuesses--;
            remainingGuessesEL.textContent = "Guesses remaining: " + remainingGuesses;

        }


        /// display incomplete word on screen with a space between each character
        for (let i = 0; i < answer.length; i++) {

        }


        /////////////////////GAME OVER////////////////////

        console.log("incorrectcharslength " + wrongChars.length);
        if (remainingGuesses < 1) {
            //display loss text and display text asking them if they want to play again in user feedback element
            messageEL.textContent = "Woops! You lost! Press any key to play again";
            partialSolutionEL.textContent = "Incomplete word: " + answer;


            //increment losses
            losses++;
            lossesEL.textContent = "Losses: " + losses;

            //set control variable to reinitialize
            isPlaying = false;
        }

        /////////////////////YOU WON/////////////////////

        if (partialSolution.indexOf("_") === -1) {
            //display win text and display text asking them if they want to play again in user feedback element
            messageEL.textContent = "Hooray! You win! Press any key to play again";

            wins++;
            ///update win display
            winsEL.textContent = "Wins: " + wins;

            //set control variable to reinitialize
            isPlaying = false;

        }
    }
}
