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

const topRightOnly = (edges: number[][], lines: string[]) =>
  edges.filter( ([x, y]) =>
  
                            lines[x][y + 1] === '-'
                            && lines[x + 1]
                            && lines[x + 1][y] === '|')

const textToLines = (s: string) => s.split(`\n`)


export {
  findEdges,
  textToLines,
  topRightOnly
}