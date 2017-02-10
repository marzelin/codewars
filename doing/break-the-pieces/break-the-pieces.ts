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

const normalizeEdges = (edges: numberTuple[]) => {
  const [minX, minY] = edges.reduce(
    ([minX, minY], [x, y]) =>
      [Math.min(minX, x), Math.min(minY, y)])
    return edges.map( ([x, y]) => [x - minX, y - minY])
}

const drawPiece = (edges: numberTuple[]) => {
  let [maxX, maxY] = edges
    .reduce( ([maxX, maxY], [x, y]) => [Math.max(maxX, x), Math.max(maxY, y)])
  let piece = []
  for (let i = 0; i <= maxX; i++) { piece.push( ' '.repeat(maxY) ) }
  for (let i = 0, l = edges.length - 1; i < l; i++) {
    let start = edges[i]
    let end = edges[i + 1]
    piece = drawEdge(start, end, piece)
  }
  return piece
    .join('\n')
}

const drawEdge = (
  [x1, y1]: numberTuple,
  [x2, y2]: numberTuple,
  piece: string[]
) => {
  piece = [...piece]
  piece[x2]= substitute(piece[x2], '+', y2)
  if (x1 !== x2) {
    for (let i = Math.min(x1, x2) + 1, l = Math.max(x1, x2); i < l; i++) {
      piece[i] = substitute(piece[i], '|', y1)
    }
  } else {
    for (let i = Math.min(y1, y2) + 1, l = Math.max(y1, y2); i < l; i++) {
      piece[x1] = substitute(piece[x1], '-', i)
    }
  }
  return piece
}

const substitute = (s: string, ch: string, i: number) => s.slice(0, i) + ch + s.slice(i + 1)

export {
  drawEdge,
  drawPiece,
  getAllEdges,
  findEdges,
  getNextDirection,
  getNextEdge,
  isOuter,
  normalizeEdges,
  numberTuple,
  substitute,
  textToLines,
  topLeftOnly
}