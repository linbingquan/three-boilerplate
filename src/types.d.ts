declare module "three/addons/libs/lil-gui.module.min.js";

declare module "three/addons/helpers/ViewHelper.js" {
  export class ViewHelper {
    animating: boolean;
    controls: null | THREE.OrbitControls;
    constructor(camera: THREE.Camera, container: Element);
    render(renderer: THREE.WebGLRenderer): void;
    update(number: Number): void;
    handleClick(event: Event): boolean;
  }
}
