import 'particles.js'
import { loadImg, getCustomPuzzles } from './requests'

particlesJS.load('particles-js', 'assets/particles.json', function() {
	console.log('callback - particles.js config loaded')
})

const puzzleObj = {
	word: '',
	imgSrc: '',
	difficulty: 1
}

let imgHasLoaded = false

const inputWord = document.querySelector('#input-word')
const inputUrl = document.querySelector('#input-url')
const imgContainer = document.querySelector('#container-img')
const buttonClear = document.querySelector('#button-clear')
const buttonSave = document.querySelector('#button-save')
const diff1 = document.getElementById('beginner')
const diff2 = document.getElementById('intermediate')
const diff3 = document.getElementById('advanced')

let picture = document.createElement('img')

const renderImg = () => {
	loadImg(puzzleObj.imgSrc)
		.then(imgElement => {
			picture = imgElement
			picture.classList.add('picture', 'animated', 'bounceIn')
			imgContainer.appendChild(picture)
			imgHasLoaded = true
		})
		.catch(err => {
			console.log(err)
			const urlError = document.createElement('div')
			urlError.textContent = 'Invalid Image URL'
			urlError.classList.add('error')
			imgContainer.appendChild(urlError)
		})
}

const clearForm = () => {
	inputWord.value = ''
	inputUrl.value = ''
	diff1.checked = true
	imgContainer.innerHTML = ''
	imgHasLoaded = false
}

const savePuzzle = () => {
	if (imgHasLoaded && inputWord.value !== '') {
		puzzleObj.difficulty = diff1.checked ? 1 : diff2.checked ? 2 : 3
		puzzleObj.word = inputWord.value
		puzzleObj.imgSrc = inputUrl.value
		const puzzlesArr = getCustomPuzzles()
		puzzlesArr.push(puzzleObj)
		localStorage.setItem('puzzles', JSON.stringify(puzzlesArr))
		clearForm()
	}
}

inputWord.addEventListener('input', e => {
	puzzleObj.word = e.target.value
})

inputUrl.addEventListener('input', e => {
	puzzleObj.imgSrc = e.target.value
	if (imgContainer.hasChildNodes()) {
		imgContainer.innerHTML = ''
	}
	renderImg()
})

buttonClear.addEventListener('click', clearForm)
buttonSave.addEventListener('click', savePuzzle)
