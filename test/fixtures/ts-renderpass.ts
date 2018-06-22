import {Vector3} from 'three';
import {RenderPass} from 'three/examples/js/postprocessing/RenderPass';

const $div: HTMLDivElement = document.createElement('div');
$div.setAttribute('id', 'fixture');
$div.innerText = ` ${typeof Vector3} ${typeof RenderPass}`;
document.body.appendChild($div);
