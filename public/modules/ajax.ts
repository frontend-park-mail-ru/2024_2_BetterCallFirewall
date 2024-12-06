import { STATUS } from '../api/api';
import app from '../app';
import { ChatResponse } from '../models/chat';
import {
	FullGroupResponse,
	GroupPayload,
	ShortGroupResponse,
} from '../models/group';
import { CsatResult } from '../models/csatResult';
import { HeaderResponse } from '../models/header';
import { MessageResponse } from '../models/message';
import { PostPayload, PostResponse } from '../models/post';
import {
	FullProfileResponse,
	ProfilePayload,
	ShortProfileResponse,
} from '../models/profile';
import { CommentPayload, CommentResponse } from '../models/comment';

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

export type QueryParams = Record<string, string | undefined>;

const replaceId = (url: string, id: number): string => {
	return url.replace('{id}', `${id}`).replace('%7Bid%7D', `${id}`);
};

export const insertQueryParams = (baseUrl: string, params?: QueryParams) => {
	if (!params) {
		return baseUrl;
	}
	const url = new URL(baseUrl);
	Object.entries(params).forEach(([key, value]) => {
		if (value) {
			url.searchParams.append(key, value);
		}
	});
	return url.toString();
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
	async createPost(
		formData: PostPayload,
		query: string,
	): Promise<AjaxResponse<PostResponse>> {
		const request = this._postRequest(
			app.config.URL.feed + query,
			formData,
		);
		return this._postResponse(request);
	}

	/**
	 * Отредактировать пост
	 */
	async editPost(
		formData: PostPayload,
		postId: number,
		query?: string,
	): Promise<AjaxResponse<PostResponse>> {
		const url = app.config.URL.post.replace('{id}', `${postId}`);
		return this._genericRequestResponse(url + query, 'put', formData);
	}

	/**
	 * Удалить пост
	 */
	async deletePost(
		postId: number,
		query?: string,
	): Promise<AjaxResponse<object>> {
		const url = app.config.URL.post.replace('{id}', `${postId}`);
		const request = this._deleteRequest(query ? url + query : url);
		return await this._objectResponse(request);
	}

	/**
	 * Лайкнуть пост
	 */
	async likePost(postId: number): Promise<AjaxResponse<object>> {
		const url = app.config.URL.postLike.replace('{id}', `${postId}`);
		return await this._postRequestObjectResponse(url);
	}

	/**
	 * Убрать лайк с поста
	 */
	async unlikePost(postId: number): Promise<AjaxResponse<object>> {
		const url = app.config.URL.postUnlike.replace('{id}', `${postId}`);
		return await this._postRequestObjectResponse(url);
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
		formData: ProfilePayload,
	): Promise<AjaxResponse<FullProfileResponse>> {
		return this._genericRequestResponse(
			app.config.URL.profile,
			'put',
			formData,
		);
	}

	/**
	 * Удалить профиль
	 */
	async deleteProfile(): Promise<AjaxResponse<object>> {
		const url = app.config.URL.profile;
		return this._genericRequestResponse(url, 'delete');
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
		return this._postRequestObjectResponse(url);
	}

	/**
	 * Принять в друзья
	 */
	async acceptFriend(profileId: number): Promise<AjaxResponse<object>> {
		let url = app.config.URL.acceptFriend;
		url = url.replace('{id}', `${profileId}`);
		return this._postRequestObjectResponse(url);
	}

	/**
	 * Отписаться от профиля
	 */
	async unsubscribeFromProfile(
		profileId: number,
	): Promise<AjaxResponse<object>> {
		let url = app.config.URL.unsubscribeFromProfile;
		url = url.replace('{id}', `${profileId}`);
		return this._postRequestObjectResponse(url);
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

	async createGroup(formData: GroupPayload): Promise<AjaxResponse<number>> {
		return this._genericRequestResponse(
			app.config.URL.groups,
			'post',
			formData,
		);
	}

	async groupEdit(
		groupPayload: GroupPayload,
		id: number,
	): Promise<AjaxResponse<object>> {
		return this._genericRequestResponse(
			replaceId(app.config.URL.groupEdit, id),
			'put',
			groupPayload,
		);
	}

	async getGroupPage(
		groupPagePath: string,
	): Promise<AjaxResponse<FullGroupResponse>> {
		let url = app.config.URL.group;
		const groupId = groupPagePath.split('/').pop();
		url = url.replace('{id}', `${groupId}`);
		const request = this._getRequest(url);
		const response = await this._response(request);
		let groupPageResponse: AjaxResponse<FullGroupResponse> = {
			status: response.status,
			success: false,
		};
		switch (groupPageResponse.status) {
			case STATUS.ok: {
				const body =
					(await response.json()) as FetchResponse<FullGroupResponse>;
				groupPageResponse = Object.assign(groupPageResponse, body);
			}
		}
		return groupPageResponse;
	}

	async unfollowGroup(groupId: number): Promise<AjaxResponse<object>> {
		let url = app.config.URL.groupLeave;
		url = url.replace('{id}', `${groupId}`);
		return this._postRequestObjectResponse(url);
	}

	async followGroup(groupId: number): Promise<AjaxResponse<object>> {
		let url = app.config.URL.groupJoin;
		url = url.replace('{id}', `${groupId}`);
		return this._postRequestObjectResponse(url);
	}

	async deleteGroup(groupId: number): Promise<AjaxResponse<object>> {
		let url = app.config.URL.group;
		url = url.replace('{id}', `${groupId}`);
		return this._deleteObjectResponse(url);
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
	 * Поиск профилей
	 */
	async profilesSearch(
		str: string,
		userId?: number,
	): Promise<AjaxResponse<ShortProfileResponse[]>> {
		const url = insertQueryParams(app.config.URL.profilesSearch, {
			q: str,
			id: userId ? `${userId}` : undefined,
		});
		return this._genericRequestResponse(url, 'get');
	}

	/**
	 * Поиск групп
	 */
	async groupsSearch(
		str: string,
		lastId?: number,
	): Promise<AjaxResponse<ShortGroupResponse[]>> {
		const url = insertQueryParams(app.config.URL.groupsSearch, {
			q: str,
			id: lastId ? `${lastId}` : undefined,
		});
		return this._genericRequestResponse(url, 'get');
	}

	/**
	 * Отправка результатов CSAT
	 */
	async csatSend(
		inTotal: number,
		feed: number,
	): Promise<AjaxResponse<object>> {
		return this._genericRequestResponse(app.config.URL.csat, 'post', {
			in_total: inTotal,
			feed,
		});
	}

	/**
	 * Получение метрик CSAT
	 */
	async csatMetrics(): Promise<AjaxResponse<CsatResult>> {
		return this._genericRequestResponse(app.config.URL.csatMetrics, 'get');
	}

	/**
	 * Отправить изображение
	 */
	async sendImage(image: File): Promise<AjaxResponse<string>> {
		const formData = new FormData();
		formData.append('file', image);
		const request = this._postFormRequest(app.config.URL.image, formData);
		return this._genericResponse(request);
	}

	/**
	 * Создать комментарий
	 */
	async createComment(
		postId: number,
		comment: CommentPayload,
	): Promise<AjaxResponse<CommentResponse>> {
		const url = replaceId(app.config.URL.post, postId);
		return this._genericRequestResponse(url, 'post', comment);
	}

	/**
	 * Получить комментарии к посту
	 */
	async getComments(
		postId: number,
		lastId?: number,
	): Promise<AjaxResponse<CommentResponse[]>> {
		let url = replaceId(app.config.URL.comments, postId);
		if (lastId) {
			url = insertQueryParams(url, { id: `${lastId}` });
		}
		return this._genericRequestResponse(url, 'get');
	}

	/**
	 * Редактировать комментарий
	 */
	async editComment(
		postId: number,
		commentId: number,
		commentPayload: CommentPayload,
	): Promise<AjaxResponse<object>> {
		let url = replaceId(app.config.URL.comment, postId);
		url = url.replace('{comment_id}', `${commentId}`);
		return this._genericRequestResponse(url, 'put', commentPayload);
	}

	/**
	 * Удалить комментарий
	 */
	async deleteComment(
		postId: number,
		commentId: number,
	): Promise<AjaxResponse<object>> {
		let url = replaceId(app.config.URL.comment, postId);
		url = url.replace('{commentId}', `${commentId}`);
		return this._genericRequestResponse(url, 'delete');
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
		url: string,
		method: string,
		data?: object,
	): Promise<AjaxResponse<T>> {
		const request = this._jsonRequest(url, method, data);
		return this._genericResponse(request);
	}

	private async _genericResponse<T>(
		request: Request,
	): Promise<AjaxResponse<T>> {
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
				shortGroupResponse = Object.assign(shortGroupResponse, body);
			}
		}
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
	private async _postRequestObjectResponse(
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
		const url = insertQueryParams(baseUrl, queryParams);
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
