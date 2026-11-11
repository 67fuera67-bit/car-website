/**
 * AETHER GT — Static configuration.
 * Single source of truth for the vehicle lineup and loader settings.
 */

/** Site-level pages. Every page is its own HTML file that shares css/ and js/. */
export const SITE = {
  name: 'AETHER GT',
  intro: 'index.html',
  collection: 'collection.html',
};

/**
 * The five vehicles, in showcase order (BMW first). `page` is the car's own
 * experience page. A car has a 3D experience once it has an entry in MODELS below.
 *
 * Collection page fields:
 *   tagline  one short line under the name
 *   visual   editorial visual for the collection. `image` is null until real photography exists
 *            (the collection then shows an honest, captioned frame). When set to a path, see README
 *            "Collection imagery" for how to place it.
 */
export const VEHICLES = [
  {
    id: 'bmw-m5-f90', make: 'BMW', model: 'M5 F90', designation: 'Competition', page: 'bmw-m5.html',
    tagline: 'Four doors. Twin-turbo V8. Uncompromising.',
    visual: { image: null },
  },
  {
    id: 'porsche-911-carrera-4s', make: 'Porsche', model: '911', designation: 'Carrera 4S', page: 'porsche-911.html',
    tagline: 'The rear-engined icon, with all-wheel-drive grip.',
    visual: { image: null },
  },
  {
    id: 'nissan-gt-r-r35', make: 'Nissan', model: 'GT-R', designation: 'R35', page: 'nissan-gt-r.html',
    tagline: 'The all-wheel-drive giant-killer.',
    visual: { image: null },
  },
  {
    id: 'toyota-gr-supra-mk5', make: 'Toyota', model: 'GR Supra', designation: 'MK5', page: 'toyota-supra.html',
    tagline: 'Rear-drive precision, reborn.',
    visual: { image: null },
  },
  {
    id: 'chevrolet-corvette-c8', make: 'Chevrolet', model: 'Corvette', designation: 'C8', page: 'corvette-c8.html',
    tagline: 'Mid-engine, at last.',
    visual: { image: null },
  },
];

export const LOADER = {
  /** Minimum time (ms) the loading screen stays visible, to avoid a flash. */
  minDuration: 900,
};

/* ---------------------------------------------------------------------------
   Phase 02 — scene, models and showcase settings
   ------------------------------------------------------------------------ */

/** Draco decoder (needed because the BMW GLB is Draco-compressed). Must match the Three.js version in index.html. To run offline, copy that folder into the project and point this at it. */
export const DRACO_DECODER_PATH = 'https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/libs/draco/gltf/';

/**
 * Per-vehicle model spec, keyed by VEHICLES[].id. Only the BMW exists in Phase 02.
 * Every model is normalised to the same stage footprint (fitLength) so future
 * hand-offs between cars keep scale, ground contact and centring matched.
 */
export const MODELS = {
  'bmw-m5-f90': {
    url: 'assets/models/bmw-m5-f90.glb',
    approxBytes: 5069832,
    /** Degrees about Y applied so the car's nose points to +X. The BMW GLB already faces +X. */
    orientationY: 0,
    /** Nominal real-world size (m), used only to sanity-check the file. */
    expected: { length: 4.95, width: 2.1, height: 1.48 },
    credit: {
      title: 'Bmw M5 F90',
      author: 'RES1N',
      license: 'CC BY 4.0',
      licenseUrl: 'http://creativecommons.org/licenses/by/4.0/',
      authorUrl: 'https://sketchfab.com/Resinnnn',
      sourceUrl: 'https://sketchfab.com/3d-models/bmw-m5-f90-5478e978bd634337adc8e3dc413fbfa3',
    },
  },
};

export const STAGE = {
  /** Every vehicle is scaled uniformly so its length equals this (metres). */
  fitLength: 4.9,
  /** Meshes reaching further than this beyond the main body are treated as broken and hidden. */
  outlierMargin: 0.75,
  /** Give up on a download that makes no progress for this long (ms). */
  stallTimeout: 30000,
};

/** Showcase scroll track. Height lives in css/showcase.css (--showcase-length). */
export const SHOWCASE = {
  /** Seconds the camera takes to catch up with the scroll position (inertia). 0 = locked to scroll. */
  scrubSmoothing: 1,
};
