import { charToBinary as dictionary } from './dictionaries'
import { padRight, pipe, translate } from './utils'

/**
 * slices binary string into 32-char long chunks
 */
const binary32chunks = (binaryString: string) => {
  const chunks: string[] = []
  // slice string into 32-chars long chunks
  for (let i = 0, len = binaryString.length; i < len; i += 32) {
    chunks.push(binaryString.slice(i, 32 + i))
  }
  // if last piece is less than 32-char long,
  // fill missing places with zeros
  chunks.push(
    padRight( chunks.pop() as string ) 
  )
  return chunks
}

/**
 * encodes a message into a string of 1's and 0'separated
 * where each word is translated accordingly
 * and separated by '0000000'
 */
const binaryString = (message: string) =>
  message
    .split(' ')
    .map(words)
    .join('0000000')

/**
 * converts 32-digit long binary number
 * (in string format) to big-endian integer
 */
const integers = (binary32chunks: string[]) => 
  binary32chunks.map(
    // `number >> 0` converts a positive number into signed 32-bit integer
    // [Sign-propagating right shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#Right_shift)
    (chunk) => parseInt(chunk, 2) >> 0
  )

/**
 * encodes a word into a string of 0's and 1's
 * where consecutive characters are converted
 * according to dictionary and separated with '000'
 */
const words = (word: string) =>
  word
    .split('')
    .map(translate(dictionary), '')
    .join('000')

/**
 * encodes given message to an array of integers
 * created from binary representation of morse symbols
 */
const encode: (message: string) => number[] =
  pipe(binaryString,
       binary32chunks,
       integers)

export {
  encode as default,
  binary32chunks,
  binaryString,
  encode,
  integers,
  words,
}