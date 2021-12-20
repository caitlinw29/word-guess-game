var startBtn = document.getElementById("start");
const overlay = document.getElementById("overlay");
var instructions = document.getElementById("instructions");
let overlayVisible = false;

startBtn.addEventListener("click", startGame);

function startGame(){
  document.addEventListener("keydown", keydownAction);
}


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



