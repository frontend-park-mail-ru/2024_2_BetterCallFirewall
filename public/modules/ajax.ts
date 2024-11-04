import { STATUS } from '../api/api';
import app from '../app';
import { HeaderResponse } from '../models/header';
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
		console.log('response:', response);
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
				console.log('body:', body);
				postsResponse = Object.assign(postsResponse, body);
			}
		}
		console.log('postsResponse:', postsResponse);
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
				console.log('body:', body);
				profileResponse = Object.assign(profileResponse, body);
			}
		}
		console.log('profileResponse:', profileResponse);
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
				console.log('body:', body);
				profileResponse = Object.assign(profileResponse, body);
				break;
			}
		}
		console.log('profileResponse:', profileResponse);
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
				console.log('body:', body);
				headerResponse = Object.assign(headerResponse, body);
				break;
			}
		}
		console.log('headerResponse:', headerResponse);
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
	async getProfiles(): Promise<AjaxResponse<ShortProfileResponse[]>> {
		return this._getShortProfileResponse(app.config.URL.profiles);
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
		return this._postObjectResponse(url);
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
		formData: Record<string, string>,
		callback: (response: Response | null, error?: Error) => void,
	) {
		const request = new Request(url, {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json:charset=UTF-8',
			},
			credentials: 'include',
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

	/**
	 * get запрос и ответ в виде ShortProfileResponse
	 */
	private async _getShortProfileResponse(
		baseUrl: string,
	): Promise<AjaxResponse<ShortProfileResponse[]>> {
		const request = this._getRequest(baseUrl);
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
				console.log('body:', body);
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
				console.log('body:', body);
				profileResponse = Object.assign(profileResponse, body);
			}
		}
		console.log('profileResponse:', profileResponse);
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
	 * post запрос и ответ в виде object
	 */
	private async _postObjectResponse(
		url: string,
	): Promise<AjaxResponse<object>> {
		const request = this._postRequest(url, {});
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
		return this._jsonRequest(baseUrl, data, 'post');
	}

	private _deleteRequest(baseUrl: string) {
		return this._jsonRequest(baseUrl, {}, 'delete');
	}

	private _jsonRequest(baseUrl: string, body: object, method: string) {
		return new Request(baseUrl, {
			method: method,
			credentials: 'include',
			body: JSON.stringify(body),
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
