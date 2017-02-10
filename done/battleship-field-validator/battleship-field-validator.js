const checkAllRequirements = (...conditions) => (a) => conditions.every(f => f(a))

const	hasCompleteFleet = (fleet) => flatten(fleet).filter((a) => a === 1).length === 20

const noCornerTouching = (field) => 
	init(field).every((row, rowIndex) =>
  	row.every((cell, cellIndex) =>
    	cell ? areBottomCornersVacant(field, rowIndex, cellIndex) : true))
      
const allShipsStraight = (field) =>
	init(field).every((row, rowIndex) =>
  	row.every((cell, cellIndex) =>
    	cell ? isStraight(field, rowIndex, cellIndex) : true))

const hasProperNumberOfShips = (field) => {
	let shipCount = {1: 0, 2: 0, 3: 0, 4: 0}
  field.forEach((row, rowIndex) => {
  	let i = 0
    const len = row.length
    while (i < len) {
    	if (row[i]) {
      	let horizontalSize = getHorizontalSize(row, i)
        let verticalSize = getVerticalSize(field, rowIndex, i)
        if (verticalSize) { shipCount = updateShipCount(shipCount, horizontalSize, verticalSize) }
        i = i + horizontalSize
      } else { i++ }
    }
  })
  return shipCount[1] === 4 &&
  			 shipCount[2] === 3 &&
         shipCount[3] === 2 &&
         shipCount[4] === 1
}

const getHorizontalSize = (row, i) => {
	let size = 1
  while (row[++i]) { size++ }
  return size
}

const getVerticalSize = (field, rowIndex, colIndex) => {
	if (rowIndex && field[rowIndex - 1][colIndex]) { return 0 }
  let size = 1
  let len = field.length
  while (++rowIndex < len && field[rowIndex][colIndex]) { size++ }
  return size 
}

const updateShipCount = (shipCount, horizontalSize, verticalSize) => {
	const shipSize = Math.max(horizontalSize, verticalSize)
	return Object.assign({}, shipCount, { [shipSize]: shipCount[shipSize] + 1 })
}

const validateBattlefield = checkAllRequirements(
		hasCompleteFleet,
    noCornerTouching,
    allShipsStraight,
    hasProperNumberOfShips)

const isValid = (state = { checked: {}, fleet: {}}) => (row, rowIndex, field) => row.every((cell, cellIndex) => {  })

const flatten = (arr) => arr.reduce((flattened, current) => flattened.concat(current))

const init = (arr) => arr.slice(0, arr.length - 1)

const areBottomCornersVacant = (field, x, y) => !(field[x + 1][y-1] || field[x + 1][y + 1])
const isStraight = (field, x, y) =>  !(field[x + 1][y-1] && field[x + 1][y + 1])