import {Vector3} from 'three';
import {EffectComposer, Pass} from 'three/examples/js/postprocessing/EffectComposer';

const $div = document.createElement('div');
$div.setAttribute('id', 'fixture');
$div.innerText = ` ${typeof Vector3} ${typeof EffectComposer} ${typeof Pass}`;
document.body.appendChild($div);
