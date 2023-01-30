import {
  AxesHelper,
  BoxGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { onMounted } from "vue";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { ViewHelper } from "three/addons/helpers/ViewHelper.js";

const { innerWidth, innerHeight } = window;

let scene: Scene;
let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let stats: Stats;
let viewHelper: ViewHelper;
let mesh: Mesh;

const params = {
  animate: false,
  color: 0x00ff00,
  x: 0,
  y: 0,
  z: 5,
};

function init() {
  scene = new Scene();
  const aspect = innerWidth / innerHeight;
  camera = new PerspectiveCamera(75, aspect, 0.01, 1000);
  camera.position.z = params.z;

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ color: params.color });
  mesh = new Mesh(geometry, material);
  scene.add(mesh);

  const helper = new AxesHelper();
  scene.add(helper);

  renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(innerWidth, innerHeight);
  renderer.setAnimationLoop(animationLoop);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", () => render());

  const container = document.querySelector("#container")!;

  viewHelper = new ViewHelper(camera, container);

  stats = Stats();

  container.appendChild(renderer.domElement);
  document.body.appendChild(stats.dom);
  const dom = document.querySelector("#view-helper")!;
  dom.addEventListener("pointerup", (event) => {
    viewHelper.center = controls.target;
    viewHelper.handleClick(event);
  });

  const gui = new GUI();
  gui.add(params, "animate");
  gui.addColor(params, "color").onChange((value: THREE.ColorRepresentation) => {
    material.color.set(value);
    render();
  });
}

const clock = new Clock();

function animationLoop() {
  const delta = clock.getDelta();

  let needsUpdate = false;

  if (viewHelper.animating === true) {
    viewHelper.update(delta);
    needsUpdate = true;
  }

  if (params.animate === true) {
    animate();
    needsUpdate = true;
  }

  if (needsUpdate === true) {
    stats.update();
    render();
  }
}

function animate() {
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
}

function render() {
  renderer.render(scene, camera);

  renderer.autoClear = false;
  viewHelper.render(renderer);
  renderer.autoClear = true;
}

function resize() {
  const { innerWidth, innerHeight } = window;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
  render();
}
window.addEventListener("resize", resize);

function main() {
  onMounted(() => {
    init();
    render();
  });
}

export { main };
