import Hangman from './hangman'
import getPuzzle from './requests'

const puzzleEl = document.querySelector('#puzzle')
const statusEl = document.querySelector('#status')
const body = document.querySelector('body')
const imgConstainer = document.querySelector('#container_img')
const picture = document.createElement('img')

let puzzle1
let score = 0
let guesses = 0

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
  puzzleEl.innerHTML = ''
  statusEl.textContent = puzzle1.statusMessage
  puzzle1.puzzle.split('').forEach(element => {
    let letter = document.createElement('span')
    letter.textContent = element
    puzzleEl.appendChild(letter)
  })
}

const getDifficulty = () => {
  if (document.getElementById('beginner').checked) {
    return 1
  } else if (document.getElementById('intermediate').checked) {
    return 2
  } else if (document.getElementById('advanced').checked) {
    return 3
  }
}

const startPuzzle = () => {
  const { word, imgSrc } = getPuzzle(getDifficulty())
  puzzle1 = new Hangman(word, guesses)
  setGradient()
  renderImg(imgSrc)
  render()
}

const startGame = () => {
  guesses = 6 - getDifficulty()
  score = 0
  startPuzzle()
  console.log('startGame', puzzle1.statusMessage)
}

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode)
  puzzle1.makeGuess(guess)
  if (puzzle1.status === 'finished') {
    score = score + getDifficulty()
    guesses = puzzle1.remainingGuesses

    setTimeout(console.log(score), 50000)
    startPuzzle()
  }
  render()
})

document.querySelector('#reset').addEventListener('click', startGame)

renderImg('images/grapes.jpeg')
