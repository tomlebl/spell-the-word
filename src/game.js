import puzzles from './puzzles'
import { getCustomPuzzles } from './requests'

class Game {
	constructor() {
		this.score = 0
		this.difficulty = this.getDifficulty()
		this.remainingGuesses = 6 - this.difficulty
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

	getPuzzle() {
		const puzzlesFiltered = puzzles
			.concat(getCustomPuzzles())
			.filter(puzzle => puzzle.difficulty === this.difficulty)
			.filter(puzzle => !this.usedWords.includes(puzzle.word))

		console.log(puzzlesFiltered)

		return puzzlesFiltered.length === 0
			? { word: '' }
			: puzzlesFiltered[Math.floor(Math.random() * puzzlesFiltered.length)]
	}

	saveHiScore() {
		localStorage.setItem('hiScore', JSON.stringify(this.score))
	}

	loadHiScore() {
		const scoreJSON = localStorage.getItem('hiScore')

		return scoreJSON ? JSON.parse(scoreJSON) : 0
	}
}

export { Game as default }
