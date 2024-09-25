export default new (class Ajax {
	get(url, callback) {
		const request = new Request(url, {
			method: 'get',
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
		});
		this.#ajax({
			request,
			callback,
		});
	}
	getPromise(url) {
		const request = new Request(url, {
			method: 'get',
		});
		return this.#ajaxPromise({
			request,
		});
	}
	#ajax(config) {
		fetch(config.request)
			.then((response) => response.json())
			.then((data) => config.callback(data, null))
			.catch((error) => config.callback(null, error));
	}
	#ajaxPromise(config) {
		return fetch(config.request).then((response) => response.json());
	}
})();
