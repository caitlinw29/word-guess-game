var startBtn = document.getElementById("start");
const overlay = document.getElementById("overlay");
var instructions = document.getElementById("instructions");
const currentWord = document.getElementById("current-word");
let overlayVisible = false;
var choices;

startBtn.addEventListener("click", startGame);

function startGame(){
  document.addEventListener("keydown", keydownAction);
  //fetch request gets one word with swear words off
  var requestUrl = 'https://random-word-api.herokuapp.com/word?number=1&swear=0';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      choices = data[0].split("");
      buildWord();
    
    });
}

function buildWord() {
  currentWord.innerHTML = "";
  for (let i=0; i<choices.length; i++){
    currentWord.innerHTML += " _ ";
  }
}
// currentWord.innerHTML += " " + choices[i].toUpperCase() + " ";

//listen for keys pressed
var keyPressed;

function keydownAction(event) {
  keyPressed = event.key.toUpperCase();
  var stringLetters = "abcdefghijklmnopqrstuvwxyz";
  var letters = stringLetters.split("");

  if (!letters.includes(event.key)) {
    return;
  } else {
    console.log(keyPressed);
    checkLetter();
  }
}


//check if letter is in current word
function checkLetter(){

}



//functions to show how-to-play overlay on click of button
function overlayOn() {
  overlay.style.display = "block";
  overlayVisible = true;
}

function overlayOff() {
  overlay.style.display = "none";
  overlayVisible = false;
}
overlay.addEventListener('click', overlayOff);
instructions.addEventListener('click', overlayOn);



