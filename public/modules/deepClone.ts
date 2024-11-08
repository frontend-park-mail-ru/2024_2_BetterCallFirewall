const deepClone = <T>(original: T): T => {
	if (original === null || typeof original !== 'object') {
		return original;
	}

	if (Array.isArray(original)) {
		return original.map((el) => deepClone(el)) as T;
	}

	const copy: T = {} as T;

	Object.entries(original).forEach(([key, value]) => {
		copy[key as keyof T] = deepClone(value);
	});
	return copy;
};

export default deepClone;
