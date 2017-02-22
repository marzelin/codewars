import {
  binary32chunks,
  binaryString,
  encode,
  integers,
  words,
} from './encode'

describe(`binary32chunks`, function () {
  it(`should chunk string into chunks of 32 characters`, function () {
    const input = '101010100010001011101010001011101010001110111011100000001011101110001110111011100010111010001011101010001110101'
    const expected = [
      '10101010001000101110101000101110',
      '10100011101110111000000010111011', 
      '10001110111011100010111010001011',
      '10101000111010100000000000000000'
    ]
    binary32chunks(input).should.deep.equal(expected)
  })
})

describe(`binaryString`, function () {
  it(`should return binary representation of a string`, function () {
    const message = 'HELLO WORLD'
    const expected = '101010100010001011101010001011101010001110111011100000001011101110001110111011100010111010001011101010001110101'
    binaryString(message).should.equal(expected)
  })
})

describe(`encode`, function () {
  it(`should encode a message`, function () {
    const message = 'HELLO WORLD'
    const expected = [-1440552402,-1547992901,-1896993141,-1461059584]
    encode(message).should.deep.equal(expected)
  })
  it(`should encode tricky message`, function () {
    const message = 'EEEEEEEIE'
    const expected = [-2004318070,536870912]
    encode(message).should.deep.equal(expected)
  })
})

describe(`integers`, function () {
  it(`should convert 32-bit binary string to integer in big endian format`, function () {
    const input = [
      '10101010001000101110101000101110',
      '10100011101110111000000010111011', 
      '10001110111011100010111010001011',
      '10101000111010100000000000000000'
    ]
    const expected = [-1440552402,-1547992901,-1896993141,-1461059584]
    integers(input).should.deep.equal(expected)
  })
})

describe(`words`, function () {
  it(`should encode a word into a binary representation`, function () {
    const word = 'HELLO'
    const expected = '1010101000100010111010100010111010100011101110111'
    words(word).should.equal(expected)
  })
})