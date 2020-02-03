import puzzles from './puzzles'

const getCustomPuzzles = () => {
	const puzzlesJSON = localStorage.getItem('puzzles')
	return puzzlesJSON ? JSON.parse(puzzlesJSON) : []
}

const loadHiScore = () => {
	const scoreJSON = localStorage.getItem('hiScore')

	return scoreJSON ? JSON.parse(scoreJSON) : 0
}

const getPuzzleCount = difficulty => {
	const puzzleArrayFiltered = puzzles.filter(puzzle => puzzle.difficulty === difficulty)
	return puzzleArrayFiltered.length
}

const loadImg = imgSrc =>
	new Promise((resolve, reject) => {
		const image = new Image()
		image.addEventListener('load', () => {
			resolve(image)
		})
		image.addEventListener('error', () => {
			reject('Image did not load. Invalid source')
		})
		image.src = imgSrc
	})

export { loadHiScore, getPuzzleCount, loadImg, getCustomPuzzles }
