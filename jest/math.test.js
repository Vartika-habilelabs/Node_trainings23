// math.test.js
const { add } = require('./math');

describe('add', () => {
  it('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should handle negative numbers', () => {
    expect(add(-2, 3)).toBe(1);
  });

  it('should handle zero', () => {
    expect(add(0, 0)).toBe(0);
  });
});