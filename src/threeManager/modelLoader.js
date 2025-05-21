import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 *
 * @param {*} scene Escena donde se va a a añadir el modelo
 * @param {*} path Ruta al modelo gltf
 * @param {*} onProgress muestra lo que quieras mientras se carga el modelo.
 */
export const modelLoader = (scene, path, onProgress) => {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => {
        scene.add(gltf.scene);
        resolve(gltf.scene);
      },
      onProgress,
      (error) => {
        console.error("Error al cargar el modelo:", error);
        reject(error);
      }
    );
  });
};
