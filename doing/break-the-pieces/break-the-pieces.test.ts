import {
  breakPieces,
  drawEdge,
  drawPiece,
  findCorners,
  getAllCorners,
  getNextCorner,
  getNextDirection,
  isOuter,
  normalizeCorners,
  position,
  substitute,
  textToLines,
  topLeftOnly
} from './break-the-pieces'

describe('breakPieces', function () {
  it('should break a shape into pieces', function () {
    const input = 
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------+-----+",
      "|      |     |",
      "|      |     |",
      "+------+-----+"].join(`\n`)

    const expected = [
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------------+"].join(`\n`),
      ["+------+",
      "|      |",
      "|      |",
      "+------+"].join("\n"),
      ["+-----+",
      "|     |",
      "|     |",
      "+-----+"].join("\n")
    ]

    breakPieces(input).sort().should.deep.equal(expected.sort())
  })
})

describe('textToLines', function () {
    it('should break a string into an array of string lines', function () {
      const input = 
        ["+------------+",
        "|            |",
        "|            |",
        "|            |",
        "+------+-----+",
        "|      |     |",
        "|      |     |",
        "+------+-----+"].join(`\n`)
      const expected = 
        ["+------------+",
        "|            |",
        "|            |",
        "|            |",
        "+------+-----+",
        "|      |     |",
        "|      |     |",
        "+------+-----+"]
    textToLines(input).should.deep.equal(expected)
  })
})

describe('findCorners', function () {
  it('should find corners', function () {
    const input = 
      ["+-----+",
      "|     |",
      "|     |",
      "+-----+"]
    const expected = [[0, 0], [0, 6], [3, 0], [3, 6]]
    
    findCorners(input).should.deep.equal(expected)
  })
})

describe('topRightOnly', function () {
  it('should return only top left corners', function () {
    const corners: position[] = [[0, 0], [0, 6], [3, 0], [3, 6]]
    const lines =
      ["+-----+",
      "|     |",
      "|     |",
      "+-----+"]
    const expected = [[0, 0]]

    topLeftOnly(corners, lines).should.deep.equal(expected)
  })
})

describe('getNextDirection', function () {
  it(`should return 'E' as the next direction if first corner`, function () {
    const lines =
      ["+-----+",
      "|     |",
      "|     |",
      "+-----+"]
    const previous: position = [0, 0]
    const previousDirection = null
    ;(getNextDirection(lines, previous, previousDirection) as any).should.equal('E')
  })
  it(`should return 'S' if the previous direction was 'E', and it can go there`, function () {
    const lines =
      ["+-----+",
      "|     |",
      "|     |",
      "+-----+"]
    const previous: position = [0, 6]
    const previousDirection = 'E'
    ;(getNextDirection(lines, previous, previousDirection) as any).should.equal('S')
  })
  it(`should return 'N' if the previous direction was 'N', and it cannot go 'E' and can go there`, function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const previous: position = [2, 0]
    const previousDirection = 'N'
    ;(getNextDirection(lines, previous, previousDirection) as any).should.equal('N')
  })
})

describe('isOuter', function () {
  it('should return true if a point is at the end of a line', function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const point: position = [0, 6]
    isOuter(lines, point).should.be.true
  })
  it('should return false if a point is not at the end of a line', function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const point: position = [2, 0]
    isOuter(lines, point).should.be.false
  })
})

describe('getNextCorner', function () {
  it('should get next corner on the right' , function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: position = [0, 0]
    const direction = 'E'
    getNextCorner(lines, origin, direction).should.deep.equal([0, 6])
  })
  it('should get next edge on the left' , function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: position = [4, 6]
    const direction = 'W'
    getNextCorner(lines, origin, direction).should.deep.equal([4, 0])
  })
  it('should get next edge above' , function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: position = [4, 0]
    const direction = 'N'
    getNextCorner(lines, origin, direction).should.deep.equal([2, 0])
  })
  it('should get next edge below' , function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: position = [0, 6]
    const direction = 'S'
    getNextCorner(lines, origin, direction).should.deep.equal([4, 6])
  })
})

describe('getAllCorners', function () {
  it('should get all corners of a piece', function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: position = [0, 0]
    const pieceCorners = [[0, 0], [0, 6], [4, 6], [4, 0], [0, 0]]
    const usedOrigins: never[] = []
    getAllCorners(lines)(origin).should.deep.equal({pieceCorners, usedOrigins})
  })
  it('should return null if it\'s outer shape', function () {
    const lines =
     ["+-----+",
      "|     |",
      "+  +--+",
      "|  |   ",
      "+--+   "]
    const origin: position = [2, 3]
    getAllCorners(lines)(origin).should.deep.equal({pieceCorners: null, usedOrigins: []})
  })
  it('should return used edge', function () {
    const lines =
     ["+--+--+",
      "|  |  |",
      "+--+  |",
      "|     |",
      "+--+--+"]
    const origin: position = [0, 3]
    const pieceCorners = [[0, 3], [0, 6], [4, 6], [4, 0], [2, 0], [2, 3], [0, 3]]
    const usedOrigins = [[2, 0]]
    getAllCorners(lines)(origin).should.deep.equal({pieceCorners, usedOrigins})
  })
})

describe('normalizeCorners', function () {
  it('should normalize corners', function () {
    const corners: position[] = [[1, 3], [1, 6], [4, 6], [4, 3], [1, 3]]
    const expected = [[0, 0], [0, 3], [3, 3], [3, 0], [0, 0]]
    normalizeCorners(corners).should.deep.equal(expected)
  })
})

describe('drawEdge', function () {
  it('should draw a line between two points', function () {
    const start: position = [0, 0]
    const end: position = [0, 3]
    const piece = ['   ']
    const expected = [' --+'] 
    drawEdge(start, end, piece).should.deep.equal(expected)
  })
})

describe('drawPiece', function () {
  it('should draw piece from given edges', function () {
    const edges: position[] = [[0, 0], [0, 3], [3, 3], [3, 0], [0, 0]]
    const expected = 
     ["+--+",
      "|  |",
      "|  |",
      "+--+"].join('\n')
    drawPiece(edges).should.equal(expected)
  })
})

describe('substitute', function () {
  it('should substitute character in a string at a given position', function () {
    substitute('star', 'e', 2).should.equal('ster')
  })
})