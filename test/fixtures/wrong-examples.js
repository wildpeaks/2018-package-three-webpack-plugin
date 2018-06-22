import {Vector3} from 'three';
import OBJLoader from 'three/examples/js/fake/OBJLoader';

const $div = document.createElement('div');
$div.setAttribute('id', 'fixture');
$div.innerText = `${typeof Vector3} ${typeof OBJLoader}`;
document.body.appendChild($div);
