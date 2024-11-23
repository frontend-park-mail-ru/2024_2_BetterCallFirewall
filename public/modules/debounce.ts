/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <T extends (...arg: any) => void>(
	func: T,
	limit: number,
) => {
	let debounceTimeout: NodeJS.Timeout;
	return (...args: Parameters<T>) => {
		clearTimeout(debounceTimeout);
		debounceTimeout = setTimeout(() => {
			func(...args);
		}, limit);
	};
};
