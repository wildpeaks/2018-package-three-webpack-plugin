import {CopyShader} from 'three/examples/js/shaders/CopyShader';

const $div = document.createElement('div');
$div.setAttribute('id', 'fixture');
$div.innerText = `${typeof CopyShader} ${typeof CopyShader.uniforms} ${typeof CopyShader.vertexShader} ${typeof CopyShader.fragmentShader}`;
document.body.appendChild($div);
