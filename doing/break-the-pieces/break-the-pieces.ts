// const breakPieces = (shape: string) => {
//   complete me!
// }

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

// const getPiece = (lines: string[]) => (originEdge: [number, number]) {
//   allEdges(originEdge, lines)
//   .filter(noOuterShapes)
// }

// const allEdges =
//   (lines: string[]) =>
//   (origin: [number, number]) => {
//     let previous = origin
//     let previousDirection: string | null = null
//     let next: [number, number]
//     let shape = [origin]
//     do {
//       let nextDirection = getNextDirection(lines, previous, previousDirection)
//       if (previousDirection === 'N' && nextDirection === 'E' && isOuter(lines, previous)) {
//         return 'outer shape'
//       }
//       next = getNextEdge(lines, previous, nextDirection)
//       previous = next
//       shape.push(next)

//     } while (origin[0] !== next[0] || origin[1] !== next[1]) 
//   }

const getNextDirection = (
  lines: string[],
  [x, y]: [number, number],
  previousDirection: null | string
) => {
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

export {
  findEdges,
  getNextDirection,
  textToLines,
  topLeftOnly
}