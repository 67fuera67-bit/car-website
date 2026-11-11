/**
 * AETHER GT — Car page entry (used by all five car pages).
 * <body data-page="car" data-vehicle="<id>">
 *
 * A car with a model in config.js MODELS gets its full 3D experience, loaded
 * on demand so the three.js/GSAP downloads only start on pages that need them.
 * A car without one shows its identification page only: no WebGL, no downloads.
 */

import { VEHICLES, MODELS } from '../config.js';
import { mountChrome } from '../ui/site-chrome.js';
import { initPageTransitions } from '../ui/transitions.js';

const vehicleId = document.body.dataset.vehicle;
const vehicle = VEHICLES.find((v) => v.id === vehicleId);

mountChrome({ current: 'car', vehicleId });
initPageTransitions();

async function start() {
  if (!vehicle) throw new Error(`Unknown vehicle "${vehicleId}".`);
  if (!MODELS[vehicle.id]) {
    document.documentElement.classList.add('is-pending');
    return;
  }
  const { startCarExperience } = await import('../core/bootstrap.js');
  await startCarExperience(vehicle);
}

start().catch((error) => {
  // Never leave the visitor stuck behind the loading screen.
  console.error('[AETHER GT] page failed to start:', error);
  if (window.__aetherFail) window.__aetherFail();
});
