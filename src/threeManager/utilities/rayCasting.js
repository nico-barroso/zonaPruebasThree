import { Raycaster, Vector2 } from "three";

export const rayCasting = (event) => {
  const rayCaster = new Raycaster();
  const pointer = new Vector2();
  /*
    La librería de three.js trabaja con coordenadas normalizadas, es decir que el rango en el que
    puede trabajar es:
    [-1, 0] a [0, +1]
    -> Es por eso que el puntero al multiplicarlo por dos y restar o sumar acotas las coordenadas
    */
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  return { caster: rayCaster, pointer: pointer };
};
