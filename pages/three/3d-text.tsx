
import { useEffect, useRef } from "react";
import {
    Color,
  ConeGeometry,
  Fog,
  Group,
  Mesh,
  MeshNormalMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
const D3Text = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const farDist = 10000;
  const nearDist = 0.1;
  const material = new MeshNormalMaterial();
  

  const init = () => {
    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearAlpha(0);
    canvasRef.current!.appendChild(renderer.domElement);

    const scene = new Scene();
    scene.fog = new Fog(0xeeeeee, 0, 100);
    const camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      nearDist,
      farDist
    );
    camera.position.set(-2 * farDist, 0, 700);

    // 后期处理
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const glitchPass = new GlitchPass();
    composer.addPass(glitchPass);

    // 页面缩放
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    });
    // 双击全屏
    window.addEventListener("dblclick", () => {
      const fullscreenElement = document.fullscreenElement;
      if (!fullscreenElement) {
        if (canvasRef.current?.requestFullscreen) {
          canvasRef.current.requestFullscreen();
        }
        scene.background = new Color('skyblue')
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        scene.background = null;
        composer.render();
      }
    });

    // 字体
    const textMesh = new Mesh();
    const loader = new FontLoader();
    loader.load("/font/FZYaSongRegular.json", (font) => {
      textMesh.geometry = new TextGeometry("chatgpt\n666\nthree.js", {
        font: font,
        size: 100,
        height: 40,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 30,
        bevelSize: 8,
        bevelOffset: 1,
        bevelSegments: 12,
      });
      textMesh.material = material;
      textMesh.position.x = 120 * -2;
      textMesh.position.z = 120 * -1;
      scene.add(textMesh);
    });
    let mouseX = 0,
      mouseY = 0;
    const mouseFX = {
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2,
      coordinates: (coordX: number, coordY: number) => {
        mouseX = (coordX - mouseFX.windowHalfX) * 5;
        mouseY = (coordY - mouseFX.windowHalfY) * 5;
      },
      onMouseMove: (e: MouseEvent) => {
        mouseFX.coordinates(e.clientX, e.clientY);
      },
      onTouchMove: (e: TouchEvent) => {
        mouseFX.coordinates(
          e.changedTouches[0].clientX,
          e.changedTouches[0].clientY
        );
      },
    };
    document.addEventListener("mousemove", mouseFX.onMouseMove, false);
    document.addEventListener("touchmove", mouseFX.onTouchMove, false);

    // 创建装饰几何体
    const group = new Group();
    const generateRandomMesh = (
      geometry: any,
      material: any,
      count: number
    ) => {
      for (let i = 0; i < count; i++) {
        let mesh = new Mesh(geometry, material);
        let dist = farDist / 3;
        let distDouble = dist / 2;
        mesh.position.x = Math.random() * farDist-dist ;
        mesh.position.y = Math.random() * farDist-dist ;
        mesh.position.z = Math.random() * farDist-dist ;
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;
        // 手动控制何时重新计算3D变换来获得更好的性能
        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();
        group.add(mesh);
      }
    };
    const octahedronGeometry = new OctahedronGeometry(80);
    generateRandomMesh(octahedronGeometry, material, 100);
    const torusGeometry = new TorusGeometry(40, 25, 16, 40);
    generateRandomMesh(torusGeometry, material, 200);
    const coneGeometry = new ConeGeometry(40, 80, 80);
    generateRandomMesh(coneGeometry, material, 100);
    scene.add(group);

     // 动画

    const animate = () => {
        requestAnimationFrame(animate);
        console.log(camera);
        
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (mouseY * -1 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        const t = Date.now() * 0.001;
        const rx = Math.sin(t * 0.7) * 0.5;
        const ry = Math.sin(t * 0.3) * 0.5;
        const rz = Math.sin(t * 0.2) * 0.5;
        group.rotation.x = rx;
        group.rotation.y = ry;
        group.rotation.z = rz;
        textMesh.rotation.x = rx;
        textMesh.rotation.y = ry;
        textMesh.rotation.z = rx;
        renderer.render(scene, camera);
        // composer.render();
      };
      animate()
  };
  

  useEffect(() => {
    if (canvasRef.current) {
        init()
    }
  });
  return (
    <>
      <div className="h-screen overflow-hidden"><div  ref={canvasRef}></div></div>
    </>
  );
};
export default D3Text;
