'use strict';

class MenuLink {
	constructor(config) {
		const link = document.createElement('a');
		link.textContent = config.text;
		link.href = config.href;
		this.element = link;
		this.onClick = config.onClick;
		this.parent = null;
		this.clickHandler = null;
		this.active = false;
	}
	render(parent) {
		this.parent = parent;
		parent.element.appendChild(this.element);
		this.clickHandler = (event) => {
			event.preventDefault();
			const pageContent = root.content.main.content.pageContent;
			pageContent.clear();
			window.history.pushState(null, null, `${this.element.href}`);
			pageContent[this.onClick]();
		};
		this.element.addEventListener('click', this.clickHandler);
	}
	clear() {
		this.parent.element.removeChild(this.element);
		this.element.removeEventListener('click', this.clickHandler);
		this.clickHandler = null;
	}
}

class Menu {
	constructor(config) {
		const menu = document.createElement('div');
		menu.className = 'menu';
		this.element = menu;
		this.content = {};
		Object.entries(config).forEach(([key, subConfig]) => {
			const link = new MenuLink(subConfig);
			link.element.className = 'menu-link';
			this.content[key] = link;
		});
	}
	render(parent) {
		parent.element.appendChild(this.element);
		Object.entries(this.content).forEach(([key, obj]) => {
			obj.render(this);
		});
	}
}

class Header {
	constructor(config) {
		const title = document.createElement('div');
		title.className = config.className;
		title.textContent = config.title.text;
		this.element = title;
	}
	render(parent) {
		parent.element.appendChild(this.element);
	}
}

class PageContent {
	constructor(config) {
		const content = document.createElement('div');
		content.className = config.className;
		this.element = content;
	}
	clear() {
		this.element.innerHTML = '';
		// Потом добавить удаление элементов по цепочке
	}
	render(parent) {
		this.parent = parent;
		parent.element.appendChild(this.element);
	}
	renderFeed() {
		const requestUrl = 'http://127.0.0.1:8080';
		const request = new Request(requestUrl + '/api/post', {
			method: 'get',
		});
		ajax(request, (data) => {
			const content = document.createElement('span');
			console.log(data.text);
			content.textContent = data.text;
			const post = new Post(content);
			console.log('post:', post);
			this.element.appendChild(post.element);
			console.log(post);
			console.log(this.element);
		});
		for (let i = 0; i < 10; i++) {
			const content = document.createElement('div');
			content.textContent = 'Это будущий контент';
			this.element.appendChild(content);
		}
	}
	renderSettings() {
		const login = document.createElement('input');
		this.element.appendChild(login);
	}
}

class Main {
	constructor(config) {
		const main = document.createElement('div');
		main.className = 'main';
		this.element = main;
		this.content = {};

		const header = new Header(config.header);
		this.content.header = header;

		const pageContent = new PageContent(config.pageContent);
		this.content.pageContent = pageContent;
	}
	render(parent) {
		parent.element.appendChild(this.element);
		Object.entries(this.content).forEach(([key, obj]) => {
			obj.render(this);
		});
	}
}

class Root {
	constructor(config) {
		const root = document.getElementById('root');
		this.element = root;
		this.content = {};

		const menu = new Menu(config.menu);
		this.content.menu = menu;

		const main = new Main(config.main);
		this.content.main = main;
	}
	render() {
		this.content.menu.render(this);
		this.content.main.render(this);
	}
}

const config = {
	menu: {
		feed: {
			text: 'feed',
			href: '/feed',
			onClick: 'renderFeed',
		},
		settings: {
			text: 'settings',
			href: '/settings',
			onClick: 'renderSettings',
		},
	},
	main: {
		header: {
			title: {
				text: 'Здесь когда-то будет нормальный header',
			},
			className: 'header',
		},
		pageContent: {
			className: 'content',
		},
	},
};

class Post {
	constructor(...htmlElements) {
		const post = document.createElement('div');
		post.className = 'post';
		htmlElements.forEach((el) => {
			post.appendChild(el);
		});
		this.element = post;
	}
	render(parent) {
		parent.element.appendChild(this.element);
	}
}

const ajax = (request, callback) => {
	fetch(request)
		.then((response) => {
			// console.log('response:', response);
			return response.json();
		})
		.then((data) => {
			// console.log('data:', data);
			callback(data);
		})
		.catch((error) => {
			console.log(error);
		});
};

const root = new Root(config);
root.render();

const pageContent = root.content.main.content.pageContent;
pageContent.renderFeed();

// const menu = {
//     feed: {
//         href: '/feed',
//         text: 'feed',
//         render: null,
//     },
//     messages: {
//         href: '/messages',
//         text: 'messages',
//         render: null,
//     },
//     profile:  {
//         href: '/profile',
//         text: 'profile',
//         render: null,
//     },
//     friends:  {
//         href: '/friends',
//         text: 'friends',
//         render: null,
//     },
//     community:  {
//         href: '/community',
//         text: 'community',
//         render: null,
//     },
//     settings:  {
//         href: '/settings',
//         text: 'settings',
//         render: null,
//     },
// };

// const main= {
//     header:{
//         innerContent: null,
//         element: null
//     },
//     content: {
//         innerContent: null,
//         element: null
//     },
//     element: null,
// }

// const state = {
//     menu: menu,
//     main: main
// };

// const init = () => {
//     Object.entries(state).forEach(([key]) => {
//         const element = document.createElement('div');
//         element.className = key;
//         state[key].element = element;
//         root.appendChild(element);
//     });
//     renderMenu();
//     renderMain();
// }

// const renderMenu = () => {
//     console.log(menu);
//     console.log(Object.entries(menu));
//     Object.entries(menu).forEach(([key, {href, text}]) => {
//         console.log(key);
//         const menuElement = document.createElement('a');
//         menuElement.href = href;
//         menuElement.text = text;
//         menuElement.className = 'menu-link';
//         const menuContainer = state.menu.element;
//         menuContainer.appendChild(menuElement);
//         state.menu[key].element = menuElement;
//         menuElement.addEventListener('click', (event) => {
//             event.preventDefault();
//             state.main.content.element.removeChild(state.main.content.innerContent);
//             state.menu[key].render(state.main.content);
//             window.history.pushState(null,null,`${key}`);
//         });
//         console.log(menuElement);
//     });
//     console.log(state.menu.element);
// }

// const renderMain = () => {
//     const mainContainer = state.main.element;
//     state.main.element = mainContainer;

//     const header = document.createElement('div');
//     header.className = 'header';
//     header.innerContent = createHeader();
//     header.appendChild(header.innerContent);
//     mainContainer.appendChild(header);
//     state.main.header.element = header;

//     const contentContainer = document.createElement('div');
//     mainContainer.appendChild(contentContainer);
//     state.main.content.element = contentContainer;

//     state.menu.feed.render(state.main.content);
// }

// const createHeader = () => {
//     const headerContainer = document.createElement('div')
//     headerContainer.textContent = 'Здесь когда-то будет нормальный header';
//     return headerContainer;
// }

// state.menu.feed.render = (section) => {
//     const innerContainer = document.createElement('div');
//     for (let i = 0; i < 1000; i++) {
//         const dopContent = document.createElement('div')
//         dopContent.textContent = 'Это будущий контент';
//         innerContainer.appendChild(dopContent);
//     }
//     section.innerContent = innerContainer;
//     section.element.appendChild(innerContainer);
// }

// state.menu.settings.render = (section) => {
//     const innerContainer = document.createElement('div');
//     const login = document.createElement('input');
//     innerContainer.appendChild(login);
//     section.innerContent = innerContainer;
//     section.element.appendChild(innerContainer);
// }

// state.menu.messages

// init();
