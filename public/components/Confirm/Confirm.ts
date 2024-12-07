import { ActionConfirmClose } from '../../actions/actionConfirm';
import Component, { ComponentConfig } from '../Component';

export enum Style {
	Main = 'button-action confirm__action_main',
	Negative = 'button-action-negative confirm__action_negative',
}

interface ConfirmAction {
	text: string;
	style: Style;
	callback?: (event: Event) => void;
}

export interface ConfirmConfig extends ComponentConfig {
	title: string;
	text: string;
	actions: ConfirmAction[];
}

export class Confirm extends Component {
	protected _config: ConfirmConfig;

	constructor(config: ConfirmConfig, parent: Component) {
		super(config, parent);
		this._config = config;
	}

	render(): string {
		this._prerender();
		return this._render('Confirm.hbs');
	}

	protected _addHandlers(): void {
		super._addHandlers();
		this._config.actions.forEach((actionConfig, i) => {
			const action = this._findVNodeByKey(`action-${i}`);
			action.handlers.push({
				event: 'click',
				callback: (event) => {
					event.preventDefault();
					this._sendAction(new ActionConfirmClose());
				},
			});
			if (actionConfig.callback) {
				action.handlers.push({
					event: 'click',
					callback: actionConfig.callback,
				});
			}
		});
	}
}
