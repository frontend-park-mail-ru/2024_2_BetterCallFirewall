export const throttle = (func: () => void, limit: number) => {
	let last: number;
	return () => {
		if (!last) {
			func();
			last = Date.now();
		}
		const now = Date.now();
		console.log('now:', now);
		console.log('last:', last);
		console.log('now - last:', now - last);
		if (now - last > limit) {
			console.log('call');
			func();
			last = Date.now();
		}
	};
};
