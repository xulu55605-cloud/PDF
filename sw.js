const CACHE = 'pdf-toolbox-v2';

// Derive the base path from the SW's own location
// e.g. https://user.github.io/pdf-tool/sw.js → base = /pdf-tool/
const BASE = self.location.pathname.replace(/sw\.js$/, '');

const CORE_PATHS = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png',
];

const CDN_URLS = [
  'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
];

// ── Install: pre-cache everything ──────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => {
        // Cache core files (absolute URL built from origin + path)
        const coreReqs = CORE_PATHS.map(p => new Request(self.location.origin + p));
        // Cache CDN files
        const cdnReqs  = CDN_URLS.map(u => new Request(u));
        return Promise.allSettled([
          ...coreReqs.map(r => fetch(r).then(res => res.ok ? c.put(r, res) : null).catch(()=>null)),
          ...cdnReqs.map(r  => fetch(r).then(res => res.ok ? c.put(r, res) : null).catch(()=>null)),
        ]);
      })
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ──────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ── Fetch strategy ──────────────────────────────────────────────
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = req.url;

  // Only handle GET requests
  if (req.method !== 'GET') return;

  // CDN resources → Cache-First (content-addressed, safe forever)
  if (CDN_URLS.includes(url)) {
    e.respondWith(
      caches.match(req).then(cached => cached || fetchAndCache(req))
    );
    return;
  }

  // Core app files → Cache-First with network update in background
  const reqPath = new URL(url).pathname;
  if (CORE_PATHS.includes(reqPath) || reqPath === BASE + 'sw.js') {
    e.respondWith(
      caches.match(req).then(cached => {
        const networkFetch = fetchAndCache(req).catch(() => null);
        return cached || networkFetch;
      })
    );
    return;
  }

  // Everything else → Network-First with cache fallback
  e.respondWith(
    fetch(req)
      .then(res => { fetchAndCache(req, res.clone()); return res; })
      .catch(() => caches.match(req))
  );
});

function fetchAndCache(req, existingRes) {
  const p = existingRes
    ? caches.open(CACHE).then(c => c.put(req, existingRes)).then(() => existingRes)
    : fetch(req).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
        return res;
      });
  return p;
}
