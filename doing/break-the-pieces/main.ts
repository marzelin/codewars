import { pipe } from 'ramda'
import { grid } from './grid'
import { pieces } from './pieces'
import { piecesCorners } from './piecesCorners'
import { piecesOriginPoints } from './piecesOriginPoints'
import { shapeCorners } from './shapeCorners'

const breakPieces = 
  pipe(
    grid,
    (grid) => pipe(
      shapeCorners,
      piecesOriginPoints(grid),
      piecesCorners(grid),
      pieces
    )(grid)
  )

export {
  breakPieces
}