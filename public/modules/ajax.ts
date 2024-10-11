export default new (class Ajax {
	/**
	 * Post request with data and raising callback
	 *
	 * @param {string} url
	 * @param {Object} data - sending data
	 * @param {*} callback
	 */
	post(url: string, data: any, callback: any) {
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
	 * @returns {Promise<any>}
	 */
	getPromise(url: string): Promise<any> {
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
	sendForm(url: string, formData: FormData, callback: any) {
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
	 * @param {Object} config
	 */
	#ajax(config: any) {
		fetch(config.request)
			.then((response) => response.json())
			.then((data) => config.callback(data, null))
			.catch((error) => config.callback(null, error));
	}
	/**
	 * Execute AJAX request and returning Promise which resoles by response
	 *
	 * @param {Object} config
	 * @returns {Promise<Object>}
	 */
	async #ajaxPromise(config: any): Promise<any> {
		const response = await fetch(config.request);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
	}
})();
