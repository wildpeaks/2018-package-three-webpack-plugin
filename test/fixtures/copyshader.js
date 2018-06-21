import {uniforms, vertexShader, fragmentShader} from 'three/examples/js/shaders/CopyShader';

const $div = document.createElement('div');
$div.setAttribute('id', 'fixture');
$div.innerText = ` ${typeof uniforms} ${typeof vertexShader} ${typeof fragmentShader}`;
document.body.appendChild($div);
