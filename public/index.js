import App from './app.js';

const root = document.getElementById('root');

const homeConfig = {
	menu: {
		feed: {
			text: 'feed',
			href: '/feed',
		},
		login: {
			text: 'login',
			href: '/login',
		},
		signup: {
			text: 'signup',
			href: '/signup',
		},
	},
	main: {
		className: 'main',
		header: {
			search: {
				placeholder: 'Search for friends, groups, pages',
				img: 'http://127.0.0.1:8000/public/img/search.jpg',
			},
		},
		content: {
			className: 'content',
		},
		aside: {
			className: 'aside',
		},
	},
};

const signupConfig = {
	className: 'signup-form',
	text: 'Это форма регистрации',
};

const loginConfig = {
	className: 'login-form',
	text: 'Это форма логина',
};

const config = {
	homeConfig,
	signupConfig,
	loginConfig,
};

const app = new App(config, root);
app.goToPage(window.location.pathname);
