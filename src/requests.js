import puzzles from './puzzles'

const API_URL = 'https://pixabay.com/api'
const API_KEY = '15192266-cd06e38f5473dab158adfdbeb'

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

const loadPixabay = async (word, amount) => {
	console.log(word)
	if (word) {
		const response = await fetch(
			`${API_URL}/?key=${API_KEY}&q=${word}&image_type=photo&per_page=${amount}&safesearch=true`
		)
		if (response.status === 200) {
			const data = await response.json()
			return data
		} else {
			throw new Error('Unable to load images from Pixabay. API error')
		}
	} else {
		throw new Error('word is missing')
	}
}

export { loadHiScore, getPuzzleCount, loadImg, getCustomPuzzles, loadPixabay }
