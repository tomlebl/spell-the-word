import Hangman from './hangman'
import getPuzzle from './requests'

class Game {
  constructor() {
    this.score = 0
    this.difficulty = this.getDifficulty()
    this.remainingGuesses = 6 - this.difficulty
    this.status = 'playing'
  }
  getDifficulty() {
    if (document.getElementById('beginner').checked) {
      return 1
    } else if (document.getElementById('intermediate').checked) {
      return 2
    } else if (document.getElementById('advanced').checked) {
      return 3
    }
  }
  // get hangman() {
  //   const { word, imgSrc } = getPuzzle(this.difficulty)
  //   return new Hangman(word, imgSrc, this.remainingGuesses)
  // }
}

export { Game as default }
