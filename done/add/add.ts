/*
Write a function that returns the sum of the passed arguments.
The input arguments may be Numbers and/or String representations
of numbers. The function must return a String.

Example

  add(123, "321") === "444";
  add("1234567890.0987654321", "8765432109.9012345678") === "9999999999.9999999999";
  add("1.2.3", 1.23); === NaN;
  add(0.1, 0.0001) === "0.1001";

Notes

The input numbers may be very very big and/or very very small.
Addition must be exact - no floating point errors. The numbers
are all positive and base 10\. Some arguments may not be numbers.
In these cases, return NaN. Remove trailing zeros and decimal point if possible.
*/

type numOrStr = number | string

const anyIsNaN = (...xs: any[]) => xs.some(isNaN)

const zeroIfNil = (ss: string[]) => ['0', '0'].reduce((a, c, i) => [...a, ss[i] || c], <string[]>[])

const intNFr = (s: string) => zeroIfNil(s.split('.'))

const sum = (sum: number, x: number) => sum + x

const maxLength = (...xs: string[]) => Math.max(...xs.map((s: string) => s.length))

const appendZeros = (n: number) => (s: string) =>
  s + '0'.repeat(Math.max(0, n - s.length))

const prependZeros = (n: number) => (s: string) =>
  '0'.repeat(Math.max(0, n - s.length)) + s

const cut = (where: number) => (what: string) => [what.slice(0, what.length - where), what.slice(what.length - where)]

const addFr = (...frs: string[]) => {
  const numOfDigits = maxLength(...frs)
  return pipe(invk('map', appendZeros(numOfDigits)),
                   invk('map', Number),
                   invk('reduce', sum),
                   String,
                   prependZeros(numOfDigits),
                   cut(numOfDigits))(frs)
}

const sumIntNFr = ([intSum, frSum]: string[], [int1, fr1]: string[]) => {
      let [fInt, fr] = addFr(frSum, fr1)
      return [
        pipe(invk('map', Number),
             invk('reduce', sum),
             String)([intSum, int1, fInt]),
        fr]
} 

const combineIntNFr = ([intSum, frSum]: string[]) => {
  frSum = omitTrailingZeros(frSum)
  return intSum + (frSum ? '.' + frSum : '')
}

const omitTrailingZeros = (s: string) =>  s.split('').reduceRight((acc, x) => x === '0' && !acc ? acc : x + acc,'')

const add = (...xs: numOrStr[]) =>
  anyIsNaN(...xs)
  ? NaN
  : pipe(invk('map', String),
         invk('map', intNFr),
         invk('reduce', sumIntNFr, ['', '']),
         combineIntNFr)(xs)

const invk = (methodName: string, ...args: any[]) => (obj: any) => obj[methodName](...args)
const pipe = (...fs: Function[]) => (obj: any) => fs.reduce((o: any, f: Function) => f(o), obj)


export {
  add,
  anyIsNaN,
  appendZeros,
  invk,
  intNFr,
  pipe
}