/* eslint-env node, jasmine */
'use strict';
const {mkdirSync, readdirSync} = require('fs');
const {join} = require('path');
const express = require('express');
const puppeteer = require('puppeteer');
const rimraf = require('rimraf');
const webpack = require('webpack');
const ModuleNotFoundError = require('webpack/lib/ModuleNotFoundError');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Plugin = require('../src/Plugin');

const rootFolder = join(__dirname, 'fixtures');
const outputFolder = join(__dirname, '../temp');
let app;
let server;


/**
 * @param {webpack.Configuration} config
 */
function compile(config){
	return new Promise((resolve, reject) => {
		webpack(config, (err, stats) => {
			if (err){
				reject(err);
			} else {
				resolve(stats);
			}
		});
	});
}


/**
 * @param {String} entry
 * @param {Boolean} expectError
 * @param {String} expectText
 */
async function testFixture(entry, expectError, expectText){
	const config = {
		target: 'web',
		devtool: false,
		mode: 'development',
		context: rootFolder,
		entry: {
			application: entry
		},
		output: {
			publicPath: '',
			path: outputFolder,
			filename: '[name].js'
		},
		plugins: [
			new HtmlWebpackPlugin(),
			new Plugin()
		]
	};

	const stats = await compile(config);
	const {errors} = stats.compilation;
	if (expectError){
		expect(errors).not.toEqual([], 'Has errors');
	} else {
		expect(errors).toEqual([], 'No errors');

		const actualFiles = readdirSync(outputFolder);
		expect(actualFiles.sort()).toEqual(['application.js', 'index.html']);

		const browser = await puppeteer.launch();
		try {
			const page = await browser.newPage();
			await page.goto('http://localhost:8888/');
			const found = await page.evaluate(() => {
				/* global document */
				const el = document.getElementById('fixture');
				if (el === null){
					return '#fixture not found';
				}
				return String(el.innerText);
			});
			expect(found).toBe(expectText, 'DOM tests');
		} finally {
			await browser.close();
		}
	}

	return errors;
}


beforeAll(() => {
	app = express();
	app.use(express.static(outputFolder));
	server = app.listen(8888);
	jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
});

afterAll(done => {
	server.close(() => {
		done();
	});
});

beforeEach(done => {
	rimraf(outputFolder, () => {
		mkdirSync(outputFolder);
		done();
	});
});


it('Without examples', async() => {
	await testFixture('./without-examples.js', false, 'function');
});

it('With examples', async() => {
	await testFixture('./with-examples.js', false, 'function function function');
});

it('EffectComposer', async() => {
	await testFixture('./effectcomposer.js', false, 'function function function');
});

it('RenderPass', async() => {
	await testFixture('./renderpass.js', false, 'function function');
});

it('CopyShader', async() => {
	await testFixture('./copyshader.js', false, 'object string string');
});

it('Invalid path', async() => {
	const errors = await testFixture('./wrong-examples.js', true, '');
	expect(errors.length).toBe(1, 'Has one error');
	expect(errors[0] instanceof ModuleNotFoundError).toBe(true, 'The error is a ModuleNotFoundError');
});
