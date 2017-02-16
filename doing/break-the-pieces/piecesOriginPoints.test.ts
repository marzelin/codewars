import { hasBottomEdge,
         hasRightEdge,
         piecesOriginPoints } from './piecesOriginPoints'

describe(`piecesOriginPoints`, function () {
  it(`should return only corners that have ` +
     `right and bottom edge`, function () {
    
    const grid = 
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------+-----+",
      "|      |     |",
      "|      |     |",
      "+------+-----+"]

    const shapeCorners = [[0,0], [13, 0], [0, 4], [7, 4], [13, 4], [0, 7], [7, 7], [13, 7]]

    const expected = [[0,0], [0, 4], [7, 4]]

    piecesOriginPoints(grid)(shapeCorners).should.deep.equal(expected)
  })
})

describe('hasBottomEdge', function () {
  it('should return true for corner that has bottom edge', function () {
    const grid = 
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------+-----+",
      "|      |     |",
      "|      |     |",
      "+------+-----+"]

    const corner = [0, 4]

    hasBottomEdge(grid)(corner).should.be.true
  })
  it('should return false for corner that has no bottom edge', function () {
    const grid = 
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------+-----+",
      "|      |     |",
      "|      |     |",
      "+------+-----+"]

    const corner = [7, 7]

    hasBottomEdge(grid)(corner).should.be.false
  })
})

describe('hasRightEdge', function () {
  it('should return true for corner that has right edge', function () {
    const grid = 
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------+-----+",
      "|      |     |",
      "|      |     |",
      "+------+-----+"]

    const corner = [7, 4]

    hasRightEdge(grid)(corner).should.be.true
  })
  it('should return false for corner that has no right edge', function () {
    const grid = 
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------+-----+",
      "|      |     |",
      "|      |     |",
      "+------+-----+"]

    const corner = [13, 7]

    hasRightEdge(grid)(corner).should.be.false
  })
})