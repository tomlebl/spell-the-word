import Hangman from './hangman'
import getPuzzle from './requests'
import Game from './game'
import { renderEmoji, startPuzzle } from './functions'

const body = document.querySelector('body')
const difficultyEl = body.querySelector('#difficulty')
const imgConstainer = body.querySelector('#container-img')
const resetButton = body.querySelector('#reset')
const title = body.querySelector('#container-title')
const scoreCurrent = body.querySelector('#score-current')
const guessesDisplay = body.querySelector('#score-guessess')
const difficultyDisplay = body.querySelector('#score-difficulty')

const puzzleDisplay = document.createElement('div')
const puzzleContainer = document.createElement('div')
const puzzleMessage = document.createElement('h3')

const startGame = () => {
  if (game1 && window.confirm('Do you really want to quit the game?')) {
    location.reload()
  } else if (!game1) {
    game1 = new Game()
    game1.status = 'playing'
    puzzleDisplay.innerHTML = '<div id="puzzle" class="puzzle">'
    puzzleContainer.classList.add('display', 'container-puzzle')
    guessesDisplay.textContent = game1.remainingGuesses
    puzzleContainer.appendChild(puzzleDisplay)
    puzzleContainer.appendChild(puzzleMessage)
    difficultyEl.replaceWith(puzzleContainer)
    resetButton.textContent = 'Reset the Game'
    imgConstainer.removeChild(title)
    difficultyDisplay.textContent = game1.difficulty
    startPuzzle()
  }
}

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode)

  if (hangman1.status === 'playing') {
    hangman1.makeGuess(guess)
    game1.remainingGuesses = hangman1.remainingGuesses
    guessesDisplay.textContent = game1.remainingGuesses
    if (game1.remainingGuesses === 0) {
      puzzleMessage.textContent = 'Game Over!'
      puzzleContainer.classList.add('display-fail')
      hangman1.guessedLetters = hangman1.word
      renderPuzzle()
      return
    }
  }

  if (hangman1.status === 'finished' && game1.remainingGuesses > 0) {
    hangman1.status = 'pending'
    game1.score++
    puzzleContainer.classList.add('display-succes')
    puzzleMessage.classList.add('animated', 'tada')
    puzzleMessage.textContent = 'Well Done !!!'
    renderEmoji()
    scoreCurrent.textContent = game1.score
    setTimeout(startPuzzle, 2000)
  }

  renderPuzzle()
})

resetButton.addEventListener('click', startGame)
