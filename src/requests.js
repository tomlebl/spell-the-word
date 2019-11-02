import puzzles from './puzzles'

const getPuzzle = (difficulty, usedWords) => {
  const puzzlesFiltered = puzzles
    .filter(puzzle => puzzle.difficulty === difficulty)
    .filter(puzzle => !usedWords.includes(puzzle.word))

  return puzzlesFiltered.length === 0
    ? { word: '' }
    : puzzlesFiltered[Math.floor(Math.random() * puzzlesFiltered.length)]
}

const saveHiScore = score => {
  localStorage.setItem('hiScore', JSON.stringify(score))
}

const loadHiScore = () => {
  const scoreJSON = localStorage.getItem('hiScore')

  return scoreJSON ? JSON.parse(scoreJSON) : 0
}

const getPuzzleCount = difficulty => {
  const puzzleArrayFiltered = puzzles.filter(
    puzzle => puzzle.difficulty === difficulty
  )
  return puzzleArrayFiltered.length
}

export { getPuzzle, saveHiScore, loadHiScore, getPuzzleCount }
