import app from './app';
import './index.scss';

console.log('navigator:', navigator);
if ('serviceWorker' in navigator) {
	console.log('add event listener');
	window.addEventListener('load', () => {
		console.log('load');
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

app.router.goToPage(window.location.pathname);
app.init();
