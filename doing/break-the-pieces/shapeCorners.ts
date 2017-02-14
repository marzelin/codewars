import { addIndex,
         append,
         chain,
         equals,
         pair,
         reduce,
         when } from 'ramda'

const chainIndexed = addIndex(chain)
const reduceIndexed = addIndex(reduce)

const shapeCorners = chainIndexed( (xs, y) =>
  reduceIndexed( (corners, val, x) =>
    when( () => equals('+', val),
          append(pair(x, y))
    )(corners)
  )([], xs)
)

export {
  shapeCorners
}