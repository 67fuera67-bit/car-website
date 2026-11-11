/**
 * AETHER GT — Collection page entry.
 * The showroom itself is static HTML/CSS (collection.html); this adds the shared
 * chrome, page transitions and the light enhancement layer. No Three.js, no models.
 */

import { mountChrome } from '../ui/site-chrome.js';
import { initPageTransitions } from '../ui/transitions.js';
import { initShowroom } from '../ui/showroom.js';

mountChrome({ current: 'collection' });
initPageTransitions();
initShowroom();
