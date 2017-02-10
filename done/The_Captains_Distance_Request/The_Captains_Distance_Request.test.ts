import {
  calculateDistance,
  coordToParts,
  haversine,
  positionToCoords,
  positionToRads,
  roundToTens,
  sexagesimalToDecimal,
  toRad
} from './The_Captains_Distance_Request'

describe('coordToParts', function () {
  it('should break latitude or longitude up into parts: [degrees, minutes, seconds, hemisphere]', function () {
    const coords = [
      '48° 12′ 30″ N',
      '16° 22′ 23″ E',
      '23° 33′ 0″ S' 
    ]
    const expected = [
      [48, 12, 30, 'N'],
      [16, 22, 23, 'E'],
      [23, 33, 0, 'S']
    ]

    for (let i = 0, l = coords.length; i < l; i++) {
      coordToParts(coords[0])
        .should.deep.equal(expected[0])
    }
  })
})

describe('positionToCoords', function () {
  it('should break coordinates up to latitude and longitute: [latitude, longitude]', function () {
    const coord1 = '48° 12′ 30″ N, 16° 22′ 23″ E'
    const expected1 = ['48° 12′ 30″ N', '16° 22′ 23″ E']

    positionToCoords(coord1).should.deep.equal(expected1)

    const coord2 = '23° 33′ 0″ S, 46° 38′ 0″ W'
    const expected2 = ['23° 33′ 0″ S', '46° 38′ 0″ W']

    positionToCoords(coord2).should.deep.equal(expected2)
  })
})

describe('sexagesimalToDecimal', function () {
  it('should convert sexagesimal notation [degrees, minutes, seconds, hemisphere]' +
     'to decimal notation', function () {
    const sexagesimals = [
      '48° 12′ 30″ N',
      '16° 22′ 23″ E',
      '23° 33′ 0″ S' 
    ]
    const expected = [
      48.208333333333336,
      16.373055555555556,
      -23.55
    ]

    for (let i = 0, l = sexagesimals.length; i < l; i++) {
      sexagesimalToDecimal(sexagesimals[i]).should.equal(expected[i])
    }
  })
})

describe('positionToRads', function () {
  it('should return latitude and longitude in degrees' +
     'for a given geographical position', function () {
    const position = '48° 12′ 30″ N, 16° 22′ 23″ E'
    const position2 = '23° 33′ 0″ S, 46° 38′ 0″ W'
    const expected = [
      0.8413941435655998,
      0.2857637280563938,
    ]

    const expected2 = [
      -0.41102503884466457,
      -0.813905207846689
    ]

    positionToRads(position).should.deep.equal(expected)
    positionToRads(position2).should.deep.equal(expected2)
  })
})

describe('toRad', function () {
  it('should convert degrees to radians', function () {
    toRad(180).should.equal(3.141592653589793)
  })
})

describe('roundToTens', function () {
  it('should round (to lower part) number to tens position', function () {
    roundToTens(10138.810979551203).should.equal(10130)
  })
})

describe('haversine', function () {
  it('should calculate distance between two positions' +
     'using haversine formula', function () {
    const lat1 = 0.8413941435655998
    const lon1 = 0.2857637280563938
    const lat2 = -0.41102503884466457
    const lon2 = -0.813905207846689

    haversine(lat1, lon1, lat2, lon2).should.equal(10138.810979551203)
  })
})

describe('calculateDistance', function () {
  it('should return the distance in km between' +
     'two geographical positions', function () {
      const position1 = '48° 12′ 30″ N, 16° 22′ 23″ E'
      const position2 = '23° 33′ 0″ S, 46° 38′ 0″ W'
      const position3 = '58° 18′ 0″ N, 134° 25′ 0″ W'
      const expected = 10130
      const expected2 = 0
      const expected3 = 7870

      calculateDistance(position1, position2).should.equal(expected)
      calculateDistance(position1, position1).should.equal(expected2)
      calculateDistance(position1, position3).should.equal(expected3)
  })
})