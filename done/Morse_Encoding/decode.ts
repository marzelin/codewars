import { binaryToChar as dictionary } from './dictionaries'
import { padLeft, pipe, translate, trimRight } from './utils'

/**
 * converts encoded 32-bit signed integers
 * into unsigned binary representation
 */
const binary32chunks = (integers: number[]) =>
  integers
    // `integer >>> 0` converts signed integer into unsigned counterpart
    // [Zero-fill right shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Unsigned_right_shift)
    .map( (integer) => padLeft((integer >>> 0).toString(2) ))

/**
 * combines strings into a single one
 * and removes ending zeros
 */
const binaryString = (chunks: string[]) =>
  trimRight(
    chunks.join('')
  )

/**
 * decodes a string of 1's and 0's into
 * a readable message
 */
const message = (binaryString: string) =>
  binaryString
    .split('0000000')
    .map(words)
    .join(' ')

/**
 * decodes a word using a given dictionary
 */
const words = (binaryWord: string) =>
  binaryWord
    .split('000')
    .map(translate(dictionary))
    .join('')

/**
 * decodes a message from an array
 * of 32-bit signed numbers
 */
const decode: (integers: number[]) => string =
  pipe(
    binary32chunks,
    binaryString,
    message
  )

export {
  decode as default,
  binary32chunks,
  binaryString,
  decode,
  message,
  words
}