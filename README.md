# word-guess-game

## Description
* word-guess-game is an interactive game to play in the browser. It is built with JavaScript and Web APIs.

* To play, click the start button and choose letters. Each round is timed. Win by guessing the word before time runs out.

* The buttons on the screen do not currently work, play only by using keyboard. Letter buttons are a feature to add in the future.

* See page: [Word Guessing Game](https://caitlinw29.github.io/word-guess-game/)

## Instructions
The completed application should meet the following criteria:

* As a user, I want to start the game by clicking on a button. 

* As a user, I want to try and guess a word by filling in a number of blanks that match the number of letters in that word.

* As a user, I want the game to be timed. 

* As a user, I want to win the game when I have guessed all the letters in the word.

* As a user, I want to lose the game when the timer runs out before I have guessed all the letters.

* As a user, I want to see my total wins and losses on the screen. 

### Specifications

* When a user presses a letter key, the user's guess should be captured as a key event.

* When a user correctly guesses a letter, the corresponding blank "_" should be replaced by the letter. For example, if the user correctly selects "a", then "a _ _ a _" should appear. 

* When a user wins or loses a game, a message should appear and the timer should stop. 

* When a user clicks the start button, the timer should reset. 

* When a user refreshes or returns to the brower page, the win and loss counts should persist.

![Word Guessing Game](./assets/images/WGG-SS.png)