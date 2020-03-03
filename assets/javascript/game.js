
const WORDS = ["pineapple", "squash", "astronomy", "rattlesnake", "xylophone", "watermelon", "bumblebee", "butterscotch", "headphones", "obfuscation"]; //muahahaha

let isPlaying = false;      //control variable
let incompleteWord = [];    //stores the in-progress word as an array of strings //hooray for immutable strings... javascript is fun
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
const incompleteWordEL = document.getElementById("incomplete-word");
const messageEL = document.getElementById("message");


//display metagame data

/**
 * @returns 
 */
function arrayToString(arr) {
    let temp = "";
    for (let i = 0; i < arr.length; i++) {
        temp = temp + arr[i] + " ";
    }
    return temp;
}



/**
 * Sets game to initialized state
 *
 */

 
function initializeGame() {
    directionsTextEL.textContent = " ";

    // (re)initialize incorrect chars
    wrongChars = "";
    incompleteWord = [];


    messageEL.textContent = "Here's a round of Word Guess!";
    winsEL.textContent = "Wins: " + wins;
    lossesEL.textContent = "Losses: " + losses;
    wrongCharsEL.textContent = "Incorrect characters: " + wrongChars;
    remainingGuessesEL.textContent = "Guesses remaining: " + remainingGuesses;




    console.log(wrongChars.length);

    remainingGuesses = 7;



    // select a random word to be guessed 
    answer = WORDS[Math.floor(Math.random() * WORDS.length)]
    console.log("answer: " + answer);

    // populate incomplete word with blank spaces (underscores)

    for (let i = 0; i < answer.length; i++) {
        incompleteWord.push("_");
        incompleteWord.t


    }
    incompleteWordEL.textContent = "Incomplete word: " + arrayToString(incompleteWord);
    console.log("incompleteWord: " + incompleteWord);


    //changes control variable to start gameplay 
    isPlaying = true;
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

        // check if character has already been guessed and is an incorrect guess
        if (wrongChars.indexOf(guess) !== -1 || incompleteWord.indexOf(guess) !== -1) {
            ///display "you already guessed that!" in user feedback element
            messageEL.textContent = "Pick a letter that you haven't guessed, please...";
        }





        /////////////////////RIGHT GUESS//////////////////////

        else if (answer.indexOf(guess) !== -1) {
            console.log("nice");
            //display "correct guess!" in user feedback element
            messageEL.textContent = "You got it!";

            //replace underscores with guess character in indexes that correspond to correct ones in answer
            for (let i = 0; i < answer.length; i++) {

                //replaces underscore with if guess character is at the current index
                if (answer[i] === guess) {


                    incompleteWord[i] = guess;
                    console.log(true + " " + incompleteWord[i]);
                }
            }

            //update incompleteWord
            incompleteWordEL.textContent = "Incomplete word: " + arrayToString(incompleteWord);


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
            incompleteWordEL.textContent = "Incomplete word: " + answer;


            //increment losses
            losses++;
            lossesEL.textContent = "Losses: " + losses;

            //set control variable to reinitialize
            isPlaying = false;
        }

        /////////////////////YOU WON/////////////////////

        if (incompleteWord.indexOf("_") === -1) {
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
