import { WebGLRenderer } from "three";

/**
 * Crea el motor de renderizado de la escena.
 * @param {*} element selector clase <.> o id <#> del contenedor de la escena en DOM.
 * @returns instancia del objeto renderer
 */

export const createRenderer = (selector) => {
  const renderer = new WebGLRenderer({
    antialias: true,
  });
  const container = document.querySelector(selector);

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  return renderer;
};
