import bindInterface from './bind-interface';
import stringify from './stringify';
import * as type from './types';

const defaults = {
	version: 'V1.0',
	lang: 'en',
	encoding: 'utf-8'
};

export const types = type;

export default (name, opts = {}) => {
	if (!name) {
		throw new TypeError('expects name.');
	}

	const header = {
		...defaults,
		...opts
	};

	const rules = [];

	const rule = (name, token = '<NULL>', info) => rules.push([name, token, info]);
	const publicRule = (name, token, info) => rule(name, token, {
		...info,
		public: true
	});

	const interfaces = {
		rule: {type: type.RULE},
		word: {type: type.WORD},
		alt: {type: type.ALTERNATIVE}
	};

	const api = bindInterface(rule, interfaces);
	const publicApi = bindInterface(publicRule, interfaces);

	return {
		...api,
		public: {
			...publicApi
		},
		rules() {
			return rules.concat();
		},
		stringify() {
			return stringify(header, name, rules);
		}
	};
};
