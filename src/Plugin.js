/* eslint-env node */
'use strict';
const PLUGIN_ID = 'wildpeaks-three';
const Loader = require.resolve('./Loader');
const path = require('path');

class Plugin {
	constructor(libPath, postProcessingPath){
		this.libPaths = [];
		this.postProcessingPath = path.normalize(postProcessingPath || 'postprocessing/');

		if(Array.isArray(libPath)){
			this.libPaths = this.libPaths.concat(libPath.map(p=>path.normalize(p)));
		}
		else {
			this.libPaths.push(typeof libPath === 'string' ? path.normalize(libPath) : path.normalize('three/examples/js/'));
		}
		
		
	}
	apply(compiler){ // eslint-disable-line class-methods-use-this
		compiler.hooks.normalModuleFactory.tap(PLUGIN_ID, normalModuleFactory => {
			normalModuleFactory.hooks.afterResolve.tap(PLUGIN_ID, data => {
				const {loaders, rawRequest} = data;
				const rawRequestNormalized = path.normalize(rawRequest);
				this.libPaths.forEach( libPath =>{
					if (rawRequestNormalized.startsWith(libPath)){
						const effectComposerPath = path.join(libPath, this.postProcessingPath, "EffectComposer");
						const exportId = rawRequestNormalized.split(path.sep).pop().replace('.js','');
						if (rawRequestNormalized === effectComposerPath){
							loaders.push({
								loader: Loader,
								options: {
									exports: {
										EffectComposer: 'THREE.EffectComposer',
										Pass: 'THREE.Pass'
									}
								}
							});
						} else if (rawRequestNormalized.startsWith(path.join(libPath, this.postProcessingPath))){
							loaders.push({
								loader: Loader,
								options: {
									requires: [
										effectComposerPath
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
				})
				return data;
			});
		});
	}
}

module.exports = Plugin;
