import puzzles from './puzzles'

const getPuzzle = (difficulty, usedWords) => {
  const puzzlesFiltered = puzzles
    .filter(puzzle => puzzle.difficulty === difficulty)
    .filter(puzzle => !usedWords.includes(puzzle.word))

  return puzzlesFiltered.length === 0
    ? { word: '' }
    : puzzlesFiltered[Math.floor(Math.random() * puzzlesFiltered.length)]
}

export { getPuzzle as default }
