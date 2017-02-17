import { pieces } from './pieces'

describe('pieces', function () {
  it('should return pieces given corners', function () {
    const input = [
      [[0, 0], [13, 0], [13, 4], [0, 4], [0, 0]],
      [[0, 0], [7, 0], [7, 3], [0, 3], [0, 0]],
      [[0, 0], [6, 0], [6, 3], [0, 3], [0, 0]]
    ]

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

    pieces(input).should.deep.equal(expected)
  })
})