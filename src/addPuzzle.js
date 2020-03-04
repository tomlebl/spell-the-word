import 'particles.js'
import { loadImg, getCustomPuzzles, loadPixabay } from './requests'

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
const buttonPixabay = document.querySelector('#button-pixabay')
const amount = document.querySelector('#amount')
const diff1 = document.getElementById('beginner')
const diff2 = document.getElementById('intermediate')
const message = document.getElementById('message')
// const diff3 = document.getElementById('advanced')

let picture = document.createElement('img')

const selectImg = imgSrc => {
	imgContainer.innerHTML = ''
	message.textContent = ''
	inputUrl.value = imgSrc
	renderImg(imgSrc)
}

const renderImg = imgSrc => {
	message.textContent = 'Loading ...'
	loadImg(imgSrc)
		.then(imgElement => {
			picture = imgElement
			picture.classList.add('picture', 'animated', 'bounceIn')
			picture.addEventListener('click', e => {
				selectImg(e.target.src)
			})
			imgContainer.appendChild(picture)
			imgHasLoaded = true
			message.textContent = imgContainer.childElementCount > 1 ? 'Click on image to select' : null
		})
		.catch(err => {
			console.log(err)
			// const urlError = document.createElement('div')
			// urlError.textContent = 'Invalid Image URL'
			// urlError.classList.add('error')
			// imgContainer.appendChild(urlError)
			message.textContent = 'Invalid Image URL'
		})
}

const clearForm = () => {
	inputWord.value = ''
	inputUrl.value = ''
	diff1.checked = true
	imgContainer.innerHTML = ''
	imgHasLoaded = false
	message.textContent = 'Enter word and load images from Pixabay or enter URL of an alternative image'
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
	} else if (imgHasLoaded) {
		message.textContent = 'Please, Enter a word'
	} else {
		message.textContent = 'Please, Enter a valid image URL'
	}
}

const renderImages = () => {
	imgContainer.innerHTML = ''
	inputUrl.value = ''
	message.textContent = 'Loading ...'

	loadPixabay(inputWord.value, amount.value)
		.then(response => {
			// console.log(response.hits)
			response.hits.map(image => {
				renderImg(image.webformatURL)
			})
		})
		.catch(err => {
			console.log(err)
			message.textContent = err
		})
}

inputWord.addEventListener('input', e => {
	puzzleObj.word = e.target.value
})

inputUrl.addEventListener('input', e => {
	puzzleObj.imgSrc = e.target.value
	if (imgContainer.hasChildNodes()) {
		imgContainer.innerHTML = ''
	}
	renderImg(puzzleObj.imgSrc)
})

buttonClear.addEventListener('click', clearForm)
buttonSave.addEventListener('click', savePuzzle)
buttonPixabay.addEventListener('click', renderImages)
