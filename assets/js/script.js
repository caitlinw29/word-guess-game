var startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset-btn");
const overlay = document.getElementById("overlay");
var instructions = document.getElementById("instructions");
const currentWord = document.getElementById("current-word");
const letterBtns = document.getElementById("letter-buttons");
const allBtns = document.querySelectorAll("button");
let overlayVisible = false;
var choices = [];
var choicesUp = [];
const timer = document.getElementById("timer");
const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");
let wins = 0;
let losses = 0;
var isWin = false;
var blanks = [];
let word = "";

function init() {
  getWins();
  getlosses();
}

startBtn.addEventListener("click", startGame);

function startGame(){
  blanks = [];
  isWin = false;
  var secondsLeft = 11;
  document.addEventListener("keydown", keydownAction);
  startBtn.disabled = true;
  //fetch request gets one word with swear words off
  var requestUrl = 'https://random-word-api.herokuapp.com/word?number=1&swear=0';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      word = data.toString().toUpperCase();
      console.log(word);
      choices = data[0].split("");
      numSpaces = choices.length;
      for (let i=0; i<numSpaces; i++){
        choicesUp.push(choices[i].toUpperCase());
      }
      buildWord();
  });


  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;

   
      if (isWin && secondsLeft > 0) {
        clearInterval(timerInterval);
        winGame();
      }
    

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      loseGame();
    }
  
  }, 1000);
}

function checkWin() {
  if (word === blanks.join("")) {
    isWin = true;
  }
}

function winGame() {
  currentWord.textContent = "YOU WON!!! ";
  wins++;
  startBtn.disabled = false;
  winsText.textContent = wins;
  localStorage.setItem("winCount", wins);
  startBtn.textContent = "Play Again";
}

function loseGame() {
  currentWord.textContent = "GAME OVER";
  losses++;
  startBtn.disabled = false;
  lossesText.textContent = losses;
  localStorage.setItem("loseCount", losses);
  startBtn.textContent = "Play Again";
}

function buildWord() {
  currentWord.innerHTML = "";
  for (let i=0; i<numSpaces; i++){
    blanks.push("_");
  }
  currentWord.textContent = blanks.join(" ");
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
    checkLetter(keyPressed)
    checkWin();
  }
}


//check if letter is in current word
function checkLetter(keyPressed){
  var letterInWord = false;

  if (choicesUp.includes(keyPressed)) {
      letterInWord = true;
    }
  if (letterInWord) {
    for (let i = 0; i < numSpaces; i++) {
      if (word.charAt(i) === keyPressed) {
        blanks[i] = keyPressed;
        currentWord.textContent = blanks.join(" ")
      }
    }

  }
  // //match clicked button or key press to letter in choices
  // if (choicesUp.includes(keyPressed)){
  //   console.log("Hello");
  // }

  //if match, turn button green

  //if not match, turn button red

  // for (let i=0; i<allBtns.length; i++){
  //   allBtns[i].addEventListener("click", function(event){
  //     if (!event.target.matches('button.letter')) return // reject other buttons
  //     console.log(event.target.value) ;
  //   })
  // }
  // letterBtns.addEventListener("click", function(event) {
  //   if (!event.target.matches('button.letter')) return // reject other buttons
  //   console.log(event.target) ;
  //   // if (choicesUp.includes(target.textContent)){
  //   //   target.style.backgroundColor = "green";
  //   // }
   
  // });

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
  wins = 0;
  winsText.textContent = 0;
  localStorage.setItem("winCount", wins);
  losses = 0;
  lossesText.textContent = 0;
  localStorage.setItem("loseCount", losses);
});


function getWins() {
  var storedWins = localStorage.getItem("winCount");
  if (storedWins === null) {
    wins = 0;
  } else {
    wins = storedWins;
  }
  winsText.textContent = wins;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    losses = 0;
  } else {
    losses = storedLosses;
  }
  lossesText.textContent = losses;
}

init();