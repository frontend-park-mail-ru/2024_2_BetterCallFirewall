import app from './app';
import './index.scss';

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('./sw.js')
			.then((registration) => {
				console.log(
					'Service Worker зарегистрирован с областью:',
					registration.scope,
				);
			})
			.catch((error) => {
				console.log('Ошибка регистрации Service Worker:', error);
			});
	});
}

document.addEventListener('load', () => {
	console.log('load');
});

app.router.goToPage(window.location.pathname);
app.init();
