/*********************************
# Fluent Calculator

Your task is to implement a simple calculator with fluent syntax

    var FluentCalculator = /* Magic //;

FluentCalculator should be separated in two, the **Values** and the **Operations**, one can call the other, but cannot call one of his own.

*   A **Value** can call an **Operation**, but cannot call a value

        FluentCalculator.one.plus
        FluentCalculator.one.one // undefined, if you may.

*   An **Operation** can call a **Value**, but cannont call a operation

        FluentCalculator.one.plus.two // this should have a value of 3
        FluentCalculator.one.plus.plus // If you replace 'one' with 'c', I could allow it. (undefined as well)

*   Pairs of **Value** and **Operation** should be stackable to infinity

        FluentCalculator.one.plus.two.plus.three.minus.one.minus.two.minus.four // Should be -1

*   A **Value** should resolve to a primitive integer

        FluentCalculator.one.plus.ten - 10 // Should be 1

# Now, the fun part... Rules

*   eval is disabled
*   **Values** in FluentCalculator should go from zero to ten.
*   Supported **Operations** are plus, minus, times, dividedBy
*   Rules mentioned above
    *   FluentCalculator should be stackable to infinity
    *   A **Value** can only call an **Operation**
    *   An **Operation** can only call a **Value**
    *   A **Value** should be resolvable to a primitive integer, if needed as such


***********************************************/

const nums = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 }
const ops = {
  'plus': (a: number, b: number) => a + b,
  'minus': (a: number, b: number) => a - b,
  'times': (a: number, b: number) => a * b,
  'dividedBy': (a: number, b: number) => a / b
}

const numsHandler = {
  get: (target: any, name: string): {valueOf: Function} => {
    if (nums.hasOwnProperty(name)) {
      const val = target.op ? target.op(target, nums[<keyof typeof nums>name]) : nums[<keyof typeof nums>name]
      return new Proxy({valueOf: () => val}, opsHandler)
    }
    return target[name]
  }
}

const opsHandler = {
  get: (target: any, name: string) => {
    if (ops.hasOwnProperty(name)) {
      return new Proxy({valueOf: () => +target, op: ops[<keyof typeof ops>name]}, numsHandler)
    }
    return target[name]
  }
}

const FluentCalculator = new Proxy({}, numsHandler)

console.log(FluentCalculator.one.plus.two + 0)