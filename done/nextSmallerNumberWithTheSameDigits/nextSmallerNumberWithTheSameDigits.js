const cut = (str) => [str.slice(0, str.length - 1), str[str.length - 1]]

/**
 * replaces a character at a given position in a string
 * 
 * @param {string} str string to replace character in
 * @param {number} pos position where character should be replaced
 * @param {string} ch a character that to be placed at a given position
 * @returns {string}
 */
const replace = (str, pos, ch) => str.slice(0, pos) + ch + str.slice(pos + 1)

const getEndIfFound = (str, n) =>
    str.split('')
       .some((ch, i) => n > ch && (str = ch + replace(str, i, n)))
    && str

/**
 * 
 * 
 * @param {any} str
 */
const smallerOrNotFound = (str) => str[0] !== '0' ? parseInt(str) : -1

/**
 * 
 * 
 * @param {any} s
 * @param {any} rest
 * @returns
 */
const findSmaller = (s, rest) => {
    if (!s) { return -1 }

    const [butLast, last] = cut(s)
    const end = getEndIfFound(rest, last)

    return end
        ? smallerOrNotFound(butLast + end)
        : findSmaller(butLast, rest + last)
}

/**
 * 
 * 
 * @param {any} n
 */
const nextSmaller = n => findSmaller(String(n), '') 

console.log(nextSmaller(5))
