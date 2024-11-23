import { VNode } from "../../modules/vdom";
import Component, { ComponentConfig } from "../Component";
import { Score, ScoreConfig } from "../Score/Score";

export interface QuestionConfig extends ComponentConfig {
	id: number;
	name: string;
	scoresConfig: ScoreConfig[];
}

export class Question extends Component {
	protected _config: QuestionConfig;
	private _scores: Score[] = [];

	constructor(config: QuestionConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	get listScores(): Score[] {
		return this._scores;
	}

	render(): string {
		this._prerender();
		return this._render('Question.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._scores = this._config.scoresConfig.map((config) => {
			return new Score(config, this);
		});
		this._templateContext = {
			...this._templateContext,
			score: this._scores.map((score) => {
				return score.render();
			}),
		};
	}

	get skipButtonVNode(): VNode {
		return this._findVNodeByClass('question__skip');
	}
	get submitButtonVNode(): VNode {
		return this._findVNodeByClass('question__button');
	}
}
