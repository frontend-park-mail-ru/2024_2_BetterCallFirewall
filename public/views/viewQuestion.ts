import { ACTION_APP_TYPES } from '../actions/actionApp';
import api from '../api/api';
import { Root } from '../components';
import { Question, QuestionConfig } from '../components/Question/Question';
import { questionNames } from '../config';
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
	private currentQuestion: number = 0;
	private arrScores: number[] = [];

	constructor(config: ViewQuestionConfig, root: Root) {
		super(root);
		this._configQuestion = config;
	}

	updateConfig() {
		this.currentQuestion += 1;
		if (this.currentQuestion < questionNames.length) {
			this._configQuestion.question.name = questionNames[this.currentQuestion].name;
			this._configQuestion.question.id = this.currentQuestion + 1;
		} else {
			this._configQuestion.question.name = 'Спасибо за ответы!';
			this._configQuestion.question.scoresConfig = [];
			api.csatSend(this.arrScores[0], this.arrScores[1]);
		}
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
				this.updateConfig();
				// api.removeFriend(personConfig.id);
				this.render();
				// api
			},
		});
		this.question.submitButtonVNode.handlers.push({
			event: 'click',
			callback: (event) => {
				event.preventDefault();
				if (this._btnTapped != -1) {
					this.arrScores.push(this._btnTapped);
					this._btnTapped = -1;
					// api.removeFriend(personConfig.id);
					this.updateConfig();
					this.render();
				}
			},
		});
	}
}
