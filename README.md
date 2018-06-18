# Webpack Plugin: Three

[![Build Status](https://travis-ci.com/wildpeaks/package-three-webpack-plugin.svg?branch=master)](https://travis-ci.com/wildpeaks/package-three-webpack-plugin) [![Known Vulnerabilities](https://snyk.io/test/github/wildpeaks/package-three-webpack-plugin/badge.svg?targetFile=package.json)](https://snyk.io/test/github/wildpeaks/package-three-webpack-plugin?targetFile=package.json) [![Greenkeeper badge](https://badges.greenkeeper.io/wildpeaks/package-three-webpack-plugin.svg)](https://greenkeeper.io/) [![npm version](https://badge.fury.io/js/%40wildpeaks%2Fthree-webpack-plugin.svg)](https://www.npmjs.com/package/@wildpeaks/three-webpack-plugin)

Webpack plugin to use the additional **[Three.js](https://threejs.org/) "examples" classes that aren't ES Modules**,
such as [THREE.OrbitControls](https://threejs.org/docs/index.html#examples/controls/OrbitControls).


## Usage

Install packages `three` and `@wildpeaks/three-webpack-plugin`:

	npm install --save-dev three @wildpeaks/three-webpack-plugin

Add the plugin in your `webpack.config.js`:
````js
const ThreeWebpackPlugin = require('@wildpeaks/three-webpack-plugin');

module.exports = {
	//...
	plugins: [
		//...
		new ThreeWebpackPlugin()
	]
};
````

You can now import the classes in your application:
````js

// Import from "three" for core classes
import {Scene, WebGLRenderer} from 'three';

// Import from "three/examples/js" for addditional classes
import OrbitControls from 'three/examples/js/controls/OrbitControls';

// Use the imported classes
const scene = new Scene();
const renderer = new WebGLRenderer();
const controls = new OrbitControls();
````
