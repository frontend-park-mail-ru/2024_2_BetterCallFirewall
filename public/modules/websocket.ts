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

export default class WebsocketClient {
	private _socket: WebSocket;
	private _url: string;

	constructor(url: string) {
		this._url = url;
		this._socket = new WebSocket(url);

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

	private _reconnect() {
		this._socket = new WebSocket(this._url);
	}

	private _sendAction(action: Action) {
		dispatcher.getAction(action);
	}

	private _onOpen(event: Event) {
		console.log('WS open:', event);
	}

	private _onMessage(event: MessageEvent) {
		console.log('WS message:', event.data);
		const message: MessageResponse = JSON.parse(event.data);
		this._sendAction(new ActionMessagesNewMessage(message));
	}

	private _onError(event: Event) {
		console.log('WS error:', event);
	}

	private _onClose(event: CloseEvent) {
		console.log('WS close:', event);
		setTimeout(() => {
			this._socket = new WebSocket(this._url);
		}, 5000);
	}
}
