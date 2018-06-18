import {Vector3} from 'three';
import OrbitControls from "three/examples/js/controls/OrbitControls";
import OBJLoader from "three/examples/js/loaders/OBJLoader";

console.log('[OrbitControls]', OrbitControls);
console.log('[OBJLoader]', OBJLoader);

const $div = document.createElement('div');
$div.setAttribute('id', 'fixture');
$div.innerText = `${typeof Vector3} ${typeof OBJLoader} ${typeof OrbitControls}`;
document.body.appendChild($div);
