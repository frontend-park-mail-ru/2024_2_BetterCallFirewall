import { IAppConfig, IHomeConfig, PAGE_LINKS, URLInterface } from './app';
import { ILoginFormConfig, ISignupFormConfig } from './components';
import Validator from './modules/validation';

const DEBUG: boolean = false;

const homeConfig: IHomeConfig = {
	menu: {
		key: 'menu',
		title: {
			key: 'title',
			text: 'Vilka',
			href: PAGE_LINKS.feed,
		},
		links: {
			feed: {
				key: 'feed',
				text: 'Лента',
				href: PAGE_LINKS.feed,
			},
		},
	},
	main: {
		key: 'main',
		className: 'main',
		section: 'main',
		header: {
			key: 'header',
			profile: {
				avatar: 'img/avatar.png',
			},
		},
		content: {
			key: 'content',
			className: 'content',
		},
		aside: {
			key: 'aside',
			className: 'aside',
		},
	},
};

const signupConfig: ISignupFormConfig = {
	key: 'signupForm',
	inputs: {
		firstName: {
			key: 'firstName',
			type: 'text',
			text: 'Имя',
			name: 'first_name',
			validator: Validator.validateName,
		},
		secondName: {
			key: 'secondName',
			type: 'text',
			text: 'Фамилия',
			name: 'second_name',
			validator: Validator.validateName,
		},
		email: {
			key: 'email',
			type: 'text',
			text: 'Email',
			name: 'email',
			validator: Validator.validateEmail,
		},
		password: {
			key: 'password',
			type: 'password',
			text: 'Пароль',
			name: 'password',
			validator: Validator.validatePassword,
		},
		passwordAgain: {
			key: 'passwordAgain',
			type: 'password',
			text: 'Повторите пароль',
			name: 'password_again',
			validator: Validator.validateConfirmation,
		},
	},
	button: {
		key: 'submitButton',
		text: 'Зарегистрироваться!',
	},
	toLoginLink: {
		key: 'toLogin',
		href: PAGE_LINKS.login,
		text: 'Уже есть аккаунт? Войти!',
	},
};

const loginConfig: ILoginFormConfig = {
	key: 'loginForm',
	inputs: {
		email: {
			key: 'email',
			type: 'text',
			text: 'Email',
			name: 'email',
			validator: Validator.validateEmail,
		},
		password: {
			key: 'password',
			type: 'password',
			text: 'Пароль',
			name: 'password',
			validator: Validator.validatePassword,
		},
	},
	button: {
		key: 'submitButton',
		text: 'Войти!',
	},
	toSignupLink: {
		key: 'toSignupLink',
		href: PAGE_LINKS.signup,
		text: 'Нет аккаунта? Зарегистрируйся!',
	},
};

const root: string = DEBUG
	? 'http://127.0.0.1:8000'
	: 'http://185.241.194.197:8080';

const URL: URLInterface = DEBUG
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

const config: IAppConfig = {
	URL,
	homeConfig,
	signupConfig,
	loginConfig,
};

export default config;
