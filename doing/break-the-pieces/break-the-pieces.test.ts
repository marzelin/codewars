import {
  findEdges,
  getNextDirection,
  getNextEdge,
  isOuter,
  numberTuple,
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