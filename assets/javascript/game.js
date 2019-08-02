
const WORDS = ["pineapple", "squash", "astronomy", "rattlesnake", "xylophone", "watermelon", "bumblebee", "butterscotch", "headphones", "obfuscation", "iufuegweew"]; //muahahaha

let isPlaying = false;      //control variable
let incompleteWord = "";    //stores the in-progress word with correct letters filled in
let answer = "";            //actual answer
let incorrectChars = "";    //string of incorrect guesses

const MAX_INCORRECT = 7;


const directionsText = document.getElementById("directions-text");

document.onkeyup = function (event) {
    const guess = event.key.toLowerCase;

    //(re)initialization
    if (!isPlaying) {
        // display instructions in user feedback element


        // (re)initialize in-progress word, incorrect chars
        

        // select a random word to be guessed
        answer = WORDS[Math.floor(Math.random() * WORDS.length)]

        // populate incomplete word with blank spaces (underscores)
        for (let i = 0; i < answer.length; i++) {
            incompleteWord = incompleteWord + "_";
        }

        //changes control variable to start gameplay
        isPlaying = true;

    }


    // main gameplay logic
    else {



        // display incomplete word on screen
        // display incorrect characters
        // display number of guesses remaining


        // check if character has already been guessed and is an incorrect guess
        if (incorrectChars.indexOf(guess) !== -1) {
            //display "you already guessed that!" in user feedback element
        }

        // check if guessed letter is in answer
        else if (answer.indexOf(guess) !== -1) {
            //display "correct guess!" in user feedback element

            //replace underscores with guess character in indexes that correspond to correct ones in answer
            //iterates through characters of string
            for (let i = 0; i < answer.length; i++) {
                //replaces underscore with if guess character is at the current index
                if (answer[i] === guess) {
                    incompleteWord[i] = answer[i];
                }
            }

        }
        else {
            //display "incorrect guess" in user feedback element
            //put guess in incorrect char array
            incorrectChars = incorrectChars + guess;
        }


        // check if the current player wordprogress is the solution
        if (incompleteWord === solution) {
            //display win text and display text asking them if they want to play again in user feedback element

        }
    }
}
