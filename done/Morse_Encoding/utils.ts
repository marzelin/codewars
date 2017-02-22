import { Idictionary } from './dictionaries'

/**
 * adds zeros to beginning of a string
 * to make it 32 chars long
 */
const padLeft = (s: string) =>
  '0'.repeat(32 - s.length) + s

/**
 * add zeros to the end of a string
 * to make it 32 chars long
 */
const padRight = (s: string) =>
  s + '0'.repeat(32 - s.length)

/**
 * Performs left-to-right function composition.
 * The functions must be unary.
 */
const pipe = (...fs: Function[]) => (x: any) =>
  fs.reduce( (x, f) => f(x), x )

/**
 * translates a given string into
 * the representation from a provided dictionary
 */
const translate = (dictionary: Idictionary) => (term: string) => dictionary[term]

/**
 * removes trailing zeros
 */
const trimRight = (s: string) => s.replace(/0*$/, '')

export {
  padLeft,
  padRight,
  pipe,
  translate,
  trimRight
}