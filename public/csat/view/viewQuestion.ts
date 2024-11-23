import { Root } from '../../components';
import { update } from '../../modules/vdom';
import { Change } from '../../stores/store';
import { Components, View } from '../../views/view';
import { Question, QuestionConfig } from '../components/Question/Question';

export type ComponentsQuestion = {
	questions?: Question;
} & Components;

export interface ViewQuestionConfig {
	question: QuestionConfig;
}

export class ViewQuestion extends View {
	protected _components: ComponentsQuestion = {};
	private _configQuestion: ViewQuestionConfig;

	constructor(config: ViewQuestionConfig, root: Root) {
		super(root);
		this._configQuestion = config;
	}

	handleChange(change: Change): void {
		switch (change.type) {
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

    protected _addHandlers() {}
}
