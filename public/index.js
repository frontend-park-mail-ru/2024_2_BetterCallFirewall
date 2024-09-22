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
			text: 'Здесь будет header',
		},
		content: {
			className: 'content',
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
