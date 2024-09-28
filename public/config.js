import { PAGE_LINKS } from './app.js';
import {
	validateName,
	validateEmail,
	validateConfirmation,
	validatePassword,
} from './modules/validation.js';

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
			name: 'first_name',
			validator: validateName,
		},
		secondName: {
			type: 'text',
			text: 'Second Name',
			name: 'second_name',
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
			name: 'password_again',
			validator: validateConfirmation,
		},
	},
	button: {
		text: 'Sign Up!',
	},
	toLoginLink: {
		href: PAGE_LINKS.login,
		text: 'Уже есть аккаунт? Войди!',
		section: 'toLogin',
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
		section: 'toSignup',
	},
};

const root = 'http://185.241.194.197:8080';
const URL = {
	signup: root + '/api/v1/auth/register',
	login: root + '/api/v1/auth/login',
	logout: root + '/api/v1/auth/logout',
	post: root + '/api/v1/post',
};

const config = {
	URL,
	homeConfig,
	signupConfig,
	loginConfig,
};

export default config;
