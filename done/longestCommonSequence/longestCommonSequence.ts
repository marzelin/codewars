/*******************************

Write a function called LCS that accepts two sequences, and returns the longest subsequence common to the passed in sequences.

Subsequence

A subsequence is different from a substring. The terms of a subsequence need not be consecutive terms of the original sequence.

Example subsequence

Subsequences of "abc" = "a", "b", "c", "ab", "ac", "bc"

LCS examples

LCS( "abcdef" , "abc" ) => returns "abc"
LCS( "abcdef" , "acf" ) => returns "acf"
LCS( "132535365" , "123456789" ) => returns "12356"
Notes

Both arguments will be strings
Return value must be a string
Return an empty string if there exists no common subsequence
Both arguments will have one or more characters (in JavaScript)
All tests will only have a single longest common subsequence. Don't worry about cases such as LCS( "1234", "3412" ), which would have two possible longest common subsequences: "12" and "34".
Note that the Haskell variant will use randomized testing, but any longest common subsequence will be valid.

Tips

Wikipedia has an explanation of the two properties that can be used to solve the problem:

First property
Second property

*********************************/

const isEmpty = (s: string) => !Boolean(s.length)
const longest = (a: string, b: string) =>
  a.length >= b.length
  ? a
  : b

const tail = (s: string) => s.slice(1)
const head = (s: string) => s[0] ? s[0] : ''

const LCS = (a: string, b: string): string =>
  [a, b].some(isEmpty)
  ? ''
  : head(a) === head(b)
    ? head(a) + LCS(tail(a), tail(b))
    : longest(LCS(tail(a), b),
              LCS(a, tail(b)))

console.log(LCS('abcde', 'bcd'))

/***** Tests */
import * as assert from 'assert'
// isEmpty
assert.equal(isEmpty(''), true)
assert.equal(isEmpty('abc'), false)
// longest
assert.equal(longest('', 'a'), 'a')
assert.equal(longest('abst', 'a'), 'abst')
// tail
assert.equal(tail(''), '')
assert.equal(tail('abc'), 'bc')
// head
assert.equal(head(''), '')
assert.equal(head('bcd'), 'b')
