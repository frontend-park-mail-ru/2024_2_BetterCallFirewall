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
		caches.match(event.request).then((response) => {
			// if (response) {
			// 	return response;
			// }
			return fetch(event.request).then((networkResponse) => {
				// if (!networkResponse || networkResponse.status !== 200) {
				// 	return networkResponse;
				// }
				if (networkResponse) {
					return caches.open(CACHE_NAME).then((cache) => {
						cache.put(event.request, networkResponse.clone());
						return networkResponse;
					});
				} else {
					return response;
				}
				// return caches.open(CACHE_NAME).then((cache) => {
				// 	cache.put(event.request, networkResponse.clone());
				// 	return networkResponse;
				// });
			});
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
