const {
  describe,
  it,
  expect,
  matchers 
} = require('./test-framework')

function add(param1, param2) {
	return param1 + param2;
}

function subtract(param1, param2) {
	return param1 - param2;
}

function divide(param1, param2) {
	return param1 / param2;
}

function multiply(param1, param2) {
	return param1 * param2;
}

describe('test addition add()', () => {

	it('sum of positive integer', () => {
		const actual = add(2, 3);
		expect(actual).toBe(5);
	});

	it('sum of negative integer', () => {
		const actual = add(-2, -3);
		expect(actual).toBe(-5);
	});
})

describe('test subtraction subtract()', () => {

	it('subtract of positive integer', () => {
		const actual = subtract(2, 3);
		expect(actual).toBe(-1);
	});

	it('result of negative number', () => {
		const actual = subtract(-2, -3);
		expect(actual).toBe(1);
	});
})

describe('test division divide()', () => {

	it('division of integers', () => {
		const actual = divide(10, 2);
		expect(actual).toBe(5);
	});

	it('divide by negative number', () => {
		const actual = divide(2, -2);
		expect(actual).toBe(-1);
	});
})

describe('test division multiply()', () => {

	it('multiplication of integers', () => {
		const actual = multiply(10, 2);
		expect(actual).toBe(20);
	});

	it('divide by negative number', () => {
		const actual = multiply(2, -2);
		expect(actual).toBe(-4);
	});
})


