import app from '../app';
import { IProfileConfig } from '../components/Profile/Profile';
import { PostResponse } from '../models/post';

type AjaxPromiseConfig = {
	request: Request;
};

// type FetchConfig = {
// 	request: Request;
// };

type Callback = (data: object | null, error: Error | null) => void;

type AjaxConfig = {
	callback: Callback;
} & AjaxPromiseConfig;

export type FormResponse = {
	message: string;
};

export interface FetchResponse<T> {
	success: boolean;
	data: T;
	message: string;
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

	// /**
	//  * Get request and promise with resolving by data
	//  *
	//  * @param {string} baseUrl
	//  * @returns {Promise<T>}
	//  */
	// getPromise<T>(baseUrl: string, queryParams?: QueryParams): Promise<T> {
	// 	const params = new URLSearchParams(queryParams);
	// 	const url = `${baseUrl}?${params}`;
	// 	const request = new Request(url, {
	// 		method: 'get',
	// 		credentials: 'include',
	// 	});
	// 	return this._ajaxPromise({
	// 		request,
	// 	});
	// }

	async getPosts(
		queryParams?: QueryParams,
	): Promise<AjaxResponse<PostResponse[]>> {
		const request = this._getRequest(app.config.URL.post, queryParams);
		const response = await this._response(request);
		const status = response.status;
		let success = false;
		let data: PostResponse[] = [];
		let message = '';
		if (status === 204) {
			message = 'Постов больше нет';
		} else {
			const body = (await response.json()) as FetchResponse<
				PostResponse[]
			>;
			success = body.success;
			data = body.data;
			message = body.message;
		}
		return {
			status,
			success,
			data,
			message,
		};
	}

	async getProfileData(user: string): Promise<IProfileConfig> {
		try {
			const response = await fetch(`/api/profiles/${user}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data: IProfileConfig = await response.json();
			return data;
		} catch (error) {
			console.error('Ошибка при получении данных профиля:', error);
			return {
				key: 'profile',
				id: 0,
				firstName: 'Неизвестно',
				secondName: '',
				description: '',
				friendsCount: 0,
				groupsCount: 0,
			};
		}
	}

	async getCurrentUserId(): Promise<number> {
		try {
			const response = await fetch('/api/currentUserId');
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const data = await response.json();
			return data.userId;
		} catch (error) {
			console.error('Ошибка при получении Id профиля:', error);
			throw error;
		}
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
				// 'Content-Type': 'application/json',
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
	 * Execute AJAX request and returning Promise which resoles by response
	 *
	 * @param {AjaxPromiseConfig} config
	 * @returns {Promise<T>}
	 */
	private async _ajaxPromise<T>(
		config: AjaxPromiseConfig,
	): Promise<T | null> {
		const response = await fetch(config.request);
		if (response.ok) {
			if (response.status === 204) {
				return null;
			}
			return response.json();
		} else {
			throw new Error(response.status.toString());
		}
	}

	private _getRequest(baseUrl: string, queryParams?: QueryParams) {
		const params = new URLSearchParams(queryParams);
		const url = `${baseUrl}?${params}`;
		return new Request(url, {
			method: 'get',
			credentials: 'include',
		});
	}

	private async _response(request: Request): Promise<Response> {
		return await fetch(request);
	}
}

export default new Ajax();
