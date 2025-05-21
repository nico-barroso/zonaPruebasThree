import { Scene, AmbientLight } from "three";

export const createScene = () => {
  const scene = new Scene();

  const ambientLight = new AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  return scene;
};
