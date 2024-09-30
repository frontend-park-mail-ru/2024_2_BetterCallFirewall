import js from '@eslint/js';

export default {
	...js.configs.recommended,
	rules: {
		'no-console': 'warn',
		'no-debugger': 'warn',
		'quotes': ['warn', 'single'],
		'semi': ['error', 'always'],
		'no-unused-vars': 'warn',
	},
};
