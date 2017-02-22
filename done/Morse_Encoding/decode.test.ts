import {
  binary32chunks,
  binaryString,
  decode,
  message,
  words
} from './decode'

describe(`binary32chunks`, function () {
  it(`should convert a 32-bit signed number into a unsigned binray representation`, function () {
    const numbers = [-1440552402, -1547992901, -1896993141, -1461059584]
    const expected = [
      '10101010001000101110101000101110',
      '10100011101110111000000010111011', 
      '10001110111011100010111010001011',
      '10101000111010100000000000000000'
    ]
    binary32chunks(numbers).should.deep.equal(expected)
  })
})

describe(`binaryString`, function () {
  it(`should concatenate string and trim ending zeros`, function () {
    const input = [
      '10101010001000101110101000101110',
      '10100011101110111000000010111011', 
      '10001110111011100010111010001011',
      '10101000111010100000000000000000'
    ]
    const expected = '101010100010001011101010001011101010001110111011100000001011101110001110111011100010111010001011101010001110101'
    binaryString(input).should.equal(expected)
  })
})

describe(`words`, function () {
  it(`should convert binary to a word`, function () {
    const input = '1010101000100010111010100010111010100011101110111'
    const expected = 'HELLO'
    words(input).should.equal(expected)
  })
})

describe(`message`, function () {
  it(`should convert binary string into a message`, function () {
    const input = '101010100010001011101010001011101010001110111011100000001011101110001110111011100010111010001011101010001110101'
    const expected = 'HELLO WORLD'
    message(input).should.equal(expected)
  })
})

describe(`decode`, function () {
  it(`should decode a message`, function () {
    const input = [-1440552402, -1547992901, -1896993141, -1461059584]
    const expected = 'HELLO WORLD'
    decode(input).should.equal(expected)
  })
  it(`should decode a tricky message`, function () {
    const input = [-2004318070,536870912]
    const expected = 'EEEEEEEIE'
    decode(input).should.equal(expected)
  })
})
