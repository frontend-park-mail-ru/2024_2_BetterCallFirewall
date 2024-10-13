type AjaxPromiseConfig = {
	request: Request;
};

type Callback = (data: object | null, error: Error | null) => void;

type AjaxConfig = {
	callback: Callback;
} & AjaxPromiseConfig;

export default new (class Ajax {
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
		this.#ajax({
			request,
			callback,
		});
	}

	/**
	 * Get request and promise with resolving by data
	 *
	 * @param {string} url
	 * @returns {Promise<T>}
	 */
	getPromise<T>(url: string): Promise<T> {
		const request = new Request(url, {
			method: 'get',
			credentials: 'include',
		});
		return this.#ajaxPromise({
			request,
		});
	}

	/**
	 * Sending data form data
	 *
	 * @param {string} url
	 * @param {FormData} formData
	 * @param {function} callback
	 */
	sendForm(
		url: string,
		formData: FormData,
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
	#ajax(config: AjaxConfig) {
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
	async #ajaxPromise<T>(config: AjaxPromiseConfig): Promise<T> {
		const response = await fetch(config.request);
		if (response.ok) {
			return response.json();
		} else {
			throw new Error(response.statusText);
		}
	}
})();
