import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSettings, chooseAction, swimBounds, stepMotion } from '../src/core.mjs';

test('small default and safe storage normalization', () => {
  assert.equal(normalizeSettings(null).size, 96);
  assert.equal(normalizeSettings({ size: 999 }).size, 160);
  assert.equal(normalizeSettings({ size: 40 }).size, 56);
  assert.equal(normalizeSettings({ swimming: false }).swimming, false);
});

test('click actions map exclusively to charm, spray, and roll thirds', () => {
  assert.equal(chooseAction(() => 0.1), 'charms');
  assert.equal(chooseAction(() => 0.5), 'spray');
  assert.equal(chooseAction(() => 0.9), 'roll');
});

test('bounds stay ordered and visible at all supported sizes', () => {
  for (const [w, h] of [[1920, 1080], [1280, 720], [375, 667], [200, 200]]) {
    const b = swimBounds(w, h, 96);
    assert.ok(b.right >= b.left && b.bottom >= b.top);
  }
});

test('motion is bounded by elapsed time and never overshoots', () => {
  const next = stepMotion({ x: 0, y: 0 }, { x: 10, y: 0 }, 1, 27);
  assert.deepEqual(next, { x: 1.35, y: 0 });
  assert.deepEqual(stepMotion({ x: 0, y: 0 }, { x: 1, y: 0 }, 1, 27), { x: 1, y: 0 });
});
