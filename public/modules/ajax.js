export default new (class Ajax {
	/**
	 * GET request and raise callback
	 *
	 * @param {string} url
	 * @param {function} callback
	 */
	get(url, callback) {
		const request = new Request(url, {
			method: 'get',
			credentials: 'include',
		});
		this.#ajax({
			request,
			callback,
		});
	}
	/**
	 * Post request with data and raising callback
	 *
	 * @param {string} url
	 * @param {Object} data - sending data
	 * @param {*} callback
	 */
	post(url, data, callback) {
		const request = new Request(url, {
			method: 'post',
			body: data,
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
	 * @returns {Promise<Object>}
	 */
	getPromise(url) {
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
	sendForm(url, formData, callback) {
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
	#ajax(config) {
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
	#ajaxPromise(config) {
		return fetch(config.request).then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error(response.statusText);
			}
		});
	}
})();
