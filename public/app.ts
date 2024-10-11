import { Root } from './components/index.js';
import {
    HomePage,
    homePageTypes,
    LoginPage,
    SignupPage,
} from './pages/index';
import { ConfigInterface } from './config'

/**
 * Links to pages
 * @constant
 */
export const PAGE_LINKS = {
    feed: '/feed',
    login: '/login',
    signup: '/signup',
};

export const PAGES = {
    home: 'home',
    login: 'login',
    signup: 'signup',
};

interface Page {
    render(pageLink: string): void;
    structure: Record<string, any>;
}

/**
 * Main class of application
 */
export default class App {
    private state: {
        currentPage: Page | null;
    } = {
        currentPage: null,
    };
    private pages: {
        home: HomePage,
        login: LoginPage,
        signup: SignupPage,
    };
    #structure: Record<string, any> = {};
    #config: ConfigInterface;
    root: Root;

    /**
     * Instance of application
     *
     * @param {Object} config - config of application
     * @param {HTMLElement} root - root element
     */
    constructor(config: ConfigInterface) {
        this.#config = config;
        this.root = new Root();
        this.state.currentPage = null;
        this.pages = {
            home: new HomePage(this),
            login: new LoginPage(this),
            signup: new SignupPage(this),
        };
    }

    /**
     * Возвращает конфигурационный объект приложения
     * @returns {Object}
     */
    get config(): object {
        return this.#config;
    }

    /**
     * Возвращает объект стуктуры приложения
     * @returns {Object}
     */
    get structure(): object {
        return this.structure;
    }

    /**
     * Routing pages
     *
     * @param {string} pageLink
     */
    render(pageLink: string) {
        let pageType: string = '';
        switch (pageLink) {
            case PAGE_LINKS.signup:
                history.pushState({}, '', PAGE_LINKS.signup);
                this.state.currentPage = this.pages.signup;
                break;
            case PAGE_LINKS.login:
                history.pushState({}, '', PAGE_LINKS.login);
                this.state.currentPage = this.pages.login;
                break;
            default:
                history.pushState({}, '', PAGE_LINKS.feed);
                this.state.currentPage = this.pages.home;
                pageType = homePageTypes.feed;
        }
        this.state.currentPage?.render(pageType);
    }

    /**
     * Routing to clearing previous components and rendering new
     *
     * @param {string} pageLink
     * @param {boolean} deleteEverything
     */
    goToPage(pageLink: string, deleteEverything: boolean = false) {
        this.clear(deleteEverything);
        this.render(pageLink);
    }

    /**
     * Clearing previous components
     *
     * @param {boolean} deleteEverything
     */
    clear(deleteEverything: boolean) {
        const structure = this.state.currentPage?.structure;
        if (structure) {
            Object.keys(structure).forEach((key) => {
                if (deleteEverything || key !== 'menu') {
                    structure[key].remove();
                    delete structure[key];
                }
            });
        }
    }
}
