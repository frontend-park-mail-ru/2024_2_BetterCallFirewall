import { Action } from '../actions/action';
import { ActionMessagesNewMessage } from '../actions/actionMessages';
import dispatcher from '../dispatcher/dispatcher';
import { MessageResponse } from '../models/message';

export default class WebsocketClient {
	private _socket: WebSocket;

	constructor(url: string) {
		this._socket = new WebSocket(url);

		this._socket.onopen = this._onOpen;
		this._socket.onmessage = this._onMessage;
		this._socket.onerror = this._onError;
		this._socket.onclose = this._onClose;
	}

	sendMessage(message: object) {
		this._socket.send(JSON.stringify(message));
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
	}
}
