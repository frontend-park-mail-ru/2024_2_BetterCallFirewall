import { SignupForm } from '../../components/index.js';
import Ajax from '../../modules/ajax.js';
import Validator from '../../modules/validation.js';
import BasePage from '../basePage.js';
import { PAGE_LINKS } from '../../app.js';

export default class SignupPage extends BasePage {
	render() {
		const config = this.app.config.signupConfig;
		const signUp = new SignupForm(config, this.app.root);
		signUp.render();
		this.structure.signUp = signUp;

		const signupForm = signUp.htmlElement.querySelector('form');
		// Submit signup form handler
		const submitHandler = (event) => {
			event.preventDefault();
			signUp.clearError();
			const validator = new Validator();
			const data = validator.validateForm(config.inputs, signupForm);
			if (data) {
				Ajax.sendForm(
					this.app.config.URL.signup,
					data,
					(response, error) => {
						if (error) {
							signUp.printError('Что-то пошло не так');
							return;
						}
						if (response.ok) {
							this.app.goToPage(PAGE_LINKS.feed, true);
						} else {
							const data = response.json();
							if (data.message === 'user already exists') {
								signUp.printError(
									'Пользователь в таким email уже существует',
								);
							} else {
								signUp.printError('Что-то пошло не так');
							}
						}
					},
				);
			}
		};
		signUp.addHandler(signupForm, 'submit', submitHandler);

		const toLoginLink = signUp.items.toLoginLink;
		// Click on title handler
		const clickHandler = (event) => {
			event.preventDefault();
			this.app.goToPage(PAGE_LINKS.login, true);
		};
		toLoginLink.addHandler(toLoginLink.htmlElement, 'click', clickHandler);

		const titleLink = signUp.htmlElement.querySelector('a.title-link');
		// Click on to login link handler
		const titleLinkClickHandler = (event) => {
			event.preventDefault();
			this.app.goToPage(PAGE_LINKS.feed, true);
		};
		signUp.addHandler(titleLink, 'click', titleLinkClickHandler);
	}
}
