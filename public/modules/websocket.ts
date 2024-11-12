import { Action } from '../actions/action';
import {
	ACTION_CHAT_TYPES,
	ActionChatSendMessageData,
} from '../actions/actionChat';
import { ACTION_LOGIN_TYPES } from '../actions/actionLogin';
import { ActionMessagesNewMessage } from '../actions/actionMessages';
import { ACTION_SIGNUP_TYPES } from '../actions/actionSignup';
import dispatcher from '../dispatcher/dispatcher';
import { MessageResponse } from '../models/message';

export const WS_ERRORS = {
	sendMessage: 'wsSendMessageError',
};

export default class WebsocketClient {
	private _socket: WebSocket;
	private _url: string;

	constructor(url: string) {
		this._url = url;
		this._socket = new WebSocket(url);
		console.log('initial ws:', this._socket);

		this._socket.onopen = this._onOpen.bind(this);
		this._socket.onmessage = this._onMessage.bind(this);
		this._socket.onerror = this._onError.bind(this);
		this._socket.onclose = this._onClose.bind(this);
	}

	handleAction(action: Action) {
		switch (action.type) {
			case ACTION_LOGIN_TYPES.loginClickSuccess:
			case ACTION_SIGNUP_TYPES.signupClickSuccess:
				this._reconnect();
				break;
			case ACTION_CHAT_TYPES.sendMessage:
				this.sendMessage(
					(action.data as ActionChatSendMessageData).message,
				);
				break;
		}
	}

	sendMessage(message: object) {
		this._socket.send(JSON.stringify(message));
	}

	private _connect() {
		console.log('old ws:', this._socket);
		this._socket = new WebSocket(this._url);
		console.log('new ws:', this._socket);
	}

	private _reconnect() {
		if (this._socket.CLOSING || this._socket.CLOSED) {
			this._connect();
		}
	}

	private _sendAction(action: Action) {
		dispatcher.getAction(action);
	}

	private _onOpen() {}

	private _onMessage(event: MessageEvent) {
		const message: MessageResponse = JSON.parse(event.data);
		this._sendAction(new ActionMessagesNewMessage(message));
	}

	private _onError(event: Event) {
		console.log('ws: error:', event);
	}

	private _onClose(event: Event) {
		console.log('ws: close:', event);
		setTimeout(() => {
			this._connect();
		}, 5000);
	}
}
