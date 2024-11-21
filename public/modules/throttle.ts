export const throttle = (func: () => void, limit: number) => {
	let last: number;
	return () => {
		if (!last) {
			func();
			last = Date.now();
		}
		if (Date.now() - last > limit) {
			func();
			last = Date.now();
		}
	};
};
