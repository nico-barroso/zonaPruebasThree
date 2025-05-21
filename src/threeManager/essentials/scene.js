import { Scene, AmbientLight, PMREMGenerator } from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export const createScene = (renderer) => {
  const scene = new Scene();

  const ambientLight = new AmbientLight(0xffffff, 3);
  scene.add(ambientLight);
  dinamicRangeImg(scene, renderer);
  return scene;
};

function dinamicRangeImg(scene, renderer) {
  const rgbeLoader = new RGBELoader();
  const pmremGenerator = new PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();

  rgbeLoader.load(
    "src/threeManager/images/minedump_flats_4k.hdr",
    (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    }
  );
}
