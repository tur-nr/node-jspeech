import stringifyTypes from './types';

export default rules => rules.map(([name, token, info]) => {
	const str = stringifyTypes[info.type](name, token, info.options);
	return (info.public) ? `public ${str}` : str;
});
