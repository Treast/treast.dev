import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#FDA7DF');
    this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.scene.add(new THREE.AmbientLight());

    const light1 = new THREE.PointLight(0xffffff, 1, 0);
    light1.position.set(0, 20, 0);
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 1, 0);
    light2.position.set(10, 20, 10);
    this.scene.add(light2);

    const light3 = new THREE.PointLight(0xffffff, 1, 0);
    light3.position.set(-10, -20, -10);
    this.scene.add(light3);

    this.bind();
  }

  bind() {
    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  init() {
    this.camera.position.set(1.159772200661818, 3.4616271124229474, 10.586240970049376);
    this.camera.lookAt(0, 0, 0);

    this.initHanger();
    // const torusGeometry = new THREE.TorusKnotGeometry(0.8, 0.2, 200, 32);
    // const torusMaterial = new THREE.MeshNormalMaterial();
    // this.torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    // this.scene.add(this.torusMesh);
  }

  initHanger() {
    const fbxLoader = new FBXLoader();
    const material = new THREE.MeshPhongMaterial({
      color: '#494a4b',
      emissive: '#303030',
      specular: '#605c5c',
      shininess: 30,
      reflectivity: 1,
      refractionRatio: 0.98,
    });
    fbxLoader.load('assets/hanger.fbx', (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          child.material = material;
          if (child.material) {
            child.material.transparent = false;
          }
        }
      });
      this.hangerMesh = object;
      this.hangerMesh.material = material;

      this.hangerMesh.scale.set(0.2, 0.2, 0.2);
      this.scene.add(this.hangerMesh);
    });
  }

  render() {
    requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);

    // this.controls.update();

    // this.torusMesh.rotation.x += 0.01;
    if (this.hangerMesh) {
      this.hangerMesh.rotation.y -= 0.01;
    }

    // console.log(this.camera.position);
  }
}

export default new Scene();
