'use strict';
const {getOptions} = require('loader-utils');


function Loader(source){
	const options = getOptions(this);
	let code = `'use strict';\nvar THREE = require('three');\n`;

	const optionsRequires = options.requires;
	if (Array.isArray(optionsRequires)){
		code += optionsRequires.map(moduleId => `require(${JSON.stringify(moduleId)});`).join('\n');
	}

	code += `${source}\n`;

	const optionsExports = options.exports;
	if ((typeof optionsExports === 'object') && (optionsExports !== null)){
		const lines = [];
		for (const id in optionsExports){
			const exportId = optionsExports[id];
			lines.push(`${JSON.stringify(id)}: ${exportId}`);
		}
		code += 'module.exports = {' + lines.join(',') + '}'; // eslint-disable-line prefer-template
	}

	return code;
}


module.exports = Loader;
