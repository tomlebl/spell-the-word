import Hangman from './hangman'
import getPuzzle from './requests'
import Game from './game'

const body = document.querySelector('body')
const difficultyEl = body.querySelector('#difficulty')
const imgConstainer = body.querySelector('#container-img')
const resetButton = body.querySelector('#reset')
const title = body.querySelector('#container-title')
const emojiContainer = body.querySelectorAll('.container-emoji')
const scoreCurrent = body.querySelector('#score-current')
const guessesDisplay = body.querySelector('#score-guessess')
const difficultyDisplay = body.querySelector('#score-difficulty')

const picture = document.createElement('img')
const puzzleDisplay = document.createElement('div')
const puzzleContainer = document.createElement('div')
const puzzleMessage = document.createElement('h3')

let hangman1
let game1

const setRandomColour = () =>
  '#' + (Math.random().toString(16) + '000000').slice(2, 8).slice(-6)

const setGradient = (color1, color2) => {
  body.style.background = `linear-gradient(to right, ${color1}, ${color2})`
}

const renderImg = imgSrc => {
  picture.setAttribute('src', imgSrc)
  picture.classList.add('picture')
  imgConstainer.appendChild(picture)
}

const renderPuzzle = () => {
  const puzzleEl = document.querySelector('#puzzle')
  puzzleEl.innerHTML = ''
  hangman1.puzzle.split('').forEach(element => {
    let letter = document.createElement('span')
    letter.textContent = element
    puzzleEl.appendChild(letter)
  })
}

const renderEmoji = () => {
  emojiContainer.forEach(element => {
    var emoji = document.createElement('img')
    emoji.setAttribute('src', 'images/emoji-smiley.png')
    emoji.setAttribute('style', 'width: 300px')
    element.appendChild(emoji)
  })
}

const startPuzzle = () => {
  //Remove success decoration
  puzzleContainer.classList.remove('display-succes')
  puzzleMessage.classList.remove('animated', 'tada')
  emojiContainer.forEach(element => {
    element.innerHTML = ''
  })

  let { word, imgSrc } = getPuzzle(game1.difficulty, game1.usedWords)

  //Check if all puzzles have been used
  if (word === '' && game1.difficulty === 3) {
    puzzleMessage.textContent = 'All puzzles solved. Game over'
  } else {
    if (word === '') {
      //All puzzles at given difficulty used -> increase difficulty
      game1.difficulty++
      difficultyDisplay.textContent = game1.difficulty
      const newPuzzle = getPuzzle(game1.difficulty, game1.usedWords)
      word = newPuzzle.word
      imgSrc = newPuzzle.imgSrc
      game1.status = 'difChange'
    }

    game1.usedWords.push(word)
    hangman1 = new Hangman(word, imgSrc, game1.remainingGuesses)
    setGradient(setRandomColour(), setRandomColour())

    puzzleMessage.textContent =
      game1.status === 'difChange' ? 'Game difficulty was increased' : ''

    game1.status = 'playing'

    renderImg(hangman1.imgSrc)
    renderPuzzle()
  }
}

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
