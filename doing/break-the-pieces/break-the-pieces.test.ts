import {
  findEdges,
  textToLines,
  topRightOnly
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

    topRightOnly(edges, lines).should.deep.equal(expected)
  })
})