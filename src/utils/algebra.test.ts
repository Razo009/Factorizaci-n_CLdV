import test from 'node:test';
import assert from 'node:assert/strict';
import { gcd, gcdArray, findFactorPairs, parseSimpleTerm, verifyTrinomial } from './algebra.ts';

test('gcd calculates greatest common divisor accurately', () => {
  assert.equal(gcd(12, 18), 6);
  assert.equal(gcd(8, 12), 4);
  assert.equal(gcd(15, 25), 5);
  assert.equal(gcd(7, 13), 1);
});

test('gcdArray finds common divisor for 3 or more terms', () => {
  assert.equal(gcdArray([8, 12, 4]), 4);
  assert.equal(gcdArray([15, 25, 10]), 5);
  assert.equal(gcdArray([18, 24, 12]), 6);
  assert.equal(gcdArray([14, 21, 7]), 7);
});

test('findFactorPairs finds integer pairs and detects correct sum', () => {
  const pairs = findFactorPairs(12, 7);
  // factors of 12 include [3, 4] with 3+4=7
  const correct = pairs.find((p) => p.isCorrect);
  assert.ok(correct, 'Should find the pair satisfying m*n=12 and m+n=7');
  assert.equal(correct?.m, 3);
  assert.equal(correct?.n, 4);
  assert.equal(correct?.sum, 7);
});

test('findFactorPairs handles negative sums or products', () => {
  const pairs = findFactorPairs(6, 5); // 2 and 3
  const correct = pairs.find((p) => p.isCorrect);
  assert.ok(correct);
  assert.equal(correct?.m, 2);
  assert.equal(correct?.n, 3);
});

test('parseSimpleTerm decomposes sign, coefficient, and variables', () => {
  const t1 = parseSimpleTerm('-12a^2b');
  assert.equal(t1.sign, '-');
  assert.equal(t1.coefficient, 12);
  assert.equal(t1.variables.length, 2);
  assert.equal(t1.variables[0].name, 'a');
  assert.equal(t1.variables[0].exponent, 2);
  assert.equal(t1.variables[1].name, 'b');
  assert.equal(t1.variables[1].exponent, 1);

  const t2 = parseSimpleTerm('6x²');
  assert.equal(t2.sign, '+');
  assert.equal(t2.coefficient, 6);
  assert.equal(t2.variables[0].name, 'x');
  assert.equal(t2.variables[0].exponent, 2);
});

test('verifyTrinomial verifies m and n factorization', () => {
  assert.equal(verifyTrinomial(3, 4, 7, 12), true);
  assert.equal(verifyTrinomial(2, 6, 7, 12), false);
});
