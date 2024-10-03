// src/utils/validation.test.js
import { isValidName, isValidEmail, isValidPostalCode, isAdult } from './validation';

test('valid name', () => {
  expect(isValidName('John Doe')).toBe(true);
  expect(isValidName('John123')).toBe(false);
});

test('valid email', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidEmail('test@.com')).toBe(false);
});

test('valid postal code', () => {
  expect(isValidPostalCode('75001')).toBe(true);
  expect(isValidPostalCode('7500')).toBe(false);
});

test('is adult', () => {
  expect(isAdult('2000-01-01')).toBe(true);
  expect(isAdult('2010-01-01')).toBe(false);
});
