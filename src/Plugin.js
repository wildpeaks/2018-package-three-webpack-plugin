/* eslint-env node */
'use strict';
const PLUGIN_ID = 'wildpeaks-three';
const Loader = require.resolve('./Loader');

class Plugin {
	apply(compiler){ // eslint-disable-line class-methods-use-this
		compiler.hooks.normalModuleFactory.tap(PLUGIN_ID, normalModuleFactory => {
			normalModuleFactory.hooks.afterResolve.tap(PLUGIN_ID, data => {
				const {loaders, rawRequest} = data;
				if (rawRequest.startsWith('three/examples/js/')){
					const exportId = rawRequest.split('/').pop();
					if (rawRequest === 'three/examples/js/postprocessing/EffectComposer'){
						loaders.push({
							loader: Loader,
							options: {
								exports: {
									EffectComposer: 'THREE.EffectComposer',
									Pass: 'THREE.Pass'
								}
							}
						});
					} else if (rawRequest.startsWith('three/examples/js/postprocessing/')){
						loaders.push({
							loader: Loader,
							options: {
								requires: [
									'three/examples/js/postprocessing/EffectComposer'
								],
								exports: {
									[exportId]: `THREE.${exportId}`
								}
							}
						});
					} else {
						loaders.push({
							loader: Loader,
							options: {
								exports: {
									[exportId]: `THREE.${exportId}`
								}
							}
						});
					}
				}
				return data;
			});
		});
	}
}

module.exports = Plugin;
