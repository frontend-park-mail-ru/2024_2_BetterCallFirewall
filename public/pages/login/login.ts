import BasePage from '../basePage';
import Ajax from '../../modules/ajax';
import Validator from '../../modules/validation';
import { LoginForm } from '../../components/index';
import { PAGE_LINKS } from '../../app';

export default class LoginPage extends BasePage {
	render() {
		const config = this.app.config.loginConfig;
		const login = new LoginForm(config, this.app.root);
		login.render();
		this.structure.login = login;

		const loginForm = login.htmlElement.querySelector('form');
		// Submit login form handler
		const submitHandler = (event: Event) => {
			event.preventDefault();
			login.clearError();
			const validator = new Validator();
			const data = validator.validateForm(config.inputs, loginForm as HTMLFormElement);
			if (data) {
				Ajax.sendForm(
					this.app.config.URL.login,
					data,
					(response: Response, error: any) => {
						if (error) {
							login.printError('Что-то пошло не так');
							return;
						}
						if (response.ok) {
							this.app.goToPage(PAGE_LINKS.feed, true); //????
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
		login.addHandler(loginForm as HTMLElement, 'submit', submitHandler);

		const toSignupLink = login.items.toSignupLink;
		// Click on to signup link handler
		const clickHandler = (event: Event) => {
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
		const titleLinkClickHandler = (event: Event) => {
			event.preventDefault();
			this.app.goToPage(PAGE_LINKS.feed, true);
		};
		login.addHandler(titleLink as HTMLElement, 'click', titleLinkClickHandler);
	}
}
