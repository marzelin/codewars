import { binary32chunks,
         binary32chunksRev,
         binaryString, 
         binaryStringRev,
         decode,
         encode,
         integers,
         message,
         padRight,
         pipe,
         trimRight,
         wordsRev } from './Morse_Encoding'

describe(`binaryString`, function () {
  it(`should return binary representation of a string`, function () {
    const message = 'HELLO WORLD'
    const expected = '101010100010001011101010001011101010001110111011100000001011101110001110111011100010111010001011101010001110101'
    binaryString(message).should.equal(expected)
  })
})

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

describe(`binary32chunksRev`, function () {
  it(`should convert integers to binary nums 32 long`, function () {
    const input = [-1440552402,-1547992901,-1896993141,-1461059584, 536870912]
    const expected = [
      '10101010001000101110101000101110',
      '10100011101110111000000010111011', 
      '10001110111011100010111010001011',
      '10101000111010100000000000000000',
      '00100000000000000000000000000000'
    ]
    binary32chunksRev(input).should.deep.equal(expected)
  })
})

describe(`padRight`, function () {
  it(`should append zeroes to the end of a string if string length is less than 32`, function () {
    padRight(`1011`).should.equal(`10110000000000000000000000000000`)
  })
  it(`should return string as is if it is 32 in length`, function () {
    padRight(`10101010001000101110101000101110`).should.equal(`10101010001000101110101000101110`)
  })
})

describe(`trimRight`, function () {
  it(`should trim ending zeros`, function () {
    const input = `10110000000000000000000000000000`
    const expected = `1011`
    trimRight(input).should.equal(expected)
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

describe(`binaryStringRev`, function () {
  it(`should concatenate string and trim ending zeros`, function () {
    const input = [
      '10101010001000101110101000101110',
      '10100011101110111000000010111011', 
      '10001110111011100010111010001011',
      '10101000111010100000000000000000'
    ]
    const expected = '101010100010001011101010001011101010001110111011100000001011101110001110111011100010111010001011101010001110101'
    binaryStringRev(input).should.equal(expected)
  })
})

describe(`wordsRev`, function () {
  it(`should convert binary to a word`, function () {
    const input = '1010101000100010111010100010111010100011101110111'
    const expected = 'HELLO'
    wordsRev(input).should.equal(expected)
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

describe(`pipe`, function () {
  it(`should invoke a single function`, function () {
    const x = 1
    const f = (x: number) => x + 1
    pipe(f)(x).should.equal(2)
  })
  it(`should invoke multiple functions`, function () {
    const x = 1
    const f1 = (x: number) => x + 1
    const f2 = (x: number) => x * 2
    pipe(f1, f2)(x).should.equal(4)
  })
})