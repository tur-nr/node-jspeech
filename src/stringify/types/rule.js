export default (name, token) => {
	if (!token) {
		throw new TypeError('illegal rule token');
	}
	return `<${name}> = ${token}`;
};
