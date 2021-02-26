const modelFunctions = require('./modelFunctions')

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

describe('validateValues given invalid values', () => {
  it.each`
    a | b | c
    ${'blabla'} | ${10} | ${'Minus'}
    ${10} | ${'blabla'} | ${'Minus'}
    ${[1,2]} | ${5} | ${'Minus'}
    ${5} | ${[1,2]} | ${'Minus'}
    ${null} | ${6} | ${'Minus'}
    ${6} | ${null} | ${'Minus'}
    ${undefined} | ${6} | ${'Minus'}
    ${6} | ${undefined} | ${'Minus'}
  `('should throw error including "$c" when minVal is $a and maxVal is $b', ({a, b, c}) => {
    expect(() => {
      modelFunctions.validateValues(a, b, c)
    }).toThrow(`create${c}Question: Value Error`)
  });
});

describe('validateValues given invalid values returns error message relevant to calling function', () => {
  it.each`
    a | b | c
    ${'blabla'} | ${10} | ${'Minus'}
    ${'blabla'} | ${10} | ${'Divide'}
    ${'blabla'} | ${10} | ${'Multiply'}
  `('should throw error including "$c" when minVal is $a and maxVal is $b', ({a, b, c}) => {
    expect(() => {
      modelFunctions.validateValues(a, b, c)
    }).toThrow(`create${c}Question: Value Error`)
  });
});

test('validateValues given invalid values and generateRandomNumber as calling function returns relevant error message', () => {
  expect(() => {
      modelFunctions.validateValues('blabla', 10, 'Random')
    }).toThrow(`generateRandomNo: Value Error`)
});

test('createMinusQuestion returns array with 3 values', () => {
  let questionArray = modelFunctions.createMinusQuestion(1, 10);

  expect(questionArray.length).toBe(3);
});

test('createMinusQuestion given numbers between 1 and 10 generates question with numbers between 1 and 10', () => {
  let questionArray = modelFunctions.createMinusQuestion(1, 10);

  expect(questionArray[0]).toBeWithinRange(1, 10);
  expect(questionArray[1]).toBeWithinRange(1, 10);
});

test('createMinusQuestion stores correct answer in array', () => {
  let questionArray = modelFunctions.createMinusQuestion(1, 10);
  let answer = questionArray[0] - questionArray[1]; 

  expect(questionArray[2]).toBe(answer);
});

test('createDivideQuestion returns array with 3 values', () => {
  let questionArray = modelFunctions.createDivideQuestion(1, 10, true);

  expect(questionArray.length).toBe(3);
});

test('createDivideQuestion stores correct answer in array', () => {
  let questionArray = modelFunctions.createDivideQuestion(1, 10, true);
  let answer = questionArray[0] / questionArray[1]; 

  expect(questionArray[2]).toBe(answer);
});

test('createDivideQuestion defaults to using numbers betweeen 1 and 144 for questions', () => {
  let questionArray = modelFunctions.createDivideQuestion(1, 200, true);

  expect(questionArray[0]).toBeWithinRange(1, 144);
  expect(questionArray[1]).toBeWithinRange(1, 144);
});

test('createDivideQuestion without restriction uses numbers from specified range for questions', () => {
  let questionArray = modelFunctions.createDivideQuestion(150, 400, false);

  expect(questionArray[0]).toBeWithinRange(150, 400);
  expect(questionArray[1]).toBeWithinRange(150, 400);
});

test('createMultiplyQuestion returns array with 3 values', () => {
  let questionArray = modelFunctions.createMultiplyQuestion(1, 10, true);

  expect(questionArray.length).toBe(3);
});

test('createMultiplyQuestion stores correct answer in array', () => {
  let questionArray = modelFunctions.createMultiplyQuestion(1, 10, true);
  let answer = questionArray[0] * questionArray[1]; 

  expect(questionArray[2]).toBe(answer);
});

test('createMultiplyQuestion defaults to using numbers betweeen 1 and 12 for questions', () => {
  let questionArray = modelFunctions.createMultiplyQuestion(1, 100, true);

  expect(questionArray[0]).toBeWithinRange(1, 12);
  expect(questionArray[1]).toBeWithinRange(1, 12);
});

test('createMultiplyQuestion with restrictions off uses numbers within the specified range for questions', () => {
  let questionArray = modelFunctions.createMultiplyQuestion(20, 100, false);

  expect(questionArray[0]).toBeWithinRange(20, 100);
  expect(questionArray[1]).toBeWithinRange(20, 100);
});

test('createMultiplyQuestion defaults to using numbers betweeen 1 and 12 for questions, even if the minimum value is greater than 12', () => {
  let questionArray = modelFunctions.createMultiplyQuestion(20, 100, true);

  expect(questionArray[0]).toBeWithinRange(1, 12);
  expect(questionArray[1]).toBeWithinRange(1, 12);
});

test('generateRandomNo given min and max values generates number between those values', () => {
    expect(modelFunctions.generateRandomNo(1,3)).toBeWithinRange(1,3);
});
