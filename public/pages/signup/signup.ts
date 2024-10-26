// import { SignupForm } from '../../components/index';
// import Ajax, { FormResponse } from '../../modules/ajax';
// import Validator from '../../modules/validation';
// import BasePage from '../basePage';
// import { PAGE_LINKS } from '../../app';

// export default class SignupPage extends BasePage {
// 	render() {
// 		const config = this.app.config.signupConfig;
// 		const signUp = new SignupForm(config, this.app.root);
// 		signUp.render();
// 		this.components.signUp = signUp;

// 		const signupForm = signUp.htmlElement.querySelector('form');
// 		// Submit signup form handler
// 		const submitHandler = (event: Event) => {
// 			event.preventDefault();
// 			signUp.clearError();
// 			const validator = new Validator();
// 			const data = validator.validateForm(
// 				config.inputs,
// 				signupForm as HTMLFormElement,
// 			);
// 			if (data) {
// 				Ajax.sendForm(
// 					this.app.config.URL.signup,
// 					data,
// 					(response: Response | null, error?: Error) => {
// 						if (error) {
// 							signUp.printError('Что-то пошло не так');
// 							return;
// 						}
// 						if (response?.ok) {
// 							this.app.goToPage(PAGE_LINKS.feed, true);
// 						} else {
// 							const printMessage = async () => {
// 								const data =
// 									await (response?.json() as Promise<FormResponse>);
// 								if (data.message === 'user already exists') {
// 									signUp.printError(
// 										'Пользователь в таким email уже существует',
// 									);
// 								} else {
// 									signUp.printError('Что-то пошло не так');
// 								}
// 							};
// 							printMessage();
// 						}
// 					},
// 				);
// 			}
// 		};
// 		signUp.addHandler(signupForm as HTMLElement, 'submit', submitHandler);

// 		const toLoginLink = signUp.items.toLoginLink;
// 		// Click on title handler
// 		const clickHandler = (event: Event) => {
// 			event.preventDefault();
// 			this.app.goToPage(PAGE_LINKS.login, true);
// 		};
// 		toLoginLink.addHandler(toLoginLink.htmlElement, 'click', clickHandler);

// 		const titleLink = signUp.htmlElement.querySelector('a.title-link');
// 		// Click on to login link handler
// 		const titleLinkClickHandler = (event: Event) => {
// 			event.preventDefault();
// 			this.app.goToPage(PAGE_LINKS.feed, true);
// 		};
// 		signUp.addHandler(
// 			titleLink as HTMLElement,
// 			'click',
// 			titleLinkClickHandler,
// 		);
// 	}

// 	clear(): void {
// 		this.components.signUp.remove();
// 		delete this.components.signUp;
// 	}
// }
