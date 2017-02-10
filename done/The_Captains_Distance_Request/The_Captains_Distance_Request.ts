/**
 * takes coordinates (latitude or longitude)
 * like: 48° 12′ 30″ N and breaks it into parts:
 * [degrees, minutes, seconds, hemisphere]
 * 
 * @param {string} coord
 * @returns {[number, number, number, string]} [degrees, minutes, seconds, hemisphere]
 */
const coordToParts = (coord: string): [number, number, number, string] => {
  const parts = coord.split(' ')
  const numParts = parts
      .slice(0, 3)
      // cut out symbols like °, ′, ″ placed at the end
      .map( (s) => s.slice(0, -1) )
      .map(Number)
  const hemisphere = parts[3]
  return [
      ...numParts,
      hemisphere
  ] as [number, number, number, string]
}

/**
 * takes position like: 48° 12′ 30″ N, 16° 22′ 23″ E
 * and returns an array [latitude, longitude]
 * 
 * @param {string} position
 * @returns {[number, number]} an array [latitude, longitude]
 */
const positionToCoords = (position: string) => position.split(', ')

/**
 * takes a coordinate in sexagesimal notation (ie. 48° 12′ 30″ N)
 * and returns corresponding number of degrees in decimal notation
 * 
 * @param {string} coord geographical coordinate in sexagesimal notation
 * @returns {number} coordinate in degrees
 */
const sexagesimalToDecimal = (coord: string) => {
  const [degrees, minutes, seconds, hemisphere] = coordToParts(coord)
  return (
    degrees +
    minutes / 60 +
    seconds / 3600) *
    (['N', 'E'].indexOf(hemisphere) >= 0 ? 1 : -1)
}

/**
 * converts degrees to radians
 * 
 * @param {number} deg number of degrees
 * @returns {number} number of radians
 */
const toRad = (deg: number) => deg * Math.PI / 180

/**
 * takes geographical position in
 * sexagesimal notation and returns
 * corresponding number in radians
 * latitude and longitude
 * 
 * @param {string} position ie. 48° 12′ 30″ N, 16° 22′ 23″ E
 * @returns {[number, number]} [latitude, longitude]
 */
const positionToRads = (position: string): [number, number] =>
  positionToCoords(position)
    .map(sexagesimalToDecimal)
    .map(toRad) as [number, number]

const calculateDistance = (position1: string, position2: string) => {
  const [lat1, lon1] = positionToRads(position1)
  const [lat2, lon2] = positionToRads(position2)

  return roundToTens(
    haversine(lat1, lon1, lat2, lon2)
  )
} 

/**
 * calculates distance between to loacations
 * using haversine formula
 * 
 * @param {number} lat1 
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @param {number} [radius=6371]
 */
const haversine = (lat1: number,
                   lon1: number,
                   lat2: number,
                   lon2: number,
                   radius = 6371) =>  
    2 * radius * Math.asin(
      Math.sqrt(
        Math.pow(
          Math.sin(
            (lat2 - lat1) / 2
          ),
          2
        ) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon2 - lon1) / 2), 2)
      )
    )

/**
 * rounds a number to tens place
 * 
 * @param {number} n number (float or integer)
 * @returns {number} rounded number
 */
const roundToTens = (n: number) => Math.floor(n / 10) * 10

export {
  coordToParts,
  calculateDistance,
  haversine,
  positionToCoords,
  positionToRads,
  roundToTens,
  sexagesimalToDecimal,
  toRad
}