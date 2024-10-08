import BasePage from '../basePage.js';
import Ajax from '../../modules/ajax.js';
import Validator from '../../modules/validation.js';
import { LoginForm } from '../../components/index.js';
import { PAGE_LINKS } from '../../app.js';

export default class LoginPage extends BasePage {
	render() {
		const config = this.app.config.loginConfig;
		const login = new LoginForm(config, this.app.root);
		login.render();
		this.structure.login = login;

		const loginForm = login.htmlElement.querySelector('form');
		// Submit login form handler
		const submitHandler = (event) => {
			event.preventDefault();
			login.clearError();
			const validator = new Validator();
			const data = validator.validateForm(config.inputs, loginForm);
			if (data) {
				Ajax.sendForm(
					this.app.config.URL.login,
					data,
					(response, error) => {
						if (error) {
							login.printError('Что-то пошло не так');
							return;
						}
						if (response.ok) {
							this.goToPage(PAGE_LINKS.feed, true);
						} else {
							const data = response.json();
							if (data.message === 'wrong email or password') {
								login.printError('Неверная почта или пароль');
							} else {
								login.printError('Что-то пошло не так');
							}
						}
					},
				);
			}
		};
		login.addHandler(loginForm, 'submit', submitHandler);

		const toSignupLink = login.items.toSignupLink;
		// Click on to signup link handler
		const clickHandler = (event) => {
			event.preventDefault();
			this.app.goToPage(PAGE_LINKS.signup, true);
		};
		toSignupLink.addHandler(
			toSignupLink.htmlElement,
			'click',
			clickHandler,
		);

		const titleLink = login.htmlElement.querySelector('a.title-link');
		// Click on title handler
		const titleLinkClickHandler = (event) => {
			event.preventDefault();
			this.app.goToPage(PAGE_LINKS.feed, true);
		};
		login.addHandler(titleLink, 'click', titleLinkClickHandler);
	}
}
