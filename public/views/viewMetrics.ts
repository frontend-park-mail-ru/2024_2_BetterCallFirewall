import { ACTION_APP_TYPES } from '../actions/actionApp';
import { Root } from '../components';
import { Metrics, MetricsConfig } from '../components/Metrics/Metrics';
import { update } from '../modules/vdom';
import { Change } from '../stores/store';
import { Components, View } from './view';

export type ComponentsMetrics = {
	metrics?: Metrics;
} & Components;

export interface ViewMetricsConfig {
	metrics: MetricsConfig;
}

export class ViewMetrics extends View {
	protected _components: ComponentsMetrics = {};
	private _configMetrics: ViewMetricsConfig;

	constructor(config: ViewMetricsConfig, root: Root) {
		super(root);
		this._configMetrics = config;
	}

	// protected get metrics(): Metrics {
	// 	const metrics = this._components.metrics;
	// 	if (!metrics) {
	// 		throw new Error('users does not exist');
	// 	}
	// 	return metrics;
	// }

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
		return this._configMetrics;
	}

	render(data?: ViewMetricsConfig): void {
		if (data) {
			this._configMetrics = Object.assign(this._configMetrics, data);
		}
		this._render();
	}

	protected _render() {
		const rootNode = this._root.node;
		this._root.clear();
		this._components.metrics = new Metrics(
			this._configMetrics.metrics,
			this._root,
		);

		const rootVNode = this._root.newVNode();
		this._addHandlers();
		update(rootNode, rootVNode);
	}

	protected _addHandlers() {
	}
}
