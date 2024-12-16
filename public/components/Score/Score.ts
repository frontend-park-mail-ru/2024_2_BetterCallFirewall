import { VNode } from '../../modules/vdom';
import { Component, ComponentConfig } from '../Component';

export interface ScoreConfig extends ComponentConfig {
	id: number;
	color: string;
}

export class Score extends Component {
	protected _config: ScoreConfig;

	constructor(config: ScoreConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Score.hbs');
	}

	get scoreButton(): VNode {
		return this._findVNodeByClass('score');
	}

	get id(): number {
		return this.id;
	}
}
