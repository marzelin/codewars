import { shapeCorners } from './shapeCorners'

describe(`shapeCorners`, function () {
  it(`should return all corners of a given shape`, function () {
    const input =
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------+-----+",
      "|      |     |",
      "|      |     |",
      "+------+-----+"]

    const expected =  [[0,0], [13, 0], [0, 4], [7, 4], [13, 4], [0, 7], [7, 7], [13, 7]]

    shapeCorners(input).should.deep.equal(expected)
  })
})