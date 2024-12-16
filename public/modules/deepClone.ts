const deepClone = <T>(original: T, cloned = new WeakMap()): T => {
	if (original === null || typeof original !== 'object') {
		return original;
	}

	if (Array.isArray(original)) {
		return original.map((el) => deepClone(el)) as T;
	}

	if (cloned.has(original)) {
		return cloned.get(original);
	}

	const copy: T = {} as T;
	cloned.set(original, copy);

	Object.entries(original).forEach(([key, value]) => {
		copy[key as keyof T] = deepClone(value, cloned);
	});
	return copy;
};

export default deepClone;
