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

	async getPosts(
		queryParams?: QueryParams,
	): Promise<AjaxResponse<PostResponse[]>> {
		const request = this._getRequest(app.config.URL.post, queryParams);
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
				console.log('body');
				headerResponse = Object.assign(headerResponse, body);
				break;
			}
		}
		console.log('headerResponse:', headerResponse);
		return headerResponse;
	}

	async getFriends(
		profileId: number,
	): Promise<AjaxResponse<ShortProfileResponse[]>> {
		let url = app.config.URL.friends;
		url = url.replace('{id}', `${profileId}`);
		const request = this._getRequest(url);
		const response = await this._response(request);
		let friendsResponse: AjaxResponse<ShortProfileResponse[]> = {
			status: response.status,
			success: false,
		};
		switch (friendsResponse.status) {
			case STATUS.ok: {
				const body = (await response.json()) as FetchResponse<
					ShortProfileResponse[]
				>;
				console.log('body:', body);
				friendsResponse = Object.assign(friendsResponse, body);
			}
		}
		return friendsResponse;
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

	private _getRequest(baseUrl: string, queryParams?: QueryParams) {
		const params = new URLSearchParams(queryParams);
		const url = queryParams ? `${baseUrl}?${params}` : `${baseUrl}`;
		return new Request(url, {
			method: 'get',
			credentials: 'include',
		});
	}

	private _postRequest(baseUrl: string, data: object) {
		return new Request(baseUrl, {
			method: 'post',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json:charset=UTF-8',
			},
		});
	}

	private _sendFormRequest(baseUrl: string, data: FormData) {
		return new Request(baseUrl, {
			method: 'post',
			credentials: 'include',
			body: data,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	private async _response(request: Request): Promise<Response> {
		return await fetch(request);
	}
}

export default new Ajax();
