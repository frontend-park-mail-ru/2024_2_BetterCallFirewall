import Component, { ComponentConfig } from '../../../components/Component';
import { Score, ScoreConfig } from '../Score/Score';

export interface QuestionConfig extends ComponentConfig {
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
			friends: this._scores.map((score) => {
				return score.render();
			}),
		};
	}
}
