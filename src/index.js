import Hangman from './hangman'
import getPuzzle from './requests'
import Game from './game'

const statusEl = document.querySelector('#status')
const body = document.querySelector('body')
const difficultyEl = document.querySelector('#difficulty')
const imgConstainer = document.querySelector('#container_img')
const picture = document.createElement('img')
const puzzleDisplay = document.createElement('div')

let hangman1
let game1

const setRandomColour = () =>
  '#' + (Math.random().toString(16) + '000000').slice(2, 8).slice(-6)

const setGradient = () => {
  body.style.background = `linear-gradient(to right, ${setRandomColour()}, ${setRandomColour()})`
}

const renderImg = imgSrc => {
  picture.setAttribute('src', imgSrc)
  imgConstainer.appendChild(picture)
}

const render = () => {
  const puzzleEl = document.querySelector('#puzzle')
  puzzleEl.innerHTML = ''
  //statusEl.textContent = puzzle1.statusMessage
  hangman1.puzzle.split('').forEach(element => {
    let letter = document.createElement('span')
    letter.textContent = element
    puzzleEl.appendChild(letter)
  })
}

const startPuzzle = () => {
  const { word, imgSrc } = getPuzzle(game1.difficulty)
  hangman1 = new Hangman(word, imgSrc, game1.difficulty)
  setGradient()
  renderImg(hangman1.imgSrc)
  render()
}

const startGame = () => {
  game1 = new Game()
  puzzleDisplay.innerHTML = '<div id="puzzle" class="puzzle">'
  puzzleDisplay.classList.add('display')
  difficultyEl.replaceWith(puzzleDisplay)
  startPuzzle()
}

renderImg('images/grapes.jpeg')

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode)
  hangman1.makeGuess(guess)
  if (hangman1.status === 'finished') {
    game1.score += game1.difficulty
    //guesses = hangman1.remainingGuesses

    setTimeout(console.log(game1.score), 50000)
    startPuzzle()
  }
  render()
})

document.querySelector('#reset').addEventListener('click', startGame)
