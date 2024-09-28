import App, { PAGE_LINKS } from './app.js';
import {
	validateName,
	validateEmail,
	validateConfirmation,
	validatePassword,
} from './modules/validation.js';

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
				img: 'img/search.svg',
			},
			profile: {
				logoutImg: 'img/logout.svg',
				avatar: 'img/avatar.png',
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
	section: 'signup',
	inputs: {
		firstName: {
			type: 'text',
			text: 'First Name',
			name: 'firstName',
			validator: validateName,
		},
		secondName: {
			type: 'text',
			text: 'Second Name',
			name: 'secondName',
			validator: validateName,
		},
		email: {
			type: 'text',
			text: 'Email',
			name: 'email',
			validator: validateEmail,
		},
		password: {
			type: 'password',
			text: 'Password',
			name: 'password',
			validator: validatePassword,
		},
		passwordAgain: {
			type: 'password',
			text: 'Password again',
			name: 'passwordAgain',
			validator: validateConfirmation,
		},
	},
	button: {
		text: 'Sign Up!',
	},
};

const loginConfig = {
	className: 'login-form',
	section: 'login',
	inputs: {
		email: {
			type: 'text',
			text: 'Email',
			name: 'email',
			validator: validateEmail,
		},
		password: {
			type: 'password',
			text: 'Password',
			name: 'password',
			validator: validatePassword,
		},
	},
	button: {
		section: 'submit',
		text: 'Sign In!',
	},
	toSignupLink: {
		href: PAGE_LINKS.signup,
		text: 'Нет аккаунта? Зарегистрируйся!',
		section: 'to-signup',
	},
};

const config = {
	homeConfig,
	signupConfig,
	loginConfig,
};

const app = new App(config, root);
app.goToPage(window.location.pathname);
