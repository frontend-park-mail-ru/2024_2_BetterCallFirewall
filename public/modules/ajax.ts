import { STATUS } from '../api/api';
import app from '../app';
import { ChatResponse } from '../models/chat';
import { ShortGroupResponse } from '../models/group';
import { HeaderResponse } from '../models/header';
import { LikeCountResponse } from '../models/likeCount';
import { MessageResponse } from '../models/message';
import { PostResponse } from '../models/post';
import { FullProfileResponse, ShortProfileResponse } from '../models/profile';

type AjaxPromiseConfig = {
	request: Request;
};

type Callback = (data: object | null, error: Error | null) => void;

type AjaxConfig = {
	callback: Callback;
} & AjaxPromiseConfig;

export type FormResponse = {
	message: string;
};

export interface FetchResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
}

export interface AjaxResponse<T> extends FetchResponse<T> {
	status: number;
}

export type QueryParams = Record<string, string>;

const replaceId = (url: string, id: number): string => {
	return url.replace('{id}', `${id}`);
};

const insertQueryParams = (baseUrl: string, params: QueryParams) => {
	let url = baseUrl;
	Object.entries(params).forEach(([key, value]) => {
		if (value) {
			url += `?${key}=${value}`;
		}
	});
	return url;
};

class Ajax {
	/**
	 * Post request with data and raising callback
	 *
	 * @param {string} url
	 * @param {Object} data - sending data
	 * @param {*} callback
	 */
	post(url: string, data: object, callback: Callback) {
		const request = new Request(url, {
			method: 'post',
			body: JSON.stringify(data),
			credentials: 'include',
		});
		this._ajax({
			request,
			callback,
		});
	}

	/**
	 * Получить посты
	 */
	async getPosts(
		queryParams?: QueryParams,
	): Promise<AjaxResponse<PostResponse[]>> {
		const request = this._getRequest(app.config.URL.feed, queryParams);
		const response = await this._response(request);
		let postsResponse: AjaxResponse<PostResponse[]> = {
			status: response.status,
			success: false,
			data: [],
			message: '',
		};
		switch (postsResponse.status) {
			case STATUS.noMoreContent:
				postsResponse.message = 'Постов больше нет';
				break;
			default: {
				const body = (await response.json()) as FetchResponse<
					PostResponse[]
				>;
				postsResponse = Object.assign(postsResponse, body);
			}
		}
		return postsResponse;
	}

	/**
	 * Создать пост
	 */
	async createPost(formData: FormData): Promise<AjaxResponse<PostResponse>> {
		const request = this._postFormRequest(app.config.URL.feed, formData);
		return this._postResponse(request);
	}

	/**
	 * Отредактировать пост
	 */
	async editPost(
		formData: FormData,
		postId: number,
	): Promise<AjaxResponse<PostResponse>> {
		const url = app.config.URL.post.replace('{id}', `${postId}`);
		const request = this._putFormRequest(url, formData);
		return this._postResponse(request);
	}

	/**
	 * Удалить пост
	 */
	async deletePost(postId: number): Promise<AjaxResponse<object>> {
		const url = app.config.URL.post.replace('{id}', `${postId}`);
		const request = this._deleteRequest(url);
		return await this._objectResponse(request);
	}

	/**
	 * Лайкнуть пост
	 */
	async likePost(postId: number): Promise<AjaxResponse<object>> {
		const url = app.config.URL.postLike.replace('{id}', `${postId}`);
		return await this._postObjectResponse(url);
	}

	async postLikesCount(
		postId: number,
	): Promise<AjaxResponse<LikeCountResponse>> {
		const url = app.config.URL.postLikeCount.replace('{id}', `${postId}`);
		return await this._genericRequestResponse(url, 'post');
	}

	/**
	 * Получить профиль
	 */
	async getProfile(
		profilePath: string,
	): Promise<AjaxResponse<FullProfileResponse>> {
		const request = this._getRequest(app.config.URL.profile + profilePath);
		const response = await this._response(request);
		let profileResponse: AjaxResponse<FullProfileResponse> = {
			status: response.status,
			success: false,
		};
		switch (profileResponse.status) {
			case STATUS.ok: {
				const body =
					(await response.json()) as FetchResponse<FullProfileResponse>;
				profileResponse = Object.assign(profileResponse, body);
			}
		}
		return profileResponse;
	}

	/**
	 * Получить свой профиль
	 */
	async getYourOwnProfile(): Promise<AjaxResponse<FullProfileResponse>> {
		const request = this._getRequest(app.config.URL.profileYourOwn);
		const response = await this._response(request);
		let profileResponse: AjaxResponse<FullProfileResponse> = {
			status: response.status,
			success: false,
		};
		switch (profileResponse.status) {
			case STATUS.ok: {
				const body =
					(await response.json()) as FetchResponse<FullProfileResponse>;
				profileResponse = Object.assign(profileResponse, body);
				break;
			}
		}
		return profileResponse;
	}

	/**
	 * Редактировать профиль
	 */
	async editProfile(
		formData: FormData,
	): Promise<AjaxResponse<FullProfileResponse>> {
		const request = this._formRequest(
			app.config.URL.profile,
			formData,
			'put',
		);
		return this._fullProfileResponse(request);
	}

	/**
	 * Получить хэдер
	 */
	async getHeader(): Promise<AjaxResponse<HeaderResponse>> {
		const request = this._getRequest(app.config.URL.header);
		const response = await this._response(request);
		let headerResponse: AjaxResponse<HeaderResponse> = {
			status: response.status,
			success: false,
		};
		switch (headerResponse.status) {
			case STATUS.ok: {
				const body =
					(await response.json()) as FetchResponse<HeaderResponse>;
				headerResponse = Object.assign(headerResponse, body);
				break;
			}
		}
		return headerResponse;
	}

	/**
	 * Получить друзей
	 */
	async getFriends(
		profileId: number,
	): Promise<AjaxResponse<ShortProfileResponse[]>> {
		let url = app.config.URL.friends;
		url = url.replace('{id}', `${profileId}`);
		return this._getShortProfileResponse(url);
	}

	/**
	 * Получить подписчиков на профиль
	 */
	async getSubscribers(
		profileId: number,
	): Promise<AjaxResponse<ShortProfileResponse[]>> {
		let url = app.config.URL.subscribers;
		url = url.replace('{id}', `${profileId}`);
		return this._getShortProfileResponse(url);
	}

	/**
	 * Получить все профили, кроме своего
	 */
	async getProfiles(
		lastId?: number,
	): Promise<AjaxResponse<ShortProfileResponse[]>> {
		let url;
		if (lastId) {
			url = insertQueryParams(app.config.URL.profiles, {
				last_id: `${lastId}`,
			});
		} else {
			url = app.config.URL.profiles;
		}
		return this._getShortProfileResponse(url);
	}

	/**
	 * Получить подписки профиля
	 */
	async getProfileSubscriptions(
		profileId: number,
	): Promise<AjaxResponse<ShortProfileResponse[]>> {
		let url = app.config.URL.profileSubscriptions;
		url = url.replace('{id}', `${profileId}`);
		return this._getShortProfileResponse(url);
	}

	/**
	 * Подписаться на профиль (отправить запрос на дружбу)
	 */
	async subscribeToProfile(profileId: number): Promise<AjaxResponse<object>> {
		let url = app.config.URL.subscribeToProfile;
		url = url.replace('{id}', `${profileId}`);
		return this._postObjectResponse(url);
	}

	/**
	 * Принять в друзья
	 */
	async acceptFriend(profileId: number): Promise<AjaxResponse<object>> {
		let url = app.config.URL.acceptFriend;
		url = url.replace('{id}', `${profileId}`);
		return this._postObjectResponse(url);
	}

	/**
	 * Отписаться от профиля
	 */
	async unsubscribeFromProfile(
		profileId: number,
	): Promise<AjaxResponse<object>> {
		let url = app.config.URL.unsubscribeFromProfile;
		url = url.replace('{id}', `${profileId}`);
		return this._postObjectResponse(url);
	}

	/**
	 * Удалить из друзей
	 */
	async removeFriend(profileId: number): Promise<AjaxResponse<object>> {
		let url = app.config.URL.removeFriend;
		url = url.replace('{id}', `${profileId}`);
		return this._deleteObjectResponse(url);
	}

	async getGroups(): Promise<AjaxResponse<ShortGroupResponse[]>> {
		const url = app.config.URL.groups;
		return this._getShortGroupResponse(url);
	}

	/**
	 * Запрос списка чатов
	 */
	async getMessages(): Promise<AjaxResponse<ChatResponse[]>> {
		return this._genericRequestResponse(app.config.URL.messages, 'get');
	}

	/**
	 * Запрос сообщений в чате
	 */
	async getChatMessages(
		profileId: number,
		lastTime?: string,
	): Promise<AjaxResponse<MessageResponse[]>> {
		const url = lastTime
			? insertQueryParams(app.config.URL.chat, { lastTime })
			: app.config.URL.chat;
		return this._genericRequestResponse(replaceId(url, profileId), 'get');
	}

	/**
	 * Sending data form data
	 *
	 * @param {string} url
	 * @param {Record<string, string>} formData
	 * @param {function} callback
	 */
	sendForm(
		url: string,
		formData: FormData,
		callback: (response: Response | null, error?: Error) => void,
	) {
		const formDataObject: Record<string, string> = {};
		formData.forEach((value, key) => {
			if (typeof value === 'string') {
				formDataObject[key] = value;
			}
		});
		const request = new Request(url, {
			method: 'POST',
			body: JSON.stringify(formDataObject),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json:charset=UTF-8',
			},
		});

		fetch(request)
			.then((response) => callback(response))
			.catch((error) => callback(null, error));
	}

	/**
	 * AJAX request
	 *
	 * @param {AjaxConfig} config
	 */
	private _ajax(config: AjaxConfig) {
		fetch(config.request)
			.then((response) => response.json())
			.then((data) => config.callback(data, null))
			.catch((error) => config.callback(null, error));
	}

	private async _genericRequestResponse<T>(
		baseUrl: string,
		method: string,
		data?: object,
	): Promise<AjaxResponse<T>> {
		const request = this._jsonRequest(baseUrl, method, data);
		const response = await this._response(request);
		try {
			const body = await response.json();
			const ajaxResponse: AjaxResponse<T> = Object.assign({}, body);
			ajaxResponse.status = response.status;
			return ajaxResponse;
		} catch {
			return { status: response.status, success: false };
		}
	}

	private async _getShortGroupResponse(
		url: string,
	): Promise<AjaxResponse<ShortGroupResponse[]>> {
		const request = this._getRequest(url);
		const response = await this._response(request);
		let shortGroupResponse: AjaxResponse<ShortGroupResponse[]> = {
			status: response.status,
			success: false,
		};
		switch (shortGroupResponse.status) {
			case STATUS.ok: {
				const body = (await response.json()) as FetchResponse<
					ShortGroupResponse[]
				>;
				shortGroupResponse = Object.assign(
					shortGroupResponse,
					body,
				);
			}
		};
		return shortGroupResponse;
	}

	/**
	 * get запрос и ответ в виде ShortProfileResponse
	 */
	private async _getShortProfileResponse(
		url: string,
	): Promise<AjaxResponse<ShortProfileResponse[]>> {
		const request = this._getRequest(url);
		const response = await this._response(request);
		let shortProfileResponse: AjaxResponse<ShortProfileResponse[]> = {
			status: response.status,
			success: false,
		};
		switch (shortProfileResponse.status) {
			case STATUS.ok: {
				const body = (await response.json()) as FetchResponse<
					ShortProfileResponse[]
				>;
				shortProfileResponse = Object.assign(
					shortProfileResponse,
					body,
				);
			}
		}
		return shortProfileResponse;
	}

	/**
	 * Ответ в виде FullProfileResponse
	 */
	private async _fullProfileResponse(
		request: Request,
	): Promise<AjaxResponse<FullProfileResponse>> {
		const response = await this._response(request);
		let profileResponse: AjaxResponse<FullProfileResponse> = {
			status: response.status,
			success: false,
		};
		switch (profileResponse.status) {
			case STATUS.ok: {
				const body =
					(await response.json()) as FetchResponse<FullProfileResponse>;
				profileResponse = Object.assign(profileResponse, body);
			}
		}
		return profileResponse;
	}

	private async _objectResponse(
		request: Request,
	): Promise<AjaxResponse<object>> {
		const response = await this._response(request);
		try {
			const body = await response.json();
			const ajaxResponse: AjaxResponse<object> = Object.assign({}, body);
			ajaxResponse.status = response.status;
			return ajaxResponse;
		} catch {
			return { status: response.status, success: false };
		}
	}

	/**
	 * Пустой post запрос и ответ в виде object
	 */
	private async _postObjectResponse(
		url: string,
	): Promise<AjaxResponse<object>> {
		const request = this._postRequest(url, {});
		return await this._objectResponse(request);
	}

	/**
	 * Пустой delete запрос и ответ в виде object
	 */
	private async _deleteObjectResponse(
		url: string,
	): Promise<AjaxResponse<object>> {
		const request = this._deleteRequest(url);
		return await this._objectResponse(request);
	}

	/**
	 * Ответ в виде PostResponse
	 */
	private async _postResponse(
		request: Request,
	): Promise<AjaxResponse<PostResponse>> {
		const response = await this._response(request);
		const postResponse: AjaxResponse<PostResponse> = {
			status: response.status,
			success: false,
		};
		try {
			const body = await response.json();
			return Object.assign(postResponse, body);
		} catch {
			return postResponse;
		}
	}

	/**
	 * get запрос
	 */
	private _getRequest(baseUrl: string, queryParams?: QueryParams) {
		const params = new URLSearchParams(queryParams);
		const url = queryParams ? `${baseUrl}?${params}` : `${baseUrl}`;
		return new Request(url, {
			method: 'get',
			credentials: 'include',
		});
	}

	/**
	 * post запрос (json)
	 */
	private _postRequest(baseUrl: string, data: object) {
		return this._jsonRequest(baseUrl, 'post', data);
	}

	/**
	 * delete запрос
	 */
	private _deleteRequest(baseUrl: string) {
		return this._jsonRequest(baseUrl, 'delete');
	}

	/**
	 * Запрос, содержащий json
	 */
	private _jsonRequest(baseUrl: string, method: string, body?: object) {
		return new Request(baseUrl, {
			method: method,
			credentials: 'include',
			body: body ? JSON.stringify(body) : undefined,
			headers: {
				'Content-Type': 'application/json:charset=UTF-8',
			},
		});
	}

	/**
	 * put запрос отдачи формы
	 */
	private _putFormRequest(baseUrl: string, data: FormData) {
		return this._formRequest(baseUrl, data, 'put');
	}

	/**
	 * post запрос отдачи формы
	 */
	private _postFormRequest(baseUrl: string, data: FormData) {
		return this._formRequest(baseUrl, data, 'post');
	}

	/**
	 * Запрос отдачи формы
	 */
	private _formRequest(baseUrl: string, data: FormData, method: string) {
		return new Request(baseUrl, {
			method: method,
			credentials: 'include',
			body: data,
		});
	}

	/**
	 * Получение ответа
	 */
	private async _response(request: Request): Promise<Response> {
		return await fetch(request);
	}
}

export default new Ajax();
