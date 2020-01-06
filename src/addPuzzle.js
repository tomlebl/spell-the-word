import 'particles.js'
import { loadImg } from './requests'

particlesJS.load('particles-js', 'assets/particles.json', function() {
	console.log('callback - particles.js config loaded')
})

const puzzleObj = {
	word: '',
	imgUrl: '',
	difficulty: 1
}

const inputWord = document.querySelector('#input-word')
const inputUrl = document.querySelector('#input-url')
const imgContainer = document.querySelector('#container-img')
const buttonClear = document.querySelector('#button-clear')
const diff1 = document.getElementById('beginner')
const diff2 = document.getElementById('intermediate')
const diff3 = document.getElementById('advanced')

let picture = document.createElement('img')

const renderImg = () => {
	loadImg(puzzleObj.imgUrl)
		.then(imgElement => {
			picture = imgElement
			picture.classList.add('picture', 'animated', 'bounceIn')
			imgContainer.appendChild(picture)
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
}

inputWord.addEventListener('input', e => {
	puzzleObj.word = e.target.value
})

inputUrl.addEventListener('input', e => {
	puzzleObj.imgUrl = e.target.value
	if (imgContainer.hasChildNodes()) {
		imgContainer.innerHTML = ''
	}
	renderImg()
})

buttonClear.addEventListener('click', clearForm)
