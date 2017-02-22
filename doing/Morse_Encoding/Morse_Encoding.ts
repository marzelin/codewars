/** Interfaces */
interface Idictionary {
  [char: string]: string
}

const encode = (message: string) =>
  pipe (binaryString,
        binary32chunks,
        integers
  )(message)

const binaryString = (message: string) =>
  message
    .split(' ')
    .map(words)
    .join('0000000')

const words = (word: string) =>
  word
    .split('')
    .map(chars(dictionary), '')
    .join('000')

const chars = (dictionary: Idictionary) => (char: string) => dictionary[char]

const binary32chunks = (binaryString: string) => {
  const chunks: string[] = []
  for (let i = 0, len = binaryString.length; i < len; i += 32) {
    chunks.push(binaryString.slice(i, 32 + i))
  }
  chunks.push(
    padRight( chunks.pop() as string ) 
  )
  return chunks
}

const integers = (binary32chunks: string[]) => 
  binary32chunks.map( (chunk: any) => parseInt(chunk, 2) >> 0)

/** decoding */
const decode = (integers: number[]) =>
pipe(
  binary32chunksRev,
  binaryStringRev,
  message
)(integers)

const binary32chunksRev = (integers: number[]) =>
  integers
    .map( (integer) => padLeft((integer >>> 0).toString(2) ))

const binaryStringRev = (chunks: string[]) =>
  trimRight(
    chunks.join('')
  )

const message = (binaryString: string) =>
  binaryString
    .split('0000000')
    .map(wordsRev)
    .join(' ')

const wordsRev = (binaryWord: string) =>
  binaryWord
    .split('000')
    .map(charsRev(dictionaryRev))
    .join('')

const charsRev = (dictionary: Idictionary) => (binaryChar: string) =>
  dictionary[binaryChar]


/** Utils */
const pipe = (...fs: Function[]) => (x: any) =>
  fs.reduce( (x, f) => f(x), x )

const padRight = (s: string) =>
  s + '0'.repeat(32 - s.length)

const padLeft = (s: string) =>
  '0'.repeat(32 - s.length) + s

const trimRight = (s: string) => s.replace(/0*$/, '')

const dictionary = {
  'A': '10111',
  'B': '111010101',
  'C': '11101011101',
  'D': '1110101',
  'E': '1',
  'F': '101011101',
  'G': '111011101',
  'H': '1010101',
  'I': '101',
  'J': '1011101110111',
  'K': '111010111',
  'L': '101110101',
  'M': '1110111',
  'N': '11101',
  'O': '11101110111',
  'P': '10111011101',
  'Q': '1110111010111',
  'R': '1011101',
  'S': '10101',
  'T': '111',
  'U': '1010111',
  'V': '101010111',
  'W': '101110111',
  'X': '11101010111',
  'Y': '1110101110111',
  'Z': '11101110101',
  '0': '1110111011101110111',
  '1': '10111011101110111',
  '2': '101011101110111',
  '3': '1010101110111',
  '4': '10101010111',
  '5': '101010101',
  '6': '11101010101',
  '7': '1110111010101',
  '8': '111011101110101',
  '9': '11101110111011101',
  '.': '10111010111010111',
  ',': '1110111010101110111',
  '?': '101011101110101',
  "'": '1011101110111011101',
  '!': '1110101110101110111',
  '/': '1110101011101',
  '(': '111010111011101',
  ')': '1110101110111010111',
  '&': '10111010101',
  ':': '11101110111010101',
  ';': '11101011101011101',
  '=': '1110101010111',
  '+': '1011101011101',
  '-': '111010101010111',
  '_': '10101110111010111',
  '"': '101110101011101',
  '$': '10101011101010111',
  '@': '10111011101011101',
  ' ': '0' // Technically is 7 0-bits, but we assume that a space will always be between two other characters
}

const dictionaryRev = {
  "0": " ",
  "1": "E",
  "101": "I",
  "111": "T",
  "10101": "S",
  "10111": "A",
  "11101": "N",
  "1010101": "H",
  "1010111": "U",
  "1011101": "R",
  "1110101": "D",
  "1110111": "M",
  "101010101": "5",
  "101010111": "V",
  "101011101": "F",
  "101110101": "L",
  "101110111": "W",
  "111010101": "B",
  "111010111": "K",
  "111011101": "G",
  "1110111011101110111": "0",
  "10111011101110111": "1",
  "101011101110111": "2",
  "1010101110111": "3",
  "10101010111": "4",
  "11101010101": "6",
  "1110111010101": "7",
  "111011101110101": "8",
  "11101110111011101": "9",
  "11101011101": "C",
  "1011101110111": "J",
  "11101110111": "O",
  "10111011101": "P",
  "1110111010111": "Q",
  "11101010111": "X",
  "1110101110111": "Y",
  "11101110101": "Z",
  "10111010111010111": ".",
  "1110111010101110111": ",",
  "101011101110101": "?",
  "1011101110111011101": "'",
  "1110101110101110111": "!",
  "1110101011101": "/",
  "111010111011101": "(",
  "1110101110111010111": ")",
  "10111010101": "&",
  "11101110111010101": ":",
  "11101011101011101": ";",
  "1110101010111": "=",
  "1011101011101": "+",
  "111010101010111": "-",
  "10101110111010111": "_",
  "101110101011101": "\"",
  "10101011101010111": "$",
  "10111011101011101": "@"
}

export {
  encode,
  integers,
  binary32chunks, 
  binary32chunksRev,
  binaryString,
  binaryStringRev,
  decode,
  message,
  padRight,
  pipe,
  trimRight,
  wordsRev
}