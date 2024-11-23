import Component, { ComponentConfig } from "../../../components/Component";
import { QuestionConfig } from "../Question/Question";

export interface MetricConfig extends ComponentConfig {
    id: number;
	name: string;
    average: number;
}

export class Metric extends Component {
	protected _config: MetricConfig;

	constructor(config: MetricConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Metric.hbs');
	}

	protected _prerender(): void {
		super._prerender();
	}
}
