class Game {
  constructor() {
    this.score = 0
    this.difficulty = this.getDifficulty()
    this.remainingGuesses = 6 - this.difficulty
    this.status = 'start'
    this.usedWords = []
    this.displayMessage = ''
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
}

export { Game as default }
