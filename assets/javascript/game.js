
const WORDS = ["pineapple", "squash", "astronomy", "rattlesnake", "xylophone", "watermelon", "bumblebee", "butterscotch", "headphones", "obfuscation", "iufuegweew"]; //muahahaha

let isPlaying = false;      //control variable
let incompleteWord = "";    //stores the in-progress word with correct letters filled in
let answer = "";            //actual answer
let incorrectChars = "";    //string of incorrect guesses
let wins = 0;               //win counter
let losses = 0;             //loss counter

const MAX_INCORRECT = 7;


const directionsText = document.getElementById("directions-text");


//display metagame data

//wins
//losses

document.onkeyup = function (event) {
    const guess = event.key.toLowerCase;


    //I should have proabably done this whole control flow with a switch instead of nested if else
    //time and stamina permitting, I will

    //(re)initialization
    if (!isPlaying) {
        // display instructions in user feedback element


        // (re)initialize incorrect chars
        incorrectChars = "";
        
        

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



        /// display incomplete word on screen with a space between each character
        for(let i = 0; i < answer.length; i++){

        }
        /// display incorrect characters
        /// display number of guesses remaining
        MAX_INCORRECT - incorrectChars.length;


        // check if character has already been guessed and is an incorrect guess
        if (incorrectChars.indexOf(guess) !== -1) {
            ///display "you already guessed that!" in user feedback element
        }

        // check if guessed letter is in answer
        else if (answer.indexOf(guess) !== -1) {
            //display "correct guess!" in user feedback element

            //replace underscores with guess character in indexes that correspond to correct ones in answer
            for (let i = 0; i < answer.length; i++) { //iterates through characters of string
                //replaces underscore with if guess character is at the current index
                if (answer[i] === guess) {
                    incompleteWord[i] = answer[i];
                }
            }
            //update 

        }
        else {
            //display "incorrect guess" in user feedback element
            //put guess in incorrect char array
            incorrectChars = incorrectChars + guess;
        }
        
        //lose condition
        if(MAX_INCORRECT - incorrectChars.length < 1){
            //display loss text and display text asking them if they want to play again in user feedback element


            //increment losses
            losses++;

            //set control variable to reinitialize
            isPlaying = false;
        }

        // win condition
        if (incompleteWord === solution) {
            //display win text and display text asking them if they want to play again in user feedback element

            wins++;
            ///update win display

            //set control variable to reinitialize
            isPlaying = false;

        }
    }
}
