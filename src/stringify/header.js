const declaration = '#JSGF';

export default ({
	version,
	encoding,
	lang
}) => [declaration, version, encoding, lang].filter(Boolean).join(' ');
