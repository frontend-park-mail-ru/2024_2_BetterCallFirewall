const CACHE_NAME = 'Vilka-cache-v5';
const urlsCache = ['/'];

// Добавляем урлы в кеш
this.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
		console.log('Кэшируем');
		return cache.addAll(urlsCache);
	}));
});

// Отработка запросов
this.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Ищем в кеше
			console.log('Идем в кеш');
			if (response) {
				return response;
			}
			// Идем в сеть
			console.log('Идем в сеть');
			return fetch(event.request).then((networkResponse) => {
				if (!networkResponse || networkResponse.status !== 200) {
					console.log('Пришло что-то нехорошее');
					return networkResponse;
				}
				// Сохраняем
				console.log('Сохраняем');
				return caches.open(CACHE_NAME).then((cache) => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			});
		}),
	);
});

// Удаляем старые кеши
this.addEventListener('activate', (event) => {
	console.log('Удаляем кеши');
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
