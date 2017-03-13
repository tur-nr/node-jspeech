import stringifyHeader from './header';
import stringifyName from './name';
import arrifyRules from './rules';

export default (header, name, rules) => {
	const strings = [];

	strings.push(stringifyHeader(header));
	strings.push(stringifyName(name));
	strings.push('\n');
	strings.push(...arrifyRules(rules));

	return strings.reduce((str, item) => {
		// pass through whitespace
		if ((/^\s+$/).test(item)) {
			return `${str}${item}`;
		}
		return `${str}${str ? '\n' : ''}${item};`;
	}, '');
};
