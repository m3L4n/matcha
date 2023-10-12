const { searchValidation } = require("../../modules/formValidation");

const searchCriteria = {
  action: '',
  age: '',
  location: '',
  fame: '',
  tags: '',
}

test('uninitialized search criteria', () => {
  expect(searchValidation(searchCriteria)).toBe("ok");
})

test('search criteria with search', () => {
  searchCriteria.action = "search";
  expect(searchValidation(searchCriteria)).toBe("ok");
})

test('search criteria with search empty', () => {
  searchCriteria.action = "";
  expect(searchValidation(searchCriteria)).toBe("ok");
})

test('search criteria with search invalid', () => {
  searchCriteria.action = "Hello World!";
  expect(searchValidation(searchCriteria).status).toBe("error");
})

test('search criteria with valid age', () => {
  searchCriteria.action = "search";
  searchCriteria.age = "18";
  expect(searchValidation(searchCriteria)).toBe("ok");
})

test('search criteria with invalid age', () => {
  searchCriteria.age = "Hello World";
  expect(searchValidation(searchCriteria).status).toBe("error");
})

test('search criteria with valid location', () => {
  searchCriteria.age = "18";
  searchCriteria.location = "300";
  expect(searchValidation(searchCriteria)).toBe("ok");
})

test('search criteria with invalid location', () => {
  searchCriteria.location = "Hello World";
  expect(searchValidation(searchCriteria).status).toBe("error");
})

test('search criteria with valid fame', () => {
  searchCriteria.location = "300";
  searchCriteria.fame = "1500";
  expect(searchValidation(searchCriteria)).toBe("ok");
})

test('search criteria with invalid fame', () => {
  searchCriteria.fame = "Hello World";
  expect(searchValidation(searchCriteria).status).toBe("error");
})

