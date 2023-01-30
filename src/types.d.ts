declare module "three/addons/libs/lil-gui.module.min.js";

declare module "three/addons/helpers/ViewHelper.js" {
  export class ViewHelper {
    animating: boolean;
    center: THREE.Vector3;
    constructor(camera: THREE.Camera, container: Element);
    render(renderer: THREE.WebGLRenderer): void;
    update(number: Number): void;
    handleClick(event: Event): boolean;
  }
}
