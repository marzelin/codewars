/* tslint:disable:no-magic-numbers */
import {add, anyIsNaN, appendZeros, intNFr, invk, pipe} from './add'

describe('invk', function () {
  it('should invkoke a method on an object with provided args', function () {
    const add1 = (x: number) => x + 1
    invk('map', add1)([1, 2, 3]).should.deep.equal([2, 3, 4])

    const sum = (acc: number, x: number) => acc + x
    invk('reduce', sum, 0)([1, 2, 3]).should.equal(6)
  })
})

describe('pipe', function () {
  it('should execute a secquence of functions on an object', function () {
    pipe((x: number) => x + 1, (x: number) => x * 2)(2).should.equal(6)
  })
})

describe('anyIsNaN', function () {
  it('should return true if any of the passed arguments cannot' +
     'be coerced to a number', function () {
       anyIsNaN(0, 1, 'a').should.be.true
     })
})

describe('IntNFrac', function () {
  it('should convert "number" to integer and fractional part', function () {
    intNFr('1').should.deep.equal(['1', '0'])
    intNFr('1.005').should.deep.equal(['1', '005'])
  })
})

describe('appendZeros', function () {
  it('should add given number of zeros to the end of a string', function () {
    appendZeros(5)('five').should.equal('five0')
  })
})

describe('add', function () {
  it(`should return NaN if any arg is not a number or a string ` +
     `that can be converted to a number`, function () {
       add('1', 'two').should.be.NaN
       add(1, 'abc').should.be.NaN
       add(1, 0).should.not.be.NaN
       add('2.33', '2').should.not.be.NaN
     })
  it('should calculate properly', function () {
    add('1', '2', '3').should.equal('6')
    add('.5', 2.33).should.equal('2.83')
    add('1.003', '1.005').should.equal('2.008')
    add('1.003', '1.015').should.equal('2.018')
    add("1234567890.0987654321", "8765432109.9012345678").should.equal("9999999999.9999999999")
    add(.2, .3).should.equal('0.5')
  })
})