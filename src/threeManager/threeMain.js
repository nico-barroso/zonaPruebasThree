import { createRenderer, createCamera, createScene } from "./essentials";
import { modelLoader, rayCasting } from "./utilities";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export const threeBuilder = (container) => {
  const renderer = createRenderer(container);
  const scene = createScene(renderer);
  const camera = createCamera();
  new OrbitControls(camera, renderer.domElement);

  let model;
  let lastPointerEvent = null;

  modelLoader(scene, "src/threeManager/models/combat_robot/scene.gltf").then(
    (loadedModel) => {
      loadedModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      model = loadedModel;
    }
  );

  events();
  ticker();

  function events() {
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("pointermove", (event) => {
      lastPointerEvent = event;
    });
  }

  function ticker() {
    if (model) {
      model.rotation.y += 0.002;
    }

    pointingCasting(lastPointerEvent);
    requestAnimationFrame(ticker);
    renderer.render(scene, camera);
  }

  function pointingCasting(event) {
    if (!event) return;

    const { caster: raycaster, pointer } = rayCasting(event);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      console.log("Intersections:", intersects);
    }
  }
};
