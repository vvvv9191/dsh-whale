export const STORAGE_KEY = 'dsh.little-whale.v1';
export const DEFAULTS = Object.freeze({ size: 96, swimming: true, hidden: false });
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function normalizeSettings(value) {
  const input = value && typeof value === 'object' ? value : {};
  return {
    size: typeof input.size === 'number' && Number.isFinite(input.size)
      ? clamp(Math.round(input.size), 56, 160) : DEFAULTS.size,
    swimming: typeof input.swimming === 'boolean' ? input.swimming : DEFAULTS.swimming,
    hidden: typeof input.hidden === 'boolean' ? input.hidden : DEFAULTS.hidden,
  };
}

export function chooseAction(random = Math.random) {
  const roll = random();
  if (roll < 1 / 3) return 'charms';
  if (roll < 2 / 3) return 'spray';
  return 'roll';
}

// Keep clear of the header and message composer; shrink margins on small screens.
export function swimBounds(width, height, size) {
  const margin = Math.min(18, Math.max(0, (width - size) / 2));
  const top = Math.min(76, Math.max(0, (height - size) / 3));
  return {
    left: margin,
    right: Math.max(margin, width - size - margin),
    top,
    bottom: Math.max(top, height - size - Math.min(140, height * 0.22)),
  };
}

export function clampPosition(position, bounds) {
  return { x: clamp(position.x, bounds.left, bounds.right), y: clamp(position.y, bounds.top, bounds.bottom) };
}

export function stepMotion(position, target, dt, speed = 27) {
  const dx = target.x - position.x;
  const dy = target.y - position.y;
  const distance = Math.hypot(dx, dy);
  if (distance < 0.1) return { ...position };
  const travel = Math.min(distance, speed * clamp(dt, 0, 0.05));
  return { x: position.x + dx / distance * travel, y: position.y + dy / distance * travel };
}
