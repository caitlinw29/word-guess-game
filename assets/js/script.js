const startBtn = document.getElementById("start");
const resetBtn = document.getElementById("reset-btn");
const overlay = document.getElementById("overlay");
const instructions = document.getElementById("instructions");
const currentWord = document.getElementById("current-word");
const letterBtns = document.getElementById("letter-buttons");
let overlayVisible = false;
let choices = [];
let choicesUp = [];
const timer = document.getElementById("timer");
const winsText = document.getElementById("wins");
const lossesText = document.getElementById("losses");
let wins = 0;
let losses = 0;
let isWin = false;
let blanks;
let word = "";
let btnPressed;
let keyPressed;
var letterInWord = false;
var stringLetters = "abcdefghijklmnopqrstuvwxyz";
var letters = stringLetters.split("");
let target;


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
  letterBtns.addEventListener("click", buttonPress);
  let clearBtns = letterBtns.getElementsByTagName("button");
  for (let i=0; i<clearBtns.length; i++){
    clearBtns[i].style.backgroundColor = "white";
  }
  startBtn.disabled = true;
  //fetch request gets one word with swear words off
  var requestUrl = 'https://random-word-api.herokuapp.com/word?number=1&swear=0';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      word = data.toString().toUpperCase();
      choices = data[0].split("");
      numSpaces = choices.length;
      for (let i=0; i<numSpaces; i++){
        choicesUp.push(choices[i].toUpperCase());
      }
      buildWord();
  });

  //set up timer
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timer.textContent = secondsLeft;
    //set conditions to win or lose the game
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

//build the word by placing _ for each letter
function buildWord() {
  currentWord.innerHTML = "";
  for (let i=0; i<numSpaces; i++){
    blanks.push("_");
  }
  currentWord.textContent = blanks.join(" ");
}


//listen for keys pressed
function keydownAction(event) {
  keyPressed = event.key.toUpperCase();
  let options = document.querySelectorAll("button[data-letter]");
  for (let i=0; i<options.length; i++){
    //if the data-letter of the button matches the key that was pressed, make that button the target
    if ($(options[i]).data('letter') == keyPressed){
      target = options[i];
    }
  }
  if (!letters.includes(event.key)) {
    //if the pressed key is not a letter, return
    return;
  } else {    
    //otherwise check the letter, and check for a win
    checkLetter(keyPressed)
    checkWin();
  }
}
//check for button press
function buttonPress(event) {
  target = event.target;
  if (target.className != "letter") return;
  btnPressed = target.textContent;
  //check the letter, and check for a win
  checkLetter(btnPressed)
  checkWin();
}
//check if letter is in current word
function checkLetter(keyPressed){
  if (choicesUp.includes(keyPressed)) {
      letterInWord = true;
      target.style.backgroundColor = "green";
    } else {
      target.style.backgroundColor = "red";
    }
  if (letterInWord) {
    for (let i = 0; i < numSpaces; i++) {
      //check each space in the word, and if the letter matches, fill it in
      if (word.charAt(i) === keyPressed) {
        blanks[i] = keyPressed;
        currentWord.textContent = blanks.join(" ")
      }
    }
  }
}

//check if all the letters have been filled
function checkWin() {
  if (word === blanks.join("")) {
    isWin = true;
  }
}
//functions for setting the game up if user wins or loses
function winGame() {
  currentWord.textContent += "\r\n \r\n YOU WON!!!";
  wins++;
  startBtn.disabled = false;
  winsText.textContent = wins;
  localStorage.setItem("winCount", wins);
  startBtn.textContent = "Play Again";
  document.removeEventListener("keydown", keydownAction);
  letterBtns.removeEventListener("click", buttonPress);
}
function loseGame() {
  //replace text to have incomplete word and game over
  currentWord.textContent = word + "\r\n \r\n GAME OVER";
  losses++;
  startBtn.disabled = false;
  lossesText.textContent = losses;
  localStorage.setItem("loseCount", losses);
  startBtn.textContent = "Play Again";
  document.removeEventListener("keydown", keydownAction);
  letterBtns.removeEventListener("click", buttonPress);
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


//when reset button is clicked, clear scores and local storage
resetBtn.addEventListener("click", function(){
  wins = 0;
  winsText.textContent = 0;
  localStorage.setItem("winCount", wins);
  losses = 0;
  lossesText.textContent = 0;
  localStorage.setItem("loseCount", losses);
});

//get wins and losses from local storage at load-in
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