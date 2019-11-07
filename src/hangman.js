//import Game from './game'

class Hangman {
  constructor(word, imgSrc, guesses) {
    this.word = word.toLowerCase().split('')
    this.imgSrc = imgSrc
    this.remainingGuesses = guesses
    this.guessedLetters = []
    this.wordToGuess = word.toLowerCase()
    this.status = 'playing'
    this.snd_key_press_bad = new Audio('sounds/key_press_bad.mp3')
    this.snd_key_press = new Audio('sounds/key_press.mp3')
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
      this.snd_key_press.play()
      this.guessedLetters = [...this.guessedLetters, guess]
    }

    if (isUnique && isBadGuess) {
      this.remainingGuesses--
      this.snd_key_press_bad.play()
    }

    this.checkStatus()
  }

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
