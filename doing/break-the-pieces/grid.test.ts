import { grid } from './grid'

describe('grid', function () {
  it('should break a shape stored in a text form ' +
     'into a grid where each symbol has 2d coordinates', function () {
    const input = 
      "+------------+\n" +
      "|            |\n" +
      "|            |\n" +
      "|            |\n" +
      "+------+-----+\n" +
      "|      |     |\n" +
      "|      |     |\n" +
      "+------+-----+"

    const expected = 
      ["+------------+",
      "|            |",
      "|            |",
      "|            |",
      "+------+-----+",
      "|      |     |",
      "|      |     |",
      "+------+-----+"]
    
    grid(input).should.deep.equal(expected)
  })

})