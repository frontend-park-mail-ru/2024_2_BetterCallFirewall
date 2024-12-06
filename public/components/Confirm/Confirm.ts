import Component, { ComponentConfig } from '../Component';

export enum Style {
	Main = 'confirm__action_main',
	Negative = 'confirm__action_negative',
}

interface ConfirmAction {
	text: string;
	style: Style;
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
}
