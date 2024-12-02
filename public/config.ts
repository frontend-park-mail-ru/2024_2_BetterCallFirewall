import { AppConfig, URLInterface } from './app';
import { ILoginFormConfig, SignupFormConfig } from './components';
import { ChatConfig } from './components/Chat/Chat';
import { MessageConfig } from './components/Message/Message';
import { ProfileConfig } from './components/Profile/Profile';
import { ViewChatConfig } from './views/chat/viewChat';
import { ViewMessagesConfig } from './views/messages/viewMessages';
import { ViewFeedConfig } from './views/feed/viewFeed';
import { ViewFriendsConfig } from './views/friends/viewFriends';
import { HomeConfig } from './views/home/viewHome';
import { ViewProfileConfig } from './views/profile/viewProfile';
import { ViewCreatePostConfig } from './views/createPost/viewCreatePost';
import { ViewProfileEditConfig } from './views/profileEdit/viewProfileEdit';
import { ViewPostEditConfig } from './views/PostEdit/viewPostEdit';
import { PostEditFormConfig } from './components/PostEditForm/PostEditForm';
import Validator from './modules/validation';
import { ViewGroupsConfig } from './views/groups/viewGroups';
import { ViewGroupPageConfig } from './views/groupPage/viewGroupPage';
import { GroupPageConfig } from './components/GroupPage/GroupPage';
import { ViewCreateGroupConfig } from './views/createGroup/viewCreateGroup';
import { ICreateGroupFormConfig } from './components/CreateGroupForm/CreateGroupForm';
import { IGroupEditFormConfig } from './components/GroupEditForm/GroupEditForm';
import { ViewGroupEditConfig } from './views/groupEdit/viewGroupEdit';

const DEBUG: boolean = false;

export const ROOT: string = DEBUG
	? 'http://127.0.0.1:8000'
	: 'http://vilka.online';

export const PAGE_URLS = {
	feed: '/feed',
	login: '/login',
	signup: '/signup',
	messages: '/chat',
	chat: '/chat',
	friends: '/friends',
	createPost: '/create-post',
	profileEdit: '/profile-edit',
	profile: '',
	postEdit: '/post-edit',
	groups: '/groups',
	createGroup: '/create-group',
	groupPage: '/groups',
	groupEdit: '/group-edit',
	csat: '/csat/question',
	question: '/csat/question',
	metrics: '/csat/metrics',
};

export const PAGE_LINKS = { ...PAGE_URLS };
PAGE_LINKS.groupPage += '/\\d+';
PAGE_LINKS.chat += '/\\d+';
PAGE_LINKS.profile += '/([\\w-]+)';

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
				<svg class="logo__feed" viewBox="0 0 20 21" fill="none">
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
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M3 7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>`,
			},
			groups: {
				key: 'groups',
				text: 'Группы',
				href: PAGE_LINKS.groups,
				icon: `	
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.125 6C7.125 5.70163 7.24353 5.41548 7.45451 5.2045C7.66548 4.99353 7.95163 4.875 8.25 4.875H20.25C20.5484 4.875 20.8345 4.99353 21.0455 5.2045C21.2565 5.41548 21.375 5.70163 21.375 6C21.375 6.29837 21.2565 6.58452 21.0455 6.7955C20.8345 7.00647 20.5484 7.125 20.25 7.125H8.25C7.95163 7.125 7.66548 7.00647 7.45451 6.7955C7.24353 6.58452 7.125 6.29837 7.125 6ZM20.25 10.875H8.25C7.95163 10.875 7.66548 10.9935 7.45451 11.2045C7.24353 11.4155 7.125 11.7016 7.125 12C7.125 12.2984 7.24353 12.5845 7.45451 12.7955C7.66548 13.0065 7.95163 13.125 8.25 13.125H20.25C20.5484 13.125 20.8345 13.0065 21.0455 12.7955C21.2565 12.5845 21.375 12.2984 21.375 12C21.375 11.7016 21.2565 11.4155 21.0455 11.2045C20.8345 10.9935 20.5484 10.875 20.25 10.875ZM20.25 16.875H8.25C7.95163 16.875 7.66548 16.9935 7.45451 17.2045C7.24353 17.4155 7.125 17.7016 7.125 18C7.125 18.2984 7.24353 18.5845 7.45451 18.7955C7.66548 19.0065 7.95163 19.125 8.25 19.125H20.25C20.5484 19.125 20.8345 19.0065 21.0455 18.7955C21.2565 18.5845 21.375 18.2984 21.375 18C21.375 17.7016 21.2565 17.4155 21.0455 17.2045C20.8345 16.9935 20.5484 16.875 20.25 16.875ZM4.125 10.5C3.82833 10.5 3.53832 10.588 3.29165 10.7528C3.04497 10.9176 2.85271 11.1519 2.73918 11.426C2.62565 11.7001 2.59594 12.0017 2.65382 12.2926C2.7117 12.5836 2.85456 12.8509 3.06434 13.0607C3.27412 13.2704 3.54139 13.4133 3.83237 13.4712C4.12334 13.5291 4.42494 13.4994 4.69903 13.3858C4.97312 13.2723 5.20738 13.08 5.37221 12.8334C5.53703 12.5867 5.625 12.2967 5.625 12C5.625 11.6022 5.46697 11.2206 5.18566 10.9393C4.90436 10.658 4.52283 10.5 4.125 10.5ZM4.125 4.5C3.82833 4.5 3.53832 4.58797 3.29165 4.7528C3.04497 4.91762 2.85271 5.15189 2.73918 5.42597C2.62565 5.70006 2.59594 6.00166 2.65382 6.29264C2.7117 6.58361 2.85456 6.85088 3.06434 7.06066C3.27412 7.27044 3.54139 7.4133 3.83237 7.47118C4.12334 7.52906 4.42494 7.49935 4.69903 7.38582C4.97312 7.27229 5.20738 7.08003 5.37221 6.83336C5.53703 6.58668 5.625 6.29667 5.625 6C5.625 5.60218 5.46697 5.22064 5.18566 4.93934C4.90436 4.65804 4.52283 4.5 4.125 4.5ZM4.125 16.5C3.82833 16.5 3.53832 16.588 3.29165 16.7528C3.04497 16.9176 2.85271 17.1519 2.73918 17.426C2.62565 17.7001 2.59594 18.0017 2.65382 18.2926C2.7117 18.5836 2.85456 18.8509 3.06434 19.0607C3.27412 19.2704 3.54139 19.4133 3.83237 19.4712C4.12334 19.5291 4.42494 19.4994 4.69903 19.3858C4.97312 19.2723 5.20738 19.08 5.37221 18.8334C5.53703 18.5867 5.625 18.2967 5.625 18C5.625 17.6022 5.46697 17.2206 5.18566 16.9393C4.90436 16.658 4.52283 16.5 4.125 16.5Z" />
				</svg>`,
			},
		},
	},
	main: {
		key: 'main',
		className: 'main',
		header: {
			key: 'header',
			search: {
				img: `${ROOT}/img/search.svg`,
				placeholder: 'Поиск друзей, сообществ',
			},
			profile: {
				id: -1,
				name: '',
				avatar: 'img/avatar.png',
			},
			showSearchResults: false,
			profilesSearch: [],
			groupsSearch: [],
			searchInfoMessage: '',
		},
		content: {
			key: 'content',
			className: 'content',
			errorMessage: '',
			infoMessage: '',
			showLoader: false,
		},
		aside: {
			key: 'aside',
			className: 'aside',
		},
	},
	csat: {
		key: 'csat',
		src: PAGE_LINKS.csat,
		show: false,
	},
};

const signupConfig: SignupFormConfig = {
	key: 'signupForm',
	inputs: {
		firstName: {
			key: 'firstName',
			type: 'text',
			placeholder: 'Имя',
			name: 'first_name',
		},
		secondName: {
			key: 'secondName',
			type: 'text',
			placeholder: 'Фамилия',
			name: 'last_name',
		},
		email: {
			key: 'email',
			type: 'text',
			placeholder: 'Email',
			name: 'email',
		},
		password: {
			key: 'password',
			type: 'password',
			placeholder: 'Пароль',
			name: 'password',
		},
		passwordAgain: {
			key: 'passwordAgain',
			type: 'password',
			placeholder: 'Повторите пароль',
			name: 'password_again',
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
			placeholder: 'Email',
			name: 'email',
		},
		password: {
			key: 'password',
			type: 'password',
			placeholder: 'Пароль',
			name: 'password',
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
				header: 'Текст поста',
				text: '',
				name: 'text',
			},
		},
		inputs: {
			image: {
				key: 'image-input',
				name: 'file',
				type: 'file',
				accept: 'image/*',
				placeholder: 'Прикрепить картинку',
				// extra: 'multiple',
			},
		},
		button: {
			key: 'submitButton',
			text: 'Опубликовать',
		},
	},
};

const profileEditConfig: ViewProfileEditConfig = {
	...homeConfig,
	profileEditForm: {
		key: 'profileEditForm',
		inputs: {
			firstName: {
				key: 'firstName',
				type: 'text',
				placeholder: 'Имя',
				name: 'first_name',
			},
			secondName: {
				key: 'secondName',
				type: 'text',
				placeholder: 'Фамилия',
				name: 'last_name',
			},
			description: {
				key: 'description',
				type: 'text',
				placeholder: 'Описание',
				name: 'bio',
			},
			avatar: {
				key: 'avatar',
				name: 'file',
				type: 'file',
				accept: 'image/*',
				placeholder: 'Изменить аватар',
				// extra: 'multiple',
			},
		},

		button: {
			key: 'profileEditButton',
			text: 'Сохранить',
		},
	},
};

const feedConfig: ViewFeedConfig = {
	...homeConfig,
	posts: [],
	pendingPostRequest: false,
};

const profileComponentConfig: ProfileConfig = {
	id: -1,
	key: 'profile',
	firstName: '',
	secondName: '',
	description: '',
	friendsCount: -1,
	groupsCount: -1,
	img: '',
	createPostHref: PAGE_LINKS.createPost,
	editProfileHref: PAGE_LINKS.profileEdit,
	isAuthor: false,
	isFriend: false,
	isSubscriber: false,
	isSubscription: false,
	isUnknown: false,
	posts: [],
};

const profileConfig: ViewProfileConfig = {
	...homeConfig,
	profile: profileComponentConfig,
	path: '/',
};

const messagesComponentConfig: MessageConfig[] = [];

const messagesConfig: ViewMessagesConfig = {
	...homeConfig,
	messages: messagesComponentConfig,
};

const emptyChatComponentConfig: ChatConfig = {
	companionId: -1,
	key: 'chat',
	companionAvatar: '',
	companionName: '',
	lastDateOnline: '',
	backButtonHref: PAGE_LINKS.messages,
	messages: [],
	myId: -1,
	myName: '',
	myAvatar: '',
	inputText: '',
	inputKey: 'chat-input',
};

const chatConfig: ViewChatConfig = {
	...homeConfig,
	chat: emptyChatComponentConfig,
};

const friendsConfig: ViewFriendsConfig = {
	...homeConfig,
	friends: {
		key: 'friends',
		headerText: 'Друзья',
		friendsConfig: [],
	},
	subscribers: {
		key: 'subscribers',
		headerText: 'Подписчики',
		friendsConfig: [],
	},
	subscriptions: {
		key: 'subscriptions',
		headerText: 'Подписки',
		friendsConfig: [],
	},
	users: {
		key: 'users',
		headerText: 'Все люди',
		friendsConfig: [],
	},
	pendingUsersRequest: false,
};

const groupsConfig: ViewGroupsConfig = {
	...homeConfig,
	groups: {
		key: 'groups',
		headerText: 'Группы',
		groupsConfig: [],
	},
};

const groupPageComponentConfig: GroupPageConfig = {
	id: -1,
	key: 'group',
	name: '',
	description: '',
	img: '',
	posts: [],
	isFollow: false,
	createPostHref: PAGE_LINKS.createPost,
	isAdmin: false,
	countSubscribers: 0,
};

const groupPageConfig: ViewGroupPageConfig = {
	...homeConfig,
	groupPage: groupPageComponentConfig,
	path: '/', //??
};

const groupFormConfig: ICreateGroupFormConfig = {
	key: 'createGroupForm',
	inputs: {
		name: {
			key: 'name',
			type: 'text',
			placeholder: 'Название группы',
			name: 'name',
		},
		description: {
			key: 'description',
			type: 'text',
			placeholder: 'Описание группы',
			name: 'description',
		},
		avatar: {
			key: 'avatar',
			name: 'file',
			type: 'file',
			accept: 'image/*',
			placeholder: 'Добавить фото',
		},
	},
	button: {
		key: 'submitButton',
		text: 'Создать группу',
	},
};

const createGroupConfig: ViewCreateGroupConfig = {
	...homeConfig,
	createGroupForm: groupFormConfig,
};

const editGroupFormConfig: IGroupEditFormConfig = {
	key: 'editGroupForm',
	inputs: {
		name: {
			key: 'name',
			type: 'text',
			placeholder: 'Название группы',
			name: 'name',
		},
		description: {
			key: 'description',
			type: 'text',
			placeholder: 'Описание группы',
			name: 'description',
		},
		avatar: {
			key: 'avatar',
			name: 'file',
			type: 'file',
			accept: 'image/*',
			placeholder: 'Изменить фото',
		},
	},
	button: {
		key: 'submitButton',
		text: 'Изменить группу',
	},
};

const editGroupConfig: ViewGroupEditConfig = {
	...homeConfig,
	groupEditForm: editGroupFormConfig,
	groupId: -1,
};

const postEditFormConfig: PostEditFormConfig = {
	key: 'postEditForm',
	textAreas: {
		text: {
			key: 'text',
			type: 'textarea',
			header: 'Текст поста',
			text: '',
			name: 'text',
		},
	},
	inputs: {
		image: {
			key: 'image',
			name: 'file',
			type: 'file',
			accept: 'image/*',
			placeholder: 'Изменить картинку',
			// extra: 'multiple',
		},
	},
	button: {
		key: 'submitButton',
		text: 'Сохранить пост',
	},
};

const editPostConfig: ViewPostEditConfig = {
	...homeConfig,
	postEditForm: postEditFormConfig,
	postId: -1,
};

const ROOT_WS = ROOT.replace('http', 'ws');

const apiv1 = '/api/v1';

const URL: URLInterface = DEBUG
	? {
			signup: ROOT + '/auth/signup',
			login: ROOT + '/auth/login',
			logout: ROOT + '/auth/logout',
			feed: ROOT + '/api/post',
			profile: ROOT + '/api/profile',
			profileYourOwn: ROOT + '/api/profile',
			profiles: ROOT + '/api/profiles',
			subscribers: ROOT + '/api/profile/{id}/subscribers',
			header: ROOT + '/api/profile/header',
			friends: ROOT + '/api/profile/{id}/friends',
			subscribeToProfile: ROOT + '/api/profile/{id}/friend/subscribe',
			acceptFriend: '',
			unsubscribeFromProfile: '',
			removeFriend: '',
			profileSubscriptions: '',
			post: '',
			messages: '',
			chat: '',
			chatWS: '',
			postLike: '',
			postUnlike: '',
			postLikeCount: '',
			groups: '',
			group: '',
			groupEdit: '',
			groupJoin: '',
			groupLeave: '',
			profilesSearch: '',
			groupsSearch: '',
			csat: '',
			csatMetrics: '',
			image: '',
		}
	: {
			signup: ROOT + '/api/v1/auth/register',
			login: ROOT + '/api/v1/auth/login',
			logout: ROOT + '/api/v1/auth/logout',
			feed: ROOT + '/api/v1/feed',
			profile: ROOT + '/api/v1/profile',
			profileYourOwn: ROOT + '/api/v1/profile',
			profiles: ROOT + '/api/v1/profiles',
			subscribers: ROOT + '/api/v1/profile/{id}/subscribers',
			header: ROOT + '/api/v1/profile/header',
			friends: ROOT + '/api/v1/profile/{id}/friends',
			subscribeToProfile: ROOT + '/api/v1/profile/{id}/friend/subscribe',
			acceptFriend: ROOT + '/api/v1/profile/{id}/friend/accept',
			unsubscribeFromProfile:
				ROOT + '/api/v1/profile/{id}/friend/unsubscribe',
			removeFriend: ROOT + '/api/v1/profile/{id}/friend/remove',
			profileSubscriptions: ROOT + apiv1 + '/profile/{id}/subscriptions',
			post: ROOT + apiv1 + '/feed/{id}',
			messages: ROOT + apiv1 + '/messages/chats',
			chat: ROOT + apiv1 + '/messages/chat/{id}',
			chatWS: ROOT_WS + apiv1 + '/message/ws',
			postLike: ROOT + apiv1 + '/feed/{id}/like',
			postUnlike: ROOT + apiv1 + '/feed/{id}/unlike',
			postLikeCount: ROOT + apiv1 + '/like/count/post/{id}',
			groups: ROOT + apiv1 + '/community',
			group: ROOT + apiv1 + '/community/{id}',
			groupEdit: ROOT + apiv1 + '/community/{id}',
			groupJoin: ROOT + apiv1 + '/community/{id}/join',
			groupLeave: ROOT + apiv1 + '/community/{id}/leave',
			profilesSearch: ROOT + apiv1 + '/profile/search/',
			groupsSearch: ROOT + apiv1 + '/community/search/',
			csat: ROOT + apiv1 + '/csat',
			csatMetrics: ROOT + apiv1 + '/csat/metrics',
			image: ROOT + '/image',
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
	groupsConfig,
	createGroupConfig,
	groupPageConfig,
	editPostConfig,
	editGroupConfig,
	questionConfig: {
		question: {
			id: 1,
			key: 'question',
			name: 'Насколько вы готовы рекомендовать  Vilka друзьям и знакомым?',
			scoresConfig: [
				{
					key: '1',
					id: 1,
					color: `score-${1}`,
				},
				{
					key: '2',
					id: 2,
					color: `score-${2}`,
				},
				{
					key: '3',
					id: 3,
					color: `score-${3}`,
				},
				{
					key: '4',
					id: 4,
					color: `score-${4}`,
				},
				{
					key: '5',
					id: 5,
					color: `score-${5}`,
				},
			],
		},
	},
	metricsConfig: {
		metrics: {
			key: 'metrics',
			id: 1,
			metricsConfig: [
				{
					key: 'score',
					id: 1,
					name: 'Насколько вы довольны Vilka?',
					average: 4,
				},
				{
					key: 'score',
					id: 2,
					name: 'Оцените общение в сервисе',
					average: 4,
				},
			],
		},
	},
};

export const validators: Record<string, (value: string | File) => string> = {
	first_name: (value) => Validator.validateName(value as string),
	last_name: (value) => Validator.validateName(value as string),
	email: (value) => Validator.validateEmail(value as string),
	password: (value) => Validator.validatePassword(value as string),
	password_again: (value) => Validator.validateConfirmation(value as string),
	text: (value) => Validator.validatePost(value as string),
	file: (value) => Validator.validateImg(value as File),
	bio: (value) => Validator.validatePost(value as string),
	avatar: (value) => Validator.validateImg(value as File),
	description: (value) => Validator.validateDescription(value as string),
	name: (value) => Validator.validateName(value as string),
};

interface Question {
	name: string;
}

export const questionNames: Question[] = [
	{
		name: 'Насколько вы довольны Vilka?',
	},
	{
		name: 'Оцените общение в сервисе',
	},
];

export default config;
