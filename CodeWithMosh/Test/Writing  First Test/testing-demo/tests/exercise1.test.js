const { fizzBuzz } = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw if the input is not a number ', () => {
        expect(() => {fizzBuzz('a')}).toThrow();
        expect(() => {fizzBuzz({})}).toThrow();
        expect(() => {fizzBuzz(null)}).toThrow();
        expect(() => {fizzBuzz(undefined)}).toThrow();
    }),
    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = fizzBuzz(15);
        expect(result).toBe('FizzBuzz')
    }),
    it('should return Fizz if in put is divisible by 3', () => {
        const result = fizzBuzz(3);
        expect(result).toBe('Fizz');
    }),
    it('should return Fizz if in put is divisible by 5', () => {
        const result = fizzBuzz(5);
        expect(result).toBe('Buzz');
    }),
    it('should return input if in put is not divisible by 3 and 5', () => {
        const result = fizzBuzz(4);
        expect(result).toBe(4);
    })
});