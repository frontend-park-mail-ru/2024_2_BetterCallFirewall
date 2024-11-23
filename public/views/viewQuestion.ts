import { ACTION_APP_TYPES } from '../actions/actionApp';
import { Root } from '../components';
import { Question, QuestionConfig } from '../components/Question/Question';
import { update } from '../modules/vdom';
import { Change } from '../stores/store';
import { Components, View } from './view';

export type ComponentsQuestion = {
	questions?: Question;
} & Components;

export interface ViewQuestionConfig {
	question: QuestionConfig;
}

export class ViewQuestion extends View {
	protected _components: ComponentsQuestion = {};
	private _configQuestion: ViewQuestionConfig;
	private _btnTapped: number = -1;

	constructor(config: ViewQuestionConfig, root: Root) {
		super(root);
		this._configQuestion = config;
	}

	protected get question(): Question {
		const question = this._components.questions;
		if (!question) {
			throw new Error('users does not exist');
		}
		return question;
	}

	handleChange(change: Change): void {
		switch (change.type) {
			case ACTION_APP_TYPES.actionAppInit:
			case ACTION_APP_TYPES.goTo:
				this.render();
				break;
			default:
				return;
		}
	}

	get config() {
		return this._configQuestion;
	}

	render(data?: ViewQuestionConfig): void {
		if (data) {
			this._configQuestion = Object.assign(this._configQuestion, data);
		}
		this._render();
	}

	protected _render() {
		const rootNode = this._root.node;
		this._root.clear();
		this._components.questions = new Question(
			this._configQuestion.question,
			this._root,
		);

		const rootVNode = this._root.newVNode();
		this._addHandlers();
		update(rootNode, rootVNode);
	}

	protected _addHandlers() {
		this.question.listScores.forEach((score) => {
			score.vnode.handlers.push({
				event: 'click',

				callback: (event) => {
					event.preventDefault();
					if (this._btnTapped != -1) {
						this._btnTapped = -1;
					} else {
						this._btnTapped = score.id;
					}
				},
			});
		});
		this.question.skipButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				// api;
				// api.removeFriend(personConfig.id);
			},
		});
		this.question.submitButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				if (this._btnTapped != -1) {
					// api.removeFriend(personConfig.id);
				}
			},
		});
	}
}
