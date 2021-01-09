const { expect } = require('@jest/globals');
const modelFunctions = require('./modelFunctions')

test('creates a minus question with min of 1 and max of 10', () => {
  let questionResult = modelFunctions.createMinusQuestion(1, 10);
  let answer = questionResult[0] - questionResult[1]; 

  expect(questionResult[0]).toBeGreaterThanOrEqual(1);
  expect(questionResult[0]).toBeLessThanOrEqual(10);
  expect(questionResult[1]).toBeGreaterThanOrEqual(1);
  expect(questionResult[1]).toBeLessThanOrEqual(10);
  expect(questionResult[2]).toBe(answer);
});

test('throws exception if minVal input is incorrect', () => {
  expect(() => {
    modelFunctions.createMinusQuestion("blabla", 10)
  }).toThrow("createMinusQuestion: Value Error");
});

test('throws exception if maxVal input is incorrect', () => {
  expect(() => {
    modelFunctions.createMinusQuestion(10, "y")
  }).toThrow("createMinusQuestion: Value Error");
});
