const pieces = (piecesCorners: number[][][]) => piecesCorners.map(piece)

const piece = (corners: number[][]) => {
  let [maxX, maxY] = corners
    .reduce( ([maxX, maxY], [x, y]) => [Math.max(maxX, x), Math.max(maxY, y)])
  let piece = []
  for (let i = 0; i <= maxY; i++) { piece.push( ' '.repeat(maxX) ) }
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
  [x1, y1]: number[],
  [x2, y2]: number[],
  piece: string[]
) => {
  piece = [...piece]
  piece[y2]= substitute(piece[y2], '+', x2)
  if (y1 !== y2) {
    for (let i = Math.min(y1, y2) + 1, l = Math.max(y1, y2); i < l; i++) {
      piece[i] = substitute(piece[i], '|', x1)
    }
  } else {
    for (let i = Math.min(x1, x2) + 1, l = Math.max(x1, x2); i < l; i++) {
      piece[y1] = substitute(piece[y1], '-', i)
    }
  }
  return piece
}

const substitute = (s: string, ch: string, i: number) => s.slice(0, i) + ch + s.slice(i + 1)

export {
  pieces
}