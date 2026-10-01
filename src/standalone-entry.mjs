import { mountWhale } from './whale.mjs';

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWhale, { once: true });
} else {
  mountWhale();
}
