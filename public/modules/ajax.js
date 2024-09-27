export default new (class Ajax {
	get(url, callback) {
		const request = new Request(url, {
			method: 'get',
			credentials: 'same-origin',
		});
		this.#ajax({
			request,
			callback,
		});
	}
	post(url, data, callback) {
		const request = new Request(url, {
			method: 'post',
			body: data,
			credentials: 'same-origin',
		});
		this.#ajax({
			request,
			callback,
		});
	}
	getPromise(url) {
		const request = new Request(url, {
			method: 'get',
			credentials: 'same-origin',
		});
		return this.#ajaxPromise({
			request,
		});
	}
	sendForm(url, formData, callback) {
		const request = new Request(url, {
			method: 'POST',
			body: new URLSearchParams(formData),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			credentials: 'same-origin',
		});
		fetch(request)
			.then((response) => callback(response))
			.catch((error) => callback(null, error));
	}
	#ajax(config) {
		fetch(config.request)
			.then((response) => response.json())
			.then((data) => config.callback(data, null))
			.catch((error) => config.callback(null, error));
	}
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
