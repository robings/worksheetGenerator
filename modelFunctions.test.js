const { expect } = require('@jest/globals');
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
})

describe('createMinusQuestion given invalid values', () => {
  it.each`
    a | b
    ${'blabla'} | ${10}
    ${10} | ${'blabla'}
    ${[1,2]} | ${5}
    ${5} | ${[1,2]}
    ${null} | ${6}
    ${6} | ${null}
    ${undefined} | ${6}
    ${6} | ${undefined}
  `('should throw when minVal is $a and maxVal is $b', ({a, b}) => {
    expect(() => {
      modelFunctions.createMinusQuestion(a, b)
    }).toThrow("createMinusQuestion: Value Error")
  });
});

test('createDivideQuestion returns array with 3 values', () => {
  let questionArray = modelFunctions.createDivideQuestion(1, 10);

  expect(questionArray.length).toBe(3);
});

test('createDivideQuestion stores correct answer in array', () => {
  let questionArray = modelFunctions.createDivideQuestion(1, 10);
  let answer = questionArray[0] / questionArray[1]; 

  expect(questionArray[2]).toBe(answer);
})

test('createDivideQuestion defaults to using numbers betweeen 1 and 144 for questions', () => {
  let questionArray = modelFunctions.createDivideQuestion(1, 10);

  expect(questionArray[0]).toBeWithinRange(1, 144);
  expect(questionArray[1]).toBeWithinRange(1, 144);
});

describe('createDivideQuestion given invalid values', () => {
  it.each`
    a | b
    ${'blabla'} | ${10}
    ${10} | ${'blabla'}
    ${[1,2]} | ${5}
    ${5} | ${[1,2]}
    ${null} | ${6}
    ${6} | ${null}
    ${undefined} | ${6}
    ${6} | ${undefined}
  `('should throw when minVal is $a and maxVal is $b', ({a, b}) => {
    expect(() => {
      modelFunctions.createDivideQuestion(a, b)
    }).toThrow("createDivideQuestion: Value Error")
  });
});

test('createMultiplyQuestion returns array with 3 values', () => {
  let questionArray = modelFunctions.createMultiplyQuestion(1, 10);

  expect(questionArray.length).toBe(3);
});

test('createMultiplyQuestion stores correct answer in array', () => {
  let questionArray = modelFunctions.createMultiplyQuestion(1, 10);
  let answer = questionArray[0] * questionArray[1]; 

  expect(questionArray[2]).toBe(answer);
})

test('createMultiplyQuestion defaults to using numbers betweeen 1 and 12 for questions', () => {
  let questionArray = modelFunctions.createDivideQuestion(1, 10);

  expect(questionArray[0]).toBeWithinRange(1, 12);
  expect(questionArray[1]).toBeWithinRange(1, 12);
});

describe('createMultiplyQuestion given invalid values', () => {
  it.each`
    a | b
    ${'blabla'} | ${10}
    ${10} | ${'blabla'}
    ${[1,2]} | ${5}
    ${5} | ${[1,2]}
    ${null} | ${6}
    ${6} | ${null}
    ${undefined} | ${6}
    ${6} | ${undefined}
  `('should throw when minVal is $a and maxVal is $b', ({a, b}) => {
    expect(() => {
      modelFunctions.createMultiplyQuestion(a, b)
    }).toThrow("createMultiplyQuestion: Value Error")
  });
});
