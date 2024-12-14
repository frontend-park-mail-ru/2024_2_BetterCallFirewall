const CACHE_NAME = 'Vilka-cache-v5';
const urlsCache = ['/'];

this.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsCache);
		}),
	);
});

this.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request)
			.then((networkResponse) => {
				const responseToCache = networkResponse.clone();
				if (networkResponse && networkResponse.ok) {
					caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, responseToCache);
					});
				}
				return networkResponse;
			})
			.catch(() => {
				return caches.match(event.request);
			}),
	);
});

this.addEventListener('activate', (event) => {
	const cacheWhiteList = [CACHE_NAME];
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhiteList.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});
