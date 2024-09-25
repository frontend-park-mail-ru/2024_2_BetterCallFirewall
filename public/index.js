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
	inputs: {
		firstName: {
			type: 'text',
			text: 'First Name',
			name: 'firstName',
		},
		secondName: {
			type: 'text',
			text: 'Second Name',
			name: 'secondName',
		},
		email: {
			type: 'email',
			text: 'Email',
			name: 'email',
		},
		password: {
			type: 'password',
			text: 'Password',
			name: 'password'
		},
		passwordAgain: {
			type: 'password',
			text: 'Password again',
			name: 'passwordAgain',
		},
	},
	button: {
		text: 'Sign Up!',
	}
};

const loginConfig = {
	className: 'login-form',
	text: 'Это форма логина',
	inputs: {
		email: {
			type: 'email',
			text: 'Email',
			name: 'email',
		},
		password: {
			type: 'password',
			text: 'Password',
			name: 'password'
		},
	},
	button: {
		text: 'Sign In!',
	},
};

const config = {
	homeConfig,
	signupConfig,
	loginConfig,
};

const app = new App(config, root);
app.goToPage(window.location.pathname);
