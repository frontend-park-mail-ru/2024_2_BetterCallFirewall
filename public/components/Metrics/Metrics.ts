import { Component, ComponentConfig } from '../Component';
import { Metric, MetricConfig } from '../Metric/Metric';

export interface MetricsConfig extends ComponentConfig {
	id: number;
	metricsConfig: MetricConfig[];
}

export class Metrics extends Component {
	protected _config: MetricsConfig;
	private _metric: Metric[] = [];

	constructor(config: MetricsConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Metrics.hbs');
	}

	protected _prerender(): void {
		super._prerender();
		this._metric = this._config.metricsConfig.map((config) => {
			return new Metric(config, this);
		});
		this._templateContext = {
			...this._templateContext,
			metrics: this._metric.map((metric) => {
				return metric.render();
			}),
		};
	}
}
