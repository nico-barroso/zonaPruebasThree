import { createScene } from "./scene";
import { createCamera } from "./camera";
import { createRenderer } from "./render";
import { modelLoader } from "./modelLoader";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export const threeBuilder = (container) => {
  const scene = createScene();
  const camera = createCamera();
  const renderer = createRenderer(container);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  new OrbitControls(camera, renderer.domElement);
  let model;
  //Modelos
  modelLoader(scene, "src/threeManager/models/combat_robot/scene.gltf").then(
    (loadedModel) => {
      model = loadedModel;
    }
  ); //Eventos
  events();
  //Animacion
  animate();

  function events() {
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener("pointermove", rayCasting);
  }

  function rayCasting(event) {
    //Three trabaja con cordenadas normalizadas rango [-1,1]
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  function animate() {
    if (model) {
      model.rotation.y += 0.01;
    }
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      console.log("Tocado");
    }
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
};
