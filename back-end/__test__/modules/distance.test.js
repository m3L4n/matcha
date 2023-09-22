const { distanceBetweenTwoPoints } = require('../../modules/distance');

const paris = { x: 48.8566, y: 2.3522 };
const lyon = { x: 45.7597, y: 4.8422 }
const london = { x: 51.5072, y: 0.1276 };
const newYork = { x: 40.7128, y: 74.0060 };
const rome = { x: 41.9028, y: 12.4964 };

test('Paris Lyon', () => {
  expect(Math.floor(distanceBetweenTwoPoints(paris, lyon))).toBe(392);
})

test('Paris New York', () => {
  expect(Math.floor(distanceBetweenTwoPoints(paris, newYork))).toBe(5521);
})

test('Paris London', () => {
  expect(Math.floor(distanceBetweenTwoPoints(paris, london))).toBe(334);
})

test('Paris Rome', () => {
  expect(Math.floor(distanceBetweenTwoPoints(paris, rome))).toBe(1106);
})
