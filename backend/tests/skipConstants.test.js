import test from 'node:test';
import assert from 'node:assert/strict';
import { HARD_SKIP_DIRS } from '../utils/skipConstants.js';

test('HARD_SKIP_DIRS is exported as a Set', () => {
  assert.ok(HARD_SKIP_DIRS instanceof Set, 'HARD_SKIP_DIRS should be a Set');
});

test('HARD_SKIP_DIRS contains expected entries', () => {
  const expected = [
    'node_modules',
    '.git',
    'dist',
    'build',
    '.venv',
    '__pycache__',
  ];
  for (const dir of expected) {
    assert.ok(HARD_SKIP_DIRS.has(dir), `HARD_SKIP_DIRS should contain "${dir}"`);
  }
});

test('HARD_SKIP_DIRS contains exactly the expected number of entries', () => {
  assert.equal(HARD_SKIP_DIRS.size, 6, 'HARD_SKIP_DIRS should have exactly 6 entries');
});

test('HARD_SKIP_DIRS does not contain unexpected entries', () => {
  const unexpected = ['src', 'lib', 'test', 'tests', 'node_modules_backup'];
  for (const dir of unexpected) {
    assert.ok(!HARD_SKIP_DIRS.has(dir), `HARD_SKIP_DIRS should not contain "${dir}"`);
  }
});

test('HARD_SKIP_DIRS entries are all non-empty strings', () => {
  for (const entry of HARD_SKIP_DIRS) {
    assert.strictEqual(typeof entry, 'string', 'each entry should be a string');
    assert.ok(entry.length > 0, 'each entry should be non-empty');
  }
});
