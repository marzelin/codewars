import { both,
         equals,
         filter,
         isNil,
         not } from 'ramda'

const piecesOriginPoints = (grid: string[]) =>
  filter(both(
    hasRightEdge(grid),
    hasBottomEdge(grid)
  ))

const hasRightEdge = (grid: string[]) => ([x, y]: number[]) =>
  equals('-', grid[y][x + 1])

const hasBottomEdge = (grid: string[]) => ([x, y]: number[]) =>
    not(isNil(grid[y + 1]))
    && equals('|', grid[y + 1][x])

export {
  hasBottomEdge,
  hasRightEdge,
  piecesOriginPoints
}