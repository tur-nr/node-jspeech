import rule from './rule';

export default (name, token) => {
	if ((/\s+/).test(token)) {
		token = `"${token}"`;
	}
	return rule(name, token);
};
