// const breakPieces = (shape: string) => {
//   complete me!
// }

type direction = 'N' | 'E' | 'S' | 'W'
type numberTuple = [number, number]

const findEdges = (lines: string[]) => {
  const edges = []
  for (let x = 0, lx = lines.length; x < lx; x++) {
    for (let y = 0, ly = lines[x].length; y < ly; y++) {
      if ( lines[x][y] === `+` ) { edges.push([x, y]) }
    }
  }
  return edges
}

const topLeftOnly = (edges: number[][], lines: string[]) =>
  edges.filter( ([x, y]) =>
  
                            lines[x][y + 1] === '-'
                            && lines[x + 1]
                            && lines[x + 1][y] === '|')

const textToLines = (s: string) => s.split(`\n`)

// const getPiece = (lines: string[]) => (originEdge: numberTuple) {
//   allEdges(originEdge, lines)
//   .filter(noOuterShapes)
// }

const getAllEdges =
  (lines: string[]) =>
  (origin: numberTuple) => {
    let previous = origin
    let previousDirection: direction | null = null
    let next: numberTuple
    let shapeEdges = [origin]
    let usedOriginEdges = []
    let nextDirection: direction
    do {
      nextDirection = getNextDirection(lines, previous, previousDirection)
      if (previousDirection === 'E' && nextDirection === 'N' && isOuter(lines, previous)) {
        return [null, []]
      }
      if (previousDirection === 'N' && nextDirection === 'E') {
        usedOriginEdges.push(previous)
      }
      next = getNextEdge(lines, previous, nextDirection)
      previous = next
      previousDirection = nextDirection
      shapeEdges.push(next)

    } while (origin[0] !== next[0] || origin[1] !== next[1]) 
    return [shapeEdges, usedOriginEdges]
  }

const getNextDirection = (
  lines: string[],
  [x, y]: numberTuple,
  previousDirection: null | direction
): direction => {
  switch (previousDirection) {
    case null: return 'E'
    case 'N':
      if (lines[x][y + 1] === '-') { return 'E'}
    case 'W':
      if (lines[x - 1] && lines[x - 1][y] === '|') { return 'N'}
    case 'S':
      if (lines[x][y - 1] === '-') { return 'W'}
    case 'E':
      if (lines[x + 1] && lines[x + 1][y] === '|') { return 'S'}
      if (lines[x][y + 1] === '-') { return 'E'}
      if (lines[x - 1] && lines[x - 1][y] === '|') { return 'N'}
    default: throw new Error('direction unknown')
  }
}

const isOuter = (
  lines: string[],
  [x, y]: numberTuple
) => !lines[x][y + 1]


const getNextEdge = (
  lines: string[],
  [x, y]: numberTuple,
  direction: direction
): numberTuple => {
  let verticalStep = 0
  let horizontalStep = 0
  switch (direction) {
    case 'N': verticalStep = -1
              break
    case 'E': horizontalStep = 1
              break
    case 'S': verticalStep = 1
              break
    case 'W': horizontalStep = -1
              break
  }
  do {
    x += verticalStep
    y += horizontalStep
  } while (lines[x][y] !== '+')
  return [x, y]
}

export {
  getAllEdges,
  findEdges,
  getNextDirection,
  getNextEdge,
  isOuter,
  numberTuple,
  textToLines,
  topLeftOnly
}