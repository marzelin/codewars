import { always,
         append,
         both,
         converge,
         equals,
         flip,
         identity,
         ifElse,
         init,
         isNil,
         map,
         pipe,
         reject,
         when } from 'ramda'

const piecesCorners = (grid: string[]) =>
  pipe(
    map(pieceCorners(grid)),
    reject(isNil)
  )

const pieceCorners = (grid: string[]) => (origin: number[]) =>
  ( function loop(corners: number[][], previousDirection: string, previousCorner: number[]): number[][] {
    return pipe(
      nextDirection,
      ifElse(
        isOutside(grid, previousDirection, previousCorner),
        always(null),
        (nextDirection) => pipe(
          nextCorner(grid, previousCorner),
          ifElse(
            isOrigin(origin), flip(append)(corners),
            converge(loop, [
              flip(append)(when<number[][], number[][]>(() => equals(previousDirection, nextDirection), init, corners)),
              always(nextDirection),
              identity
            ]) as (nextCorner: number[]) => number[][]
          )
        )(nextDirection)
      )
    )(previousDirection, previousCorner, grid)

  })([origin], 'N', origin)


const nextDirection = (previousDirection: string, [x, y]: number[], grid: string[]) => {
  switch (previousDirection) {
    case 'N':
      if (grid[y][x + 1] === '-') { return 'E'}
    case 'W':
      if (grid[y - 1] && grid[y - 1][x] === '|') { return 'N'}
    case 'S':
      if (grid[y][x - 1] === '-') { return 'W'}
    case 'E':
      if (grid[y + 1] && grid[y + 1][x] === '|') { return 'S'}
      if (grid[y][x + 1] === '-') { return 'E'}
      if (grid[y - 1] && grid[y - 1][x] === '|') { return 'N'}
    default: throw new Error('direction unknown')
  }
}

const isOutside = (grid: string[], previousDirection: string, [x, y]: number[]) =>
  both(
    equals('N'),
    () => equals('E', previousDirection)
          && isNil(grid[y][x])
  )

const nextCorner = (grid: string[], [x, y]: number[]) => (direction: string) => {
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
    y += verticalStep
    x += horizontalStep
  } while (grid[y][x] !== '+')
  return [x, y]
}

const isOrigin = (origin: number[]) => (corner: number[]) =>
  equals(origin[0], corner[0]) && equals(origin[1], corner[1])

export {
  pieceCorners,
  piecesCorners
}