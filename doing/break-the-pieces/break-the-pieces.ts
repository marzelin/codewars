const breakPieces = (shape: string) => {
  const lines = textToLines(shape)
  const shapeCorners = topLeftOnly( findCorners(lines), lines )
  const pieces = []
  for (let i = 0; i < shapeCorners.length; i++) {
    const {pieceCorners, usedOrigins} = getAllCorners(lines)(shapeCorners[i])
    if ( !pieceCorners) { continue }
    if (usedOrigins.length) {
      usedOrigins.forEach( ([x, y]) => {
        const index = shapeCorners.slice(i + 1).findIndex( ([a, b]) => a === x && b === y)
        if (index > -1) {
          shapeCorners.splice(index + 1 + i, 1)
        }
      })
    }
    pieces.push(normalizeCorners(pieceCorners))
  }
  return pieces
    .map(drawPiece)
}

type direction = 'N' | 'E' | 'S' | 'W'
type position = [number, number]

const findCorners = (lines: string[]) => {
  const corners: position[] = []
  for (let x = 0, lx = lines.length; x < lx; x++) {
    for (let y = 0, ly = lines[x].length; y < ly; y++) {
      if ( lines[x][y] === `+` ) { corners.push([x, y]) }
    }
  }
  return corners
}

const topLeftOnly = (corners: position[], lines: string[]) =>
  corners.filter( ([x, y]) =>
    lines[x][y + 1] === '-'
    && lines[x + 1]
    && lines[x + 1][y] === '|')

const textToLines = (s: string) => s.split(`\n`)

const getAllCorners =
  (lines: string[]) =>
  (origin: position) => {
    let previous = origin
    let previousDirection: direction | null = null
    let next: position
    let pieceCorners = [origin]
    let usedOrigins: position[] = []
    let nextDirection: direction
    do {
      nextDirection = getNextDirection(lines, previous, previousDirection)
      if (previousDirection === 'E' && nextDirection === 'N' && isOuter(lines, previous)) {
        return { pieceCorners: null, usedOrigins}
      }
      if (previousDirection === 'N' && nextDirection === 'E') {
        usedOrigins.push(previous)
      }
      next = getNextCorner(lines, previous, nextDirection)
      if (previousDirection === nextDirection) {
        pieceCorners.pop()
      }
      pieceCorners.push(next)
      previous = next
      previousDirection = nextDirection

    } while (origin[0] !== next[0] || origin[1] !== next[1]) 
    return {pieceCorners, usedOrigins}
  }

const getNextDirection = (
  lines: string[],
  [x, y]: position,
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
  [x, y]: position
) => !lines[x][y + 1]

const getNextCorner = (
  lines: string[],
  [x, y]: position,
  direction: direction
): position => {
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

const normalizeCorners = (corners: position[]) => {
  const [minX, minY] = corners.reduce(
    ([minX, minY], [x, y]) =>
      [Math.min(minX, x), Math.min(minY, y)])
    return corners.map( ([x, y]) => [x - minX, y - minY])
}

const drawPiece = (corners: position[]) => {
  let [maxX, maxY] = corners
    .reduce( ([maxX, maxY], [x, y]) => [Math.max(maxX, x), Math.max(maxY, y)])
  let piece = []
  for (let i = 0; i <= maxX; i++) { piece.push( ' '.repeat(maxY) ) }
  for (let i = 0, l = corners.length - 1; i < l; i++) {
    let start = corners[i]
    let end = corners[i + 1]
    piece = drawEdge(start, end, piece)
  }
  return piece
    .join('\n')
    .replace(/\s*\n/g, '\n')
    .replace(/\s*$/, '')
}

const drawEdge = (
  [x1, y1]: position,
  [x2, y2]: position,
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
  breakPieces,
  drawEdge,
  drawPiece,
  getAllCorners,
  findCorners,
  getNextDirection,
  getNextCorner,
  isOuter,
  normalizeCorners,
  position,
  substitute,
  textToLines,
  topLeftOnly
}