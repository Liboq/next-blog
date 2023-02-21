import { useEffect, useRef } from 'react';
import THREE, { Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
const ThreeDHello = ()=>{
    const canvasRef = useRef(null)
useEffect(()=>{
        // 创建场景
    if(canvasRef.current){
        const scene = new Scene();

// 创建相机
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

// 创建渲染器
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(document);
document.body.appendChild(renderer.domElement);

// 加载字体文件
const loader = new FontLoader();
loader.load('/font/FZYaSongRegular.json', function (font) {

  // 创建文字几何体
  const textGeometry = new TextGeometry('Hello, World!', {
    font: font,
    size: 1,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelOffset: 0,
    bevelSegments: 5
  });

  // 创建材质
  const material = new MeshBasicMaterial({ color: 0xffffff });

  // 创建文字网格
  const textMesh = new Mesh(textGeometry, material);
  textMesh.position.set(-2, 1, 0);

  // 将文字网格添加到场景中
  scene.add(textMesh);

  // 渲染场景
  renderer.render(scene, camera);

  // 动画循环
  function animate() {
    requestAnimationFrame(animate);

    // 使文字旋转
    textMesh.rotation.x += 0.01;
    textMesh.rotation.y += 0.01;

    // 渲染场景
    renderer.render(scene, camera);
  }

  animate();
});
    }

    })
    return<> <div ref={canvasRef}></div></>
}
export default ThreeDHello