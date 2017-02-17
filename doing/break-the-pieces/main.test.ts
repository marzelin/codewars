import { breakPieces } from './main'

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
  it('should remove tailing spaces', function () {
    const input =
`+-----------------+
|                 |
|   +-------------+
|   |
|   |
|   |
|   +-------------+
|                 |
|                 |
+-----------------+`
    const expected = 
`+-----------------+
|                 |
|   +-------------+
|   |
|   |
|   |
|   +-------------+
|                 |
|                 |
+-----------------+`
    breakPieces(input).sort().should.deep.equal([expected])
  })
  it('should trim last line', function () {
    const input =
`+-------------------+--+
|                   |  |
|                   |  |
|  +----------------+  |
|  |                   |
|  |                   |
+--+-------------------+`
    const expected = [
      `                 +--+
                 |  |
                 |  |
+----------------+  |
|                   |
|                   |
+-------------------+`,
`+-------------------+
|                   |
|                   |
|  +----------------+
|  |
|  |
+--+`
    ]
    breakPieces(input).sort().should.deep.equal(expected.sort())
  })
  it('should pass generic tests', function () {
    const testPiece = (input: string, expected: string[]) => breakPieces(input).sort().should.deep.equal(expected.sort())
    const shape1 = 
 ["+------------+",
  "|            |",
  "|            |",
  "|            |",
  "+------+-----+",
  "|      |     |",
  "|      |     |",
  "+------+-----+"].join("\n")

const solution1 = [
  ["+------------+",
   "|            |",
   "|            |",
   "|            |",
   "+------------+"].join("\n"),
  ["+------+",
   "|      |",
   "|      |",
   "+------+"].join("\n"),
  ["+-----+",
   "|     |",
   "|     |",
   "+-----+"].join("\n")
]
testPiece(shape1,solution1)

const shape2 = 
   ["+-------------------+--+",
    "|                   |  |",
    "|                   |  |",
    "|  +----------------+  |",
    "|  |                   |",
    "|  |                   |",
    "+--+-------------------+"].join("\n")

const solution2 = [
  [ "                 +--+",
    "                 |  |",
    "                 |  |",
    "+----------------+  |",
    "|                   |",
    "|                   |",
    "+-------------------+"].join("\n"),
  [ "+-------------------+",
    "|                   |",
    "|                   |",
    "|  +----------------+",
    "|  |",
    "|  |",
    "+--+"].join("\n")
]

testPiece(shape2,solution2)


const shape3 = 
["           +-+             ",
 "           | |             ",
 "         +-+-+-+           ",
 "         |     |           ",
 "      +--+-----+--+        ",
 "      |           |        ",
 "   +--+-----------+--+     ",
 "   |                 |     ",
 "   +-----------------+     "].join("\n")

const solution3 = [
  [ "+-+",
    "| |",
    "+-+"].join("\n"),
  [ "+-----+",                                               
    "|     |",                                              
    "+-----+"].join("\n"),
  [ "+-----------+",                                            
    "|           |",                                            
    "+-----------+"].join("\n"),
  [ "+-----------------+",                                         
    "|                 |",                                         
    "+-----------------+"].join("\n") 
]

testPiece(shape3,solution3)

const shape4 = 
["+-----------------+",
 "|                 |",
 "|   +-------------+",
 "|   |",
 "|   |",                                              
 "|   |",                                              
 "|   +-------------+",
 "|                 |",
 "|                 |",
 "+-----------------+"].join("\n")
 
const solution4 = [
["+-----------------+",
 "|                 |",
 "|   +-------------+",
 "|   |",
 "|   |",                                              
 "|   |",                                              
 "|   +-------------+",
 "|                 |",
 "|                 |",
 "+-----------------+"].join("\n")
]

testPiece(shape4,solution4)


const shape5 = 
["+---+---+---+---+---+---+---+---+",
 "|   |   |   |   |   |   |   |   |",
 "+---+---+---+---+---+---+---+---+"].join("\n")
 
const solution5 = [
["+---+",
 "|   |",
 "+---+"].join("\n"),
 ["+---+",
 "|   |",
 "+---+"].join("\n"),
 ["+---+",
 "|   |",
 "+---+"].join("\n"),
 ["+---+",
 "|   |",
 "+---+"].join("\n"),
["+---+",
 "|   |",
 "+---+"].join("\n"),
 ["+---+",
 "|   |",
 "+---+"].join("\n"),
 ["+---+",
 "|   |",
 "+---+"].join("\n"),
 ["+---+",
 "|   |",
 "+---+"].join("\n")
]

testPiece(shape5,solution5)



const shape6 = 
["+---+------------+---+",
 "|   |            |   |",
 "+---+------------+---+",
 "|   |            |   |",
 "|   |            |   |",
 "|   |            |   |",
 "|   |            |   |",
 "+---+------------+---+",
 "|   |            |   |",
 "+---+------------+---+"].join("\n")
 
const solution6 = [
["+---+",
 "|   |",
 "+---+"].join("\n"),

["+---+",
 "|   |",
 "+---+"].join("\n"),

["+---+",
 "|   |",
 "+---+"].join("\n"),

["+---+",
 "|   |",
 "+---+"].join("\n"),

["+------------+",
 "|            |",
 "+------------+"].join("\n"),

["+------------+",
 "|            |",
 "+------------+"].join("\n"),
["+---+",
 "|   |",
 "|   |",
 "|   |",
 "|   |",
 "+---+"].join("\n"),
["+---+",
 "|   |",
 "|   |",
 "|   |",
 "|   |",
 "+---+"].join("\n"),
 
["+------------+",
 "|            |",
 "|            |",
 "|            |",
 "|            |",
 "+------------+"].join("\n")
]

testPiece(shape6,solution6)



const shape7 = 
["                 ",
 "   +-----+       ",
 "   |     |       ",
 "   |     |       ",
 "   +-----+-----+ ",
 "         |     | ",
 "         |     | ",
 "         +-----+ "].join("\n")
 
const solution7 = [
["+-----+",
 "|     |",
 "|     |",
 "+-----+"].join("\n"),
["+-----+",
 "|     |",
 "|     |",
 "+-----+"].join("\n")
]

testPiece(shape7,solution7)
  })
})
