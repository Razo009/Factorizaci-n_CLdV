import type { FactorPair, TermData, VariablePart } from '../types/algebra.ts';

/**
 * Calculates Greatest Common Divisor (GCD / MCD) of two positive integers using Euclidean algorithm
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a || 1;
}

/**
 * Calculates GCD of an array of numbers
 */
export function gcdArray(numbers: number[]): number {
  if (numbers.length === 0) return 1;
  return numbers.reduce((acc, curr) => gcd(acc, curr), Math.abs(numbers[0]));
}

/**
 * Finds all integer factor pairs (m, n) for a product c where m * n = c
 * and checks which one satisfies m + n = targetSum
 */
export function findFactorPairs(c: number, targetSum: number): FactorPair[] {
  const pairs: FactorPair[] = [];
  const absC = Math.abs(c);
  const seen = new Set<string>();

  for (let i = 1; i <= Math.sqrt(absC); i++) {
    if (absC % i === 0) {
      const j = absC / i;
      // Potential signs: if c > 0: both positive or both negative
      // if c < 0: one positive, one negative
      const candidateSigns: [number, number][] =
        c > 0
          ? [
              [i, j],
              [-i, -j],
            ]
          : [
              [i, -j],
              [-i, j],
            ];

      for (const [m, n] of candidateSigns) {
        const sortedKey = [m, n].sort((a, b) => a - b).join(',');
        if (!seen.has(sortedKey)) {
          seen.add(sortedKey);
          pairs.push({
            m,
            n,
            product: m * n,
            sum: m + n,
            isCorrect: m + n === targetSum && m * n === c,
          });
        }
      }
    }
  }

  // Sort pairs: put correct pair or naturally sorted
  pairs.sort((a, b) => a.m - b.m);
  return pairs;
}

/**
 * Helper to display exponents in unicode superscript
 */
export function toSuperscript(num: number): string {
  if (num === 1) return '';
  const supers: Record<string, string> = {
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹',
    '-': '⁻',
  };
  return String(num)
    .split('')
    .map((ch) => supers[ch] || ch)
    .join('');
}

/**
 * Formats a term into clean readable mathematical representation
 */
export function formatTermText(term: TermData, isFirst: boolean = false): string {
  const signStr = isFirst ? (term.sign === '-' ? '-' : '') : ` ${term.sign} `;
  const coeffStr =
    term.coefficient === 1 && term.variables.length > 0 ? '' : String(term.coefficient);
  const varStr = term.variables
    .map((v) => (v.exponent === 1 ? v.name : `${v.name}${toSuperscript(v.exponent)}`))
    .join('');

  return `${signStr}${coeffStr || (term.variables.length === 0 ? '1' : '')}${varStr}`;
}

/**
 * Decomposes a simple term string like "-12a²b" or "6x^2" or "+4x" into TermData
 */
export function parseSimpleTerm(rawTerm: string, id: string = 'term-0'): TermData {
  let cleaned = rawTerm.trim().replace(/\s+/g, '');
  let sign: '+' | '-' = '+';

  if (cleaned.startsWith('+')) {
    cleaned = cleaned.substring(1);
  } else if (cleaned.startsWith('-')) {
    sign = '-';
    cleaned = cleaned.substring(1);
  }

  // Match coefficient at start
  const coeffMatch = cleaned.match(/^\d+/);
  let coefficient = 1;
  let remaining = cleaned;

  if (coeffMatch) {
    coefficient = parseInt(coeffMatch[0], 10);
    remaining = cleaned.substring(coeffMatch[0].length);
  }

  // Variables with exponents
  const variables: VariablePart[] = [];
  // Matches letters followed optionally by ^num or superscript numbers
  const varRegex = /([a-zA-Z])(?:\^(\d+)|([⁰¹²³⁴⁵⁶⁷⁸⁹]+))?/g;
  let match;

  while ((match = varRegex.exec(remaining)) !== null) {
    const varName = match[1];
    let exp = 1;
    if (match[2]) {
      exp = parseInt(match[2], 10);
    } else if (match[3]) {
      const supMap: Record<string, string> = {
        '⁰': '0',
        '¹': '1',
        '²': '2',
        '³': '3',
        '⁴': '4',
        '⁵': '5',
        '⁶': '6',
        '⁷': '7',
        '⁸': '8',
        '⁹': '9',
      };
      const numStr = match[3]
        .split('')
        .map((c) => supMap[c] || c)
        .join('');
      exp = parseInt(numStr, 10);
    }
    variables.push({ name: varName, exponent: exp });
  }

  return {
    id,
    raw: rawTerm,
    sign,
    coefficient,
    variables,
  };
}

/**
 * Verifies distributive expansion of a(b + c) = ab + ac
 */
export function verifyDistributive(factorA: number, factorB: number, factorC: number): boolean {
  return factorA * (factorB + factorC) === factorA * factorB + factorA * factorC;
}

/**
 * Evaluates trinomial (x + m)(x + n) = x² + (m+n)x + mn
 */
export function verifyTrinomial(m: number, n: number, b: number, c: number): boolean {
  return m * n === c && m + n === b;
}
