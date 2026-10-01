import { mountWhale } from './whale.mjs';

window.__ModuleLoader__.load({
  id: 'dsh-whale',
  factory() {
    return {
      apply(ctx) {
        ctx.effect(() => mountWhale(), 'dsh-whale: mount little whale');
      },
    };
  },
});
