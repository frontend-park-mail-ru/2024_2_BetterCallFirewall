/* eslint-disable @typescript-eslint/no-explicit-any */
export const throttle = <T extends (...args: any) => void>(
	func: T,
	limit: number,
) => {
	let last: number;
	return (...args: Parameters<T>) => {
		if (!last) {
			func(...args);
			last = Date.now();
		}
		if (Date.now() - last > limit) {
			func(...args);
			last = Date.now();
		}
	};
};
