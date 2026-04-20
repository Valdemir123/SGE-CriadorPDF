const CACHE_NAME = "sge-pdfcreator";

const BASE = "/sge-pdfcreator";
const FILES_TO_CACHE = [
    `${BASE}/`,
    `${BASE}/index.html`,
    `${BASE}/style.css`,
    `${BASE}/manifest.json`,
    `${BASE}/service-worker.js`,
    `${BASE}/img/logo.png`,
    `${BASE}/icons/icon-192.png`,
    `${BASE}/icons/icon-512.png`
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
