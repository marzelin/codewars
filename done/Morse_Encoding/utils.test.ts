import {
  padLeft,
  padRight,
  pipe,
  translate,
  trimRight
} from './utils'

describe(`padLeft`, function () {
  it(`should prepend zeros to a string to make it 32 chars long`, function () {
    const input = '1111011111'
    const expected = '0000000000' + '0000000000' + '00' + '1111011111'
    padLeft(input).should.equal(expected)
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

describe(`translate`, function () {
  it(`should convert a given string using provided dictionary`, function () {
    const dictionary = {
      'a': '1',
      'b': '101'
    }
    const input = 'a'
    const expected = '1'
    translate(dictionary)(input).should.equal(expected)
  })
})

describe(`trimRight`, function () {
  it(`should trim ending zeros`, function () {
    const input = `10110000000000000000000000000000`
    const expected = `1011`
    trimRight(input).should.equal(expected)
  })
})
