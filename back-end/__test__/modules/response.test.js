const { success, error, isErr, checkAndChange } = require('../../modules/response');

test('success wrapper', () => {
  expect(success("hello").status).toBe('success');
  expect(success("hello").result).toBe('hello');
})

test('error wrapper', () => {
  expect(error("hello").status).toBe('error');
  expect(error("hello").message).toBe('hello');
})

test('isErr', () => {
  expect(isErr(new Error('test'))).toBe(true);
  expect(isErr('Hello world')).toBe(false);
})

test('checkAndChange', () => {
  expect(checkAndChange(new Error('error')).message).toBe('error');
  expect(checkAndChange({ username: "Whaou", age: 18 }).status).toBe('success');
})
