import { PAGE_LINKS } from './app.ts';
import Validator from './modules/validation.ts';

const DEBUG: boolean = false;

interface HomeConfig {
    menu : {
        key: string,
        title: {
            key: string,
            section: string,
            text: string,
            href: string,
        },
        links: {
            feed: {
                key: string,
                text: string,
                href: string,
            },
        },
    },
    main: MainConfig,
};

export interface MainConfig {
	key: string,
	className: string,
	section: string,
	header: {
		key: string,
		search: {
			placeholder: string,
			img: string,
		},
		profile: {
			logoutImg: string,
			avatar: string,
		},
	},
	content: {
		key: string,
		className: string,
		section: string,
	},
	aside: {
		key: string,
		className: string,
		section: string,
	},
}

const homeConfig: HomeConfig = {
	menu: {
		key: 'menu',
		title: {
			key: 'title',
			section: 'title',
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
			key: 'content',
			className: 'content',
			section: 'content',
		},
		aside: {
			key: 'aside',
			className: 'aside',
			section: 'aside',
		},
	},
};

export interface Input {
    type: string,
    text: string,
    name: string,
    validator: (name: HTMLInputElement) => string,
};

interface FormConfig {
    key: string,
    className: string,
    section: string,
    inputs: {
        [key: string]: Input,
    },
    button: {
        key: string,
        section: string,
        text: string,
    },
    toLoginLink?: {
        key: string,
        href: string,
        text: string,
        section: string,
    },
    toSignupLink?: {
        key: string,
        href: string,
        text: string,
        section: string,
    },
};

const signupConfig: FormConfig = {
	key: 'signupForm',
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
		key: 'submitButton',
        section: 'submit',
		text: 'Зарегистрироваться!',
	},
	toLoginLink: {
		key: 'toLogin',
		href: PAGE_LINKS.login,
		text: 'Уже есть аккаунт? Войти!',
		section: 'toLogin',
	},
};

const loginConfig: FormConfig = {
	key: 'loginForm',
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
		key: 'submitButton',
		section: 'submit',
		text: 'Войти!',
	},
	toSignupLink: {
		key: 'toSignupLink',
		href: PAGE_LINKS.signup,
		text: 'Нет аккаунта? Зарегистрируйся!',
		section: 'toSignup',
	},
};

const root: string = DEBUG ? 'http://127.0.0.1:8000' : 'http://185.241.194.197:8080';

interface URLInterface {
    signup: string,
    login: string,
    logout: string,
    post: string,
};
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


export interface ConfigInterface {
    URL: URLInterface,
    homeConfig: HomeConfig,
    signupConfig: FormConfig,
    loginConfig: FormConfig,
};
const config: ConfigInterface = {
	URL,
	homeConfig,
	signupConfig,
	loginConfig,
};

export default config;
