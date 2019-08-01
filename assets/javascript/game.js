
const words = ['pineapple', 'squash', 'astronomy', 'rattlesnake', 'xylophone', 'watermelon', 'bumblebee'];

let isPlaying = false;      //control variable
let incompleteWord = "";    //stores the in-progress word with correct letters filled in
let solution = "";          //actual solution


const directionsText = document.getElementById("directions-text");

document.onkeyup = function (event) {
    const control = event.key.toLowerCase;

    //(re)initialization
    if (!isPlaying) {
        // display instructions
        


        // select a word to be guessed
        answer = words[Math.floor(Math.random() * words.length)]

        isPlaying = true

    }
    else{
        

        // populate new array/string to store 
        // display blank spaces on screen
        // 
        // if player wins, print win text and print text asking them if they want to play again

        if()
    }
}
