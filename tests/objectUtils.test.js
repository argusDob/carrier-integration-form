import { describe, it, expect } from 'vitest';
import { getDeepDifference } from '../src/utilities/objectUtils.js';

describe('getDeepDifference', () => {
  it('returns only changed top-level keys', () => {
    const original = { a: 1, b: 2 };
    const updated = { a: 1, b: 3, c: 4 };
    expect(getDeepDifference(updated, original)).toEqual({ b: 3, c: 4 });
  });

  it('returns nested diffs for objects', () => {
    const original = { a: 1, b: { c: 2, d: 3 } };
    const updated = { a: 1, b: { c: 22, d: 3, x: 9 } };
    expect(getDeepDifference(updated, original)).toEqual({ b: { c: 22, x: 9 } });
  });

  it('handles null/undefined correctly', () => {
    const original = { a: null, b: undefined };
    const updated = { a: null, b: 'val' };
    expect(getDeepDifference(updated, original)).toEqual({ b: 'val' });
  });
});
