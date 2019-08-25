
const puzzles = [
    {
        word: 'cat',
        imgSrc: 'images/black_cat.jpeg',
        difficulty: 1
    },{
        word: 'black cat',
        imgSrc: 'images/black_cat.jpeg',
        difficulty: 3  
    },{
        word: 'dog',
        imgSrc: 'images/dog.png',
        difficulty: 1
    },{
        word: 'flower',
        imgSrc: 'images/red_flower.jpg',
        difficulty: 2
    },{
        word: 'red flower',
        imgSrc: 'images/red_flower.jpg',
        difficulty: 3
    },{ 
        word: 'car',
        imgSrc: 'images/blue_car.png',
        difficulty: 1
    },{
        word: 'blue car',
        imgSrc: 'images/blue_car.png',
        difficulty: 3  
    },{
        word: 'tree',
        imgSrc: 'images/tree.jpeg',
        difficulty: 1
    },{
        word: 'bird',
        imgSrc: 'images/bird.jpeg',
        difficulty: 1 
    },{
        word: 'banana',
        imgSrc: 'images/banana.jpeg',
        difficulty: 2
    },{
        word: 'yellow banana',
        imgSrc: 'images/banana.jpeg',
        difficulty: 3
    },{
        word: 'owl',
        imgSrc: 'images/owl.jpeg',
        difficulty: 1
    },{
        word: 'red grapes',
        imgSrc: 'images/grapes.jpeg',
        difficulty: 3
    },{
        word: 'grapes',
        imgSrc: 'images/grapes.jpeg',
        difficulty: 2
    },{
        word: 'pineapple',
        imgSrc: 'images/pineapple.jpeg',
        difficulty: 2
    }

]

const getPuzzle = (difficulty) => {
    const puzzlesFiltered = puzzles.filter((puzzle) => puzzle.difficulty === difficulty)
    return puzzlesFiltered[Math.floor(Math.random()*(puzzlesFiltered.length))]
} 

//[]
// const getPuzzle = async (wordCount) => {
//     const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    
//     if (response.status === 200) {
//         const data = await response.json()
//         return data.puzzle
//     } else {
//         throw new Error ('Unable to get puzzle')
//     }
// }

export { getPuzzle as default }


