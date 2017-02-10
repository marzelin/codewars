import {
  drawEdge,
  drawPiece,
  findEdges,
  getAllEdges,
  getNextDirection,
  getNextEdge,
  isOuter,
  normalizeEdges,
  numberTuple,
  substitute,
  textToLines,
  topLeftOnly
} from './break-the-pieces'

xdescribe('breakPieces', function () {
  it('should break a shape into pieces', function () {
  //   const input = 
  //     ["+------------+",
  //     "|            |",
  //     "|            |",
  //     "|            |",
  //     "+------+-----+",
  //     "|      |     |",
  //     "|      |     |",
  //     "+------+-----+"].join(`\n`)

  //   const expected = [
  //     ["+------------+",
  //     "|            |",
  //     "|            |",
  //     "|            |",
  //     "+------------+"].join(`\n`),
  //     ["+------+",
  //     "|      |",
  //     "|      |",
  //     "+------+"].join("\n"),
  //     ["+-----+",
  //     "|     |",
  //     "|     |",
  //     "+-----+"].join("\n")
  //   ]

  //   // breakPieces(input).sort().should.equal(expected.sort())
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

describe('findEdges', function () {
  it('should find edges', function () {
    const input = 
      ["+-----+",
      "|     |",
      "|     |",
      "+-----+"]
    const expected = [[0, 0], [0, 6], [3, 0], [3, 6]]
    
    findEdges(input).should.deep.equal(expected)
  })
})

describe('topRightOnly', function () {
  it('should return only top left edges', function () {
    const edges = [[0, 0], [0, 6], [3, 0], [3, 6]]
    const lines =
      ["+-----+",
      "|     |",
      "|     |",
      "+-----+"]
    const expected = [[0, 0]]

    topLeftOnly(edges, lines).should.deep.equal(expected)
  })
})

describe('getNextDirection', function () {
  it(`should return 'E' as the next direction if first edge`, function () {
    const lines =
      ["+-----+",
      "|     |",
      "|     |",
      "+-----+"]
    const previous: numberTuple = [0, 0]
    const previousDirection = null
    ;(getNextDirection(lines, previous, previousDirection) as any).should.equal('E')
  })
  it(`should return 'S' if the previous direction was 'E', and it can go there`, function () {
    const lines =
      ["+-----+",
      "|     |",
      "|     |",
      "+-----+"]
    const previous: numberTuple = [0, 6]
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
    const previous: numberTuple = [2, 0]
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
    const point: numberTuple = [0, 6]
    isOuter(lines, point).should.be.true
  })
  it('should return false if a point is not at the end of a line', function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const point: numberTuple = [2, 0]
    isOuter(lines, point).should.be.false
  })
})

describe('getNextEdge', function () {
  it('should get next edge on the right' , function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: numberTuple = [0, 0]
    const direction = 'E'
    getNextEdge(lines, origin, direction).should.deep.equal([0, 6])
  })
  it('should get next edge on the left' , function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: numberTuple = [4, 6]
    const direction = 'W'
    getNextEdge(lines, origin, direction).should.deep.equal([4, 0])
  })
  it('should get next edge above' , function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: numberTuple = [4, 0]
    const direction = 'N'
    getNextEdge(lines, origin, direction).should.deep.equal([2, 0])
  })
  it('should get next edge below' , function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: numberTuple = [0, 6]
    const direction = 'S'
    getNextEdge(lines, origin, direction).should.deep.equal([4, 6])
  })
})

describe('getAllEdges', function () {
  it('should get all edges of a piece', function () {
    const lines =
      ["+-----+",
      "|     |",
      "+     |",
      "|     |",
      "+-----+"]
    const origin: numberTuple = [0, 0]
    const allEdges = [[0, 0], [0, 6], [4, 6], [4, 0], [2, 0], [0, 0]]
    const usedOriginEdges: never[] = []
    getAllEdges(lines)(origin).should.deep.equal([allEdges, usedOriginEdges])
  })
  it('should return null if it\'s outer shape', function () {
    const lines =
     ["+-----+",
      "|     |",
      "+  +--+",
      "|  |   ",
      "+--+   "]
    const origin: numberTuple = [2, 3]
    getAllEdges(lines)(origin).should.deep.equal([null, []])
  })
  it('should return used edge', function () {
    const lines =
     ["+--+--+",
      "|  |  |",
      "+--+  |",
      "|     |",
      "+--+--+"]
    const origin: numberTuple = [0, 3]
    const allEdges = [[0, 3], [0, 6], [4, 6], [4, 3], [4, 0], [2, 0], [2, 3], [0, 3]]
    const usedOriginEdges = [[2, 0]]
    getAllEdges(lines)(origin).should.deep.equal([allEdges, usedOriginEdges])
  })
})

describe('normalizeEdges', function () {
  it('should normalize edges', function () {
    const edges: numberTuple[] = [[1, 3], [1, 6], [4, 6], [4, 3], [1, 3]]
    const expected = [[0, 0], [0, 3], [3, 3], [3, 0], [0, 0]]
    normalizeEdges(edges).should.deep.equal(expected)
  })
})

describe('drawEdge', function () {
  it('should draw a line between two points', function () {
    const start: numberTuple = [0, 0]
    const end: numberTuple = [0, 3]
    const piece = ['   ']
    const expected = [' --+'] 
    drawEdge(start, end, piece).should.deep.equal(expected)
  })
})

describe('drawPiece', function () {
  it('should draw piece from given edges', function () {
    const edges: numberTuple[] = [[0, 0], [0, 3], [3, 3], [3, 0], [0, 0]]
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