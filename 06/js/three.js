import * as THREE from 'three';
//import { OrbitControls } from 'OrbitControls';
      
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );
//controls = new OrbitControls(camera, renderer.domElement);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 20, 4, 10 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.y = 4;
camera.position.z = 13;

function animate() {
  requestAnimationFrame( animate );

  // cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  // cube.rotation.z += 0.01;

  renderer.render( scene, camera );
};

animate();