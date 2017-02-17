import { piecesCorners } from './piecesCorners'

describe('piecesCorners', function () {
  it('should return all corners of a shape', function () {
    const grid = 
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------+-----+",
      "|      |     |",
      "|      |     |",
      "+------+-----+"]


    const piecesOriginPoints = [[0, 0], [0, 4], [7, 4]]

    const expected = [
      [[0, 0], [13, 0], [13, 4], [0, 4], [0, 0]],
      [[0, 0], [7, 0], [7, 3], [0, 3], [0, 0]],
      [[0, 0], [6, 0], [6, 3], [0, 3], [0, 0]]
    ]

    piecesCorners(grid)(piecesOriginPoints).should.deep.equal(expected)
  })
})