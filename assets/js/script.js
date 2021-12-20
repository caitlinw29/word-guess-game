var startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset-btn");
const overlay = document.getElementById("overlay");
var instructions = document.getElementById("instructions");
const currentWord = document.getElementById("current-word");
const letterBtns = document.getElementById("letter-buttons");
let overlayVisible = false;
var choices;
const timer = document.getElementById("timer");
const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");
let wins = 0;
let losses = 0;

startBtn.addEventListener("click", startGame);

function startGame(){
  var secondsLeft = 11;
  document.addEventListener("keydown", keydownAction);
  startBtn.classList.add("hidden");
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
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;
  
    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      currentWord.textContent = "GAME OVER";
      losses += 1;
      lossesText.textContent = losses;
      startBtn.textContent = "Play Again";
      startBtn.classList.remove("hidden");
    }
  
  }, 1000);
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
  //match clicked button or key press to letter in choices

  //if match, turn button green

  //if not match, turn button red


  letterBtns.on('click', '.letter', function (event) {
    var displayLetterEl = $('<div>');
  
    displayLetterEl.addClass('letter');
  
    // get letter from clicked letter button's `data-letter` attribute and use it for display
    displayLetterEl.text($(event.target).attr('data-letter'));
    displayEl.append(displayLetterEl);
  });

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


resetBtn.addEventListener("click", function(){
  winsText.textContent = 0;
  lossesText.textContent = 0;
});
