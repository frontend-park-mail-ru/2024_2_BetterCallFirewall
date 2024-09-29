import App, { PAGE_LINKS } from './app.js';
import Validator from './modules/validation.js';


const root = document.getElementById('root');

const homeConfig = {
	menu: {
		feed: {
			text: 'Новости',
			href: '/feed',
		},
		login: {
			text: 'Авторизация',
			href: '/login',
		},
		signup: {
			text: 'Регистрация',
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
			text: 'Имя',
			name: 'firstName',
			validator: Validator.validateName,
		},
		secondName: {
			type: 'text',
			text: 'Фамилия',
			name: 'secondName',
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
			text: 'Подтвердите пароль',
			name: 'passwordAgain',
			validator: Validator.validateConfirmation,
		},
	},
	button: {
		text: 'Зарегистрироваться !',
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
		text: 'Нет аккаунта? Зарегистрироваться!',
		section: 'toSignup',
	},
};

const config = {
	homeConfig,
	signupConfig,
	loginConfig,
};

const app = new App(config, root);
app.goToPage(window.location.pathname);
