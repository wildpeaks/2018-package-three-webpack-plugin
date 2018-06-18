/* eslint-env node */
'use strict';
const PLUGIN_ID = 'wildpeaks-three';

class Plugin {
	apply(compiler){ // eslint-disable-line class-methods-use-this
		compiler.hooks.normalModuleFactory.tap(PLUGIN_ID, normalModuleFactory => {
			normalModuleFactory.hooks.afterResolve.tap(PLUGIN_ID, data => {
				const {loaders, rawRequest} = data;
				if (rawRequest.startsWith('three/examples/js/')){
					const exportId = rawRequest.split('/').pop();
					loaders.push('imports-loader?THREE=three');
					loaders.push(`exports-loader?THREE.${exportId}`);
				}
				return data;
			});
		});
	}
}

module.exports = Plugin;
