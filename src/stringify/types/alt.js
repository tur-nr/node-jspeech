import rule from './rule';

export default (name, token, opts = {}) => {
	const {group, optional} = opts;
	const strings = [];

	if (!Array.isArray(token)) {
		throw new TypeError('expects Array for group rules.');
	}

	if (group) {
		strings.push(optional ? '[' : '(');
	}

	token = token.map(item => {
		// contains weights?
		return Array.isArray(item) ? `/${item[1]}/ ${item[0]}` : item;
	});

	strings.push(token.join(' | '));

	if (group) {
		strings.push(optional ? ']' : ')');
	}

	return rule(name, strings.join(' '));
};
