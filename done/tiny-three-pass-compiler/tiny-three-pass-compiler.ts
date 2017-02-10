function Compiler () {};

Compiler.prototype.compile = function (program) {
  return this.pass3(this.pass2(this.pass1(program)));
};

Compiler.prototype.tokenize = function (program) {
  // Turn a program string into an array of tokens.  Each token
  // is either '[', ']', '(', ')', '+', '-', '*', '/', a variable
  // name or a number (as a string)
  var regex = /\s*([-+*/\(\)\[\]]|[A-Za-z]+|[0-9]+)\s*/g;
  return program.replace(regex, ":$1").substring(1).split(':').map( function (tok) {
    return isNaN(tok) ? tok : tok|0;
  });
};

Compiler.prototype.pass1 = function (program) {
  var tokens = this.tokenize(program);
  let { params, body } = getParamsAndBody(tokens)
  body = parensToArray(body)
  return constructAst(params, body)
  // return un-optimized AST
};

Compiler.prototype.pass2 = function (ast) {
  // return AST with constant expressions reduced
  return optimize(ast)
};

Compiler.prototype.pass3 = function (ast) {
  // return assembly instructions
};


const getParamsAndBody = (tokens) => {
	const closeBracketIndex = tokens.indexOf(']')
  return {
  	params: tokens.slice(1, closeBracketIndex),
    body: tokens.slice(closeBracketIndex + 1)
  }
}

const findIndexOfOperatorWithLowestPrecedence = (body) => {
	let lastAddOrSubtract
  let lastMultiplyOrDivide 
  for (let i = 0, l = body.length; i < l; i++) {
  	switch (body[i]) {
      case '-':
      case '+': lastAddOrSubtract = i; break
    	case '*':
      case '/': lastMultiplyOrDivide = i; break
    }
  }
  if (lastAddOrSubtract == null) {
    return lastMultiplyOrDivide
  }
  return lastAddOrSubtract
}

const parensToArray = (body) => {
	const groups = [[]]
  for (let i = 0, l = body.length; i < l; i++) {
  	const currentToken = body[i]
  	switch (currentToken) {
    	case '(': groups.unshift([]); break
      case ')':
      	let currentGroup = groups.shift()
        groups[0].push(currentGroup)
        break
      default:
      	groups[0].push(currentToken)
    }
  }
  return groups[0]
}

const constructAst = (params, body) => {
	if (body.length === 1) {
  	const t = body[0]
  	switch (typeof t) {
    	case 'string': return { op: 'arg', n: params.indexOf(t) }
      case 'number': return { op: 'imm', n: t }
      case 'object': return constructAst(params, t)
      default: throw new Error('unexpected token', t)
    }
  }
  
  const operatorIndex = findIndexOfOperatorWithLowestPrecedence(body)
  return { op: body[operatorIndex], a: constructAst(params, body.slice(0, operatorIndex)),
  																	b: constructAst(params, body.slice(operatorIndex + 1)) }
}

const optimize = (tree) => {
	let a
  let b
	if (tree.a) {
  	a = optimize(tree.a)
    b = optimize(tree.b)
    if (a.op === 'imm' && b.op === 'imm') {
    	return execute(tree.op, a.n, b.n)
    }
    if (tree.a !== a || tree.b !== b) {
      return Object.assign({}, tree, { a, b })
    }
  }
  return tree
}

const execute = (op, a, b) => ({
	op: 'imm',
  n: operations[op](a, b)
})

const operations = {
	'+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
}