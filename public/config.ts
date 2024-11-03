import { AppConfig, URLInterface } from './app';
import { ILoginFormConfig, ISignupFormConfig } from './components';
import { IChatConfig } from './components/Chat/Chat';
import { IMessagesConfig } from './components/Message/Message';
import { IProfileConfig } from './components/Profile/Profile';
import Validator from './modules/validation';
import { ViewChatConfig } from './views/chat/viewChat';
import { ViewMessagesConfig } from './views/messages/viewMessages';
import { ViewFeedConfig } from './views/feed/viewFeed';
import { ViewFriendsConfig } from './views/friends/viewFriends';
import { HomeConfig } from './views/home/viewHome';
import { ViewProfileConfig } from './views/profile/viewProfile';
import { ViewCreatePostConfig } from './views/createPost/viewCreatePost';
import { ViewProfileEditConfig } from './views/profileEdit/viewProfileEdit';

const DEBUG: boolean = true;

export const PAGE_LINKS = {
	feed: '/feed',
	login: '/login',
	signup: '/signup',
	messages: '/messages',
	chat: '/chat',
	friends: '/friends',
	createPost: '/create-post',
	profileEdit: '/profile-edit',
	profile: '/([\\w-]+)', // ????
	// profile: '/', // ????
};

const homeConfig: HomeConfig = {
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
				icon: `
				<svg claas="logo__feed" viewBox="0 0 20 21" fill="none">
					<path d="M18.8256 8.92346L11.3256 1.42346C10.974 1.07195 10.4972 0.874481 10 0.874481C9.50283 0.874481 9.026 1.07195 8.67438 1.42346L1.17438 8.92346C0.999566 9.0972 0.860985 9.30393 0.766679 9.53165C0.672372 9.75937 0.624218 10.0035 0.62501 10.25V19.25C0.62501 19.5484 0.743536 19.8345 0.954515 20.0455C1.16549 20.2565 1.45164 20.375 1.75001 20.375H18.25C18.5484 20.375 18.8345 20.2565 19.0455 20.0455C19.2565 19.8345 19.375 19.5484 19.375 19.25V10.25C19.3758 10.0035 19.3276 9.75937 19.2333 9.53165C19.139 9.30393 19.0005 9.0972 18.8256 8.92346ZM17.125 18.125H2.87501V10.4047L10 3.27971L17.125 10.4047V18.125Z"/>
				</svg>`,
			},
			profile: {
				key: 'profile',
				text: 'Профиль',
				href: PAGE_LINKS.profile,
				icon: `
				<svg class="logo__profile" viewBox="0 0 20 20">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M10 9.99998C7.7835 9.99998 5.98096 8.20598 5.98096 5.99998C5.98096 3.79398 7.7835 1.99998 10 1.99998C12.2165 1.99998 14.019 3.79398 14.019 5.99998C14.019 8.20598 12.2165 9.99998 10 9.99998ZM13.7759 10.673C15.3705 9.39596 16.2999 7.33093 15.9582 5.06993C15.5614 2.44693 13.369 0.347977 10.7224 0.0419769C7.07012 -0.381023 3.97144 2.44898 3.97144 5.99998C3.97144 7.88998 4.8516 9.57396 6.22411 10.673C2.85213 11.934 0.390463 14.895 0.00463406 18.891C-0.0516319 19.482 0.411567 20 1.0084 20C1.51982 20 1.95589 19.616 2.0011 19.109C2.40401 14.646 5.83728 12 10 12C14.1627 12 17.596 14.646 17.9989 19.109C18.0441 19.616 18.4802 20 18.9916 20C19.5884 20 20.0516 19.482 19.9954 18.891C19.6095 14.895 17.1479 11.934 13.7759 10.673Z"/>
				</svg>`,
			},
			friends: {
				key: 'friends',
				text: 'Друзья',
				href: PAGE_LINKS.friends,
				icon: `
				<svg class="logo__friends" viewBox="0 0 24 24">
				<path d="M11.7352 14.7131C12.6775 13.9211 13.3533 12.8585 13.6711 11.6694C13.989 10.4802 13.9334 9.22211 13.5119 8.06563C13.0904 6.90916 12.3234 5.9103 11.315 5.20451C10.3066 4.49871 9.10548 4.12015 7.8746 4.12015C6.64371 4.12015 5.44261 4.49871 4.43418 5.20451C3.42575 5.9103 2.65879 6.90916 2.23731 8.06563C1.81583 9.22211 1.76024 10.4802 2.07805 11.6694C2.39587 12.8585 3.07173 13.9211 4.01397 14.7131C2.54264 15.3784 1.26758 16.4116 0.311784 17.7131C0.13525 17.9537 0.0615074 18.2545 0.10678 18.5495C0.152052 18.8444 0.312631 19.1093 0.553191 19.2858C0.79375 19.4623 1.09459 19.5361 1.38952 19.4908C1.68445 19.4455 1.94931 19.2849 2.12585 19.0444C2.78748 18.1408 3.65281 17.4058 4.65163 16.8992C5.65046 16.3926 6.75464 16.1286 7.8746 16.1286C8.99455 16.1286 10.0987 16.3926 11.0976 16.8992C12.0964 17.4058 12.9617 18.1408 13.6233 19.0444C13.7999 19.2851 14.0648 19.4458 14.3598 19.4911C14.6548 19.5365 14.9558 19.4628 15.1965 19.2863C15.4372 19.1097 15.5979 18.8448 15.6432 18.5498C15.6886 18.2548 15.6149 17.9538 15.4383 17.7131C14.482 16.4118 13.2067 15.3787 11.7352 14.7131ZM4.1246 10.125C4.1246 9.38333 4.34453 8.65831 4.75659 8.04163C5.16864 7.42494 5.75431 6.94429 6.43953 6.66047C7.12476 6.37664 7.87876 6.30237 8.60618 6.44707C9.33361 6.59176 10.0018 6.94892 10.5262 7.47336C11.0507 7.99781 11.4078 8.666 11.5525 9.39343C11.6972 10.1209 11.623 10.8749 11.3391 11.5601C11.0553 12.2453 10.5747 12.831 9.95798 13.243C9.3413 13.6551 8.61628 13.875 7.8746 13.875C6.88003 13.875 5.92621 13.4799 5.22295 12.7767C4.51968 12.0734 4.1246 11.1196 4.1246 10.125ZM23.4465 19.2816C23.3274 19.3691 23.1922 19.4323 23.0487 19.4675C22.9051 19.5028 22.7561 19.5094 22.61 19.4871C22.4639 19.4647 22.3236 19.4137 22.1972 19.3371C22.0709 19.2605 21.9608 19.1598 21.8733 19.0406C21.2101 18.1387 20.3444 17.4051 19.3459 16.8987C18.3475 16.3923 17.2441 16.1273 16.1246 16.125C15.8262 16.125 15.5401 16.0065 15.3291 15.7955C15.1181 15.5845 14.9996 15.2984 14.9996 15C14.9996 14.7016 15.1181 14.4155 15.3291 14.2045C15.5401 13.9935 15.8262 13.875 16.1246 13.875C16.6576 13.8741 17.1843 13.7595 17.6695 13.539C18.1548 13.3184 18.5874 12.997 18.9386 12.5961C19.2899 12.1951 19.5516 11.7239 19.7063 11.2139C19.8611 10.7039 19.9054 10.1667 19.8362 9.6382C19.767 9.10971 19.5859 8.60203 19.3051 8.14903C19.0242 7.69602 18.65 7.30809 18.2074 7.0111C17.7648 6.71411 17.264 6.51488 16.7383 6.4267C16.2127 6.33852 15.6743 6.3634 15.159 6.4997C15.0151 6.54134 14.8643 6.55381 14.7155 6.53638C14.5667 6.51896 14.4228 6.47199 14.2924 6.39823C14.162 6.32446 14.0477 6.2254 13.9561 6.10685C13.8645 5.98829 13.7975 5.85264 13.759 5.70784C13.7206 5.56304 13.7114 5.41202 13.7321 5.26364C13.7528 5.11526 13.8029 4.9725 13.8795 4.84375C13.9561 4.715 14.0577 4.60285 14.1782 4.51388C14.2988 4.42491 14.4359 4.36091 14.5815 4.32564C15.8991 3.97651 17.2963 4.08644 18.5431 4.63733C19.7899 5.18822 20.812 6.14723 21.4411 7.35647C22.0701 8.56572 22.2687 9.95312 22.0041 11.2903C21.7395 12.6274 21.0274 13.8346 19.9852 14.7131C21.4566 15.3784 22.7316 16.4116 23.6874 17.7131C23.8627 17.9533 23.9357 18.2532 23.8906 18.5471C23.8454 18.841 23.6858 19.1051 23.4465 19.2816Z"/>
				</svg>`,
			},
			messages: {
				key: 'messages',
				text: 'Сообщения',
				href: PAGE_LINKS.messages,
				icon: `
				<svg class="logo__messages" viewBox="0 0 24 24" fill="none">
					<path d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>`,
			},
		},
	},
	main: {
		key: 'main',
		className: 'main',
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
	errorMessage: '',
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
			name: 'last_name',
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

const createPostConfig: ViewCreatePostConfig = {
    ...homeConfig,
    createPostForm: {
        key: 'createPostForm',
        textAreas: {
            text: {
                key: 'text',
                type: 'textarea',
                text: 'Текст поста',
                name: 'text', 
                validator: Validator.validatePost
            }
        },
        button: {
            key: 'submitButton',
            text: 'Опубликовать'
        }
    }
};


const profileEditConfig: ViewProfileEditConfig = {
	...homeConfig,
	profileEditForm: {
        key: 'profileEditForm',
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
				name: 'last_name',
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
		},
		button: {
			key: 'profileEditButton',
			text: 'Сохранить',
		},
	}
};

const feedConfig: ViewFeedConfig = {
	...homeConfig,
	posts: [],
};

const profileComponentConfig: IProfileConfig = {
	id: 0,
	key: 'profile',
	firstName: '',
	secondName: '',
	description: '',
	friendsCount: 0,
	groupsCount: 0,
	img: '',
};

const profileConfig: ViewProfileConfig = {
	...homeConfig,
	profile: profileComponentConfig,
};

const messagesComponentConfig: IMessagesConfig = {
	key: 'messages',
	avatar: '',
	name: '',
	lastMessage: '',
	date: '',
	unreadedCount: 0,
};

const messagesConfig: ViewMessagesConfig = {
	...homeConfig,
	messages: messagesComponentConfig,
};

const chatComponentConfig: IChatConfig = {
	key: 'chat',
	companionAvatar: '',
	companionName: '',
	lastDateOnline: '',
};

const chatConfig: ViewChatConfig = {
	...homeConfig,
	chat: chatComponentConfig,
};

const friendsConfig: ViewFriendsConfig = {
	...homeConfig,
};

export const ROOT: string = DEBUG
	? 'http://127.0.0.1:8000'
	: 'http://185.241.194.197:8080';

const URL: URLInterface = DEBUG
	? {
			signup: ROOT + '/auth/signup',
			login: ROOT + '/auth/login',
			logout: ROOT + '/auth/logout',
			post: ROOT + '/api/post',
			profile: ROOT + '/api/profile',
			profileYourOwn: ROOT + '/api/profile',
			header: ROOT + '/api/profile/header',
		}
	: {
			signup: ROOT + '/api/v1/auth/register',
			login: ROOT + '/api/v1/auth/login',
			logout: ROOT + '/api/v1/auth/logout',
			post: ROOT + '/api/v1/feed',
			profile: ROOT + '/api/v1/profile',
			profileYourOwn: ROOT + '/api/v1/profile',
			header: ROOT + '/api/v1/profile/header',
		};

const config: AppConfig = {
	URL,
	homeConfig,
	signupConfig,
	loginConfig,
	feedConfig,
	profileConfig,
	createPostConfig,
	profileEditConfig,
	messagesConfig,
	chatConfig,
	friendsConfig,
};

export default config;
