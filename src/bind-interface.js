export default (fn, interfaces) => Object.keys(interfaces).reduce((obj, method) => ({
	...obj,
	[method](name, token, opts) {
		fn(name, token, {
			...interfaces[method],
			options: opts
		});
	}
}), {});
