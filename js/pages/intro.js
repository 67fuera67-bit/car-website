/**
 * AETHER GT — Intro page entry.
 * Phase 03: a simple entry screen. The five-car cinematic arrives in Phase 10.
 *
 * Already wired: the background asset queue. Once the page is idle it quietly
 * caches the models of vehicles that have a 3D experience (only the BMW today)
 * so the next page opens fast. It is skipped on phones, low-end devices and
 * Data Saver, and it never downloads while the user is scrolling.
 */

import { VEHICLES, MODELS } from '../config.js';
import { mountChrome } from '../ui/site-chrome.js';
import { initPageTransitions } from '../ui/transitions.js';
import { detectQuality } from '../core/quality.js';
import { createActivityMonitor, createAssetQueue } from '../core/asset-queue.js';

mountChrome({ current: 'intro' });
initPageTransitions();

const quality = detectQuality();
if (quality.backgroundLoading) {
  // Watch for input from the very first moment, but only start queueing after the
  // page has finished loading and settled, so the download never competes with it.
  const activity = createActivityMonitor();
  const queue = createAssetQueue({ isBusy: activity.isBusy });

  const start = () => {
    VEHICLES.forEach((vehicle, index) => {
      if (MODELS[vehicle.id]) queue.add(MODELS[vehicle.id].url, { priority: index });
    });
  };
  const whenSettled = () => setTimeout(() => {
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 4000 });
    else start();
  }, 2500);

  if (document.readyState === 'complete') whenSettled();
  else window.addEventListener('load', whenSettled, { once: true });

  window.addEventListener('pagehide', () => { queue.clear(); activity.dispose(); }, { once: true });
}
