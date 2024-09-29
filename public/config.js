import { PAGE_LINKS } from './app.js';
import Validator from './modules/validation.js';

const DEBUG = true;

const homeConfig = {
	menu: {
		title: {
			section: 'title',
			text: 'Vilka',
			href: PAGE_LINKS.feed,
		},
		links: {
			feed: {
				text: 'Лента',
				href: PAGE_LINKS.feed,
			},
		},
	},
	main: {
		className: 'main',
		section: 'main',
		header: {
			search: {
				placeholder: 'Поиск',
				img: 'img/search.svg',
			},
			profile: {
				logoutImg: 'img/logout.svg',
				avatar: 'img/avatar.png',
			},
		},
		content: {
			className: 'content',
			section: 'content',
		},
		aside: {
			className: 'aside',
			section: 'aside',
		},
	},
};

const signupConfig = {
	className: 'signup-form',
	section: 'signup',
	inputs: {
		firstName: {
			type: 'text',
			text: 'Имя',
			name: 'first_name',
			validator: Validator.validateName,
		},
		secondName: {
			type: 'text',
			text: 'Фамилия',
			name: 'second_name',
			validator: Validator.validateName,
		},
		email: {
			type: 'text',
			text: 'Email',
			name: 'email',
			validator: Validator.validateEmail,
		},
		password: {
			type: 'password',
			text: 'Пароль',
			name: 'password',
			validator: Validator.validatePassword,
		},
		passwordAgain: {
			type: 'password',
			text: 'Повторите пароль',
			name: 'password_again',
			validator: Validator.validateConfirmation,
		},
	},
	button: {
		text: 'Зарегистрироваться!',
	},
	toLoginLink: {
		href: PAGE_LINKS.login,
		text: 'Уже есть аккаунт? Войти!',
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
			validator: Validator.validateEmail,
		},
		password: {
			type: 'password',
			text: 'Пароль',
			name: 'password',
			validator: Validator.validatePassword,
		},
	},
	button: {
		section: 'submit',
		text: 'Войти!',
	},
	toSignupLink: {
		href: PAGE_LINKS.signup,
		text: 'Нет аккаунта? Зарегистрируйся!',
		section: 'toSignup',
	},
};

const root = DEBUG ? 'http://127.0.0.1:8000' : 'http://185.241.194.197:8080';
const URL = DEBUG
	? {
			signup: root + '/auth/signup',
			login: root + '/auth/login',
			logout: root + '/auth/logout',
			post: root + '/api/post',
		}
	: {
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
