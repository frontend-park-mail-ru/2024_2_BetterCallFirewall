const deepClone = <T>(original: T): T => {
	if (original === null || typeof original !== 'object') {
		return original;
	}

	const copy: T = {} as T;

	Object.entries(original).forEach(([key, value]) => {
		copy[key as keyof T] = deepClone(value);
	});
	return copy;
};

export default deepClone;
