import Game from './game'

class Hangman {
  constructor(word, imgSrc, guesses) {
    this.word = word.toLowerCase().split('')
    this.imgSrc = imgSrc
    this.remainingGuesses = guesses
    this.guessedLetters = []
    this.wordToGuess = word.toLowerCase()
    this.status = 'playing'
  }
  makeGuess(guess) {
    guess = guess.toLowerCase()
    const isUnique = !this.guessedLetters.includes(guess)
    const isBadGuess = !this.word.includes(guess)

    if (this.status !== 'playing') {
      return
    }

    if (isUnique) {
      //this.guessedLetters.push(guess)
      this.guessedLetters = [...this.guessedLetters, guess]
    }

    if (isUnique && isBadGuess) {
      this.remainingGuesses--
    }

    this.checkStatus()
  }

  // get statusMessage() {
  //   if (this.status === 'finished') {
  //     return 'Great work! You guessed the word.'
  //   } else if (this.status === 'failed') {
  //     return `Nice try! The word was "${this.wordToGuess}".`
  //   } else {
  //     return `You have ${this.remainingGuesses} remaining guesses`
  //   }
  // }

  get puzzle() {
    let puzzle = ''
    this.word.forEach(letter => {
      if (this.guessedLetters.includes(letter) || letter === ' ') {
        puzzle += letter
      } else {
        puzzle += '*'
      }
    })

    return puzzle
  }

  checkStatus() {
    if (this.remainingGuesses === 0) {
      this.status = 'failed'
    } else if (this.puzzle === this.wordToGuess) {
      this.status = 'finished'
    } else {
      this.status = 'playing'
    }
  }
}

export { Hangman as default }
