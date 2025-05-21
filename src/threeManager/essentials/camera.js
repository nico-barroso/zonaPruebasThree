import { PerspectiveCamera } from "three";

export const createCamera = () => {
  const camera = new PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(2, 0, 5);
  return camera;
};
