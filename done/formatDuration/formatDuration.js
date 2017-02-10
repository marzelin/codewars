const units = [
  { name: 'second', max: 60, seconds: 1 },
  { name: 'minute', max: 60, seconds: 60 },
  { name: 'hour', max: 24, seconds: 60 * 60 },
  { name: 'day', max: 365, seconds: 60 * 60 * 24 },
  { name: 'year', max: Infinity, seconds: 60 * 60 * 24 * 365 },
]

const div = (a, b) => a / b | 0

const count = (time) => ({ name, max, seconds }) =>
  ({ 
    name,
    count: div(time, seconds) % max
  })

const omitCountZero = ({ count }) => count

const sIfMany = (n) => n > 1 ? 's' : ''

const maybePlural = ({ name, count }) =>
  ({
    name: name + sIfMany(count),
    count
  })

const commaOrAnd = n => n > 1 ? ',' : ' and'

const separatorIfNotFirst = n => n && commaOrAnd(n)

const maybeSeparator = (o, i) => Object.assign({}, o, {
  separator: separatorIfNotFirst(i) || ''
})


const stringify = ({name, count, separator}, i) => `${count} ${name}${separator}`

const formatDuration = (time) => !time
  ? 'now'
  : units.map(count(time))
         .filter(omitCountZero)
         .map(maybePlural)
         .map(maybeSeparator)
         .map(stringify)
         .reverse()
         .join(' ')


console.log(formatDuration(12434))