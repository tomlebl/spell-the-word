import Hangman from './hangman'
import getPuzzle from './requests'

const statusEl = document.querySelector('#status')
const body = document.querySelector('body')
const difficultyEl = document.querySelector('#difficulty')
const imgConstainer = document.querySelector('#container_img')
const picture = document.createElement('img')
const puzzleDisplay = document.createElement('div')

let puzzle1
let score = 0
let guesses = 0
let difficulty

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
  const { word, imgSrc } = getPuzzle(difficulty)
  puzzle1 = new Hangman(word, guesses)
  setGradient()
  renderImg(imgSrc)
  render()
}

const startGame = () => {
  guesses = 6 - getDifficulty()
  score = 0
  difficulty = getDifficulty()
  puzzleDisplay.innerHTML = '<div id="puzzle" class="puzzle">'
  puzzleDisplay.classList.add('display')
  console.log(puzzleDisplay)
  difficultyEl.replaceWith(puzzleDisplay)
  startPuzzle()
}

window.addEventListener('keypress', e => {
  const guess = String.fromCharCode(e.charCode)
  puzzle1.makeGuess(guess)
  if (puzzle1.status === 'finished') {
    score = score + difficulty
    guesses = puzzle1.remainingGuesses

    setTimeout(console.log(score), 50000)
    startPuzzle()
  }
  render()
})

document.querySelector('#reset').addEventListener('click', startGame)

renderImg('images/grapes.jpeg')
