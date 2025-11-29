import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const colorPalette = [
  new THREE.Color(0x10B981), 
  new THREE.Color(0xA3E635), 
  new THREE.Color(0xFACC15), 
  new THREE.Color(0xFB923C)
];

const cameraAngles = [
  { name: "FRONT", position: new THREE.Vector3(0, 0, 8) },
  { name: "BACK", position: new THREE.Vector3(0, 0, -8) },
  { name: "TOP", position: new THREE.Vector3(0, 8, 0) },
  { name: "BOTTOM", position: new THREE.Vector3(0, -8, 0) },
  { name: "LEFT", position: new THREE.Vector3(-8, 0, 0) },
  { name: "RIGHT", position: new THREE.Vector3(8, 0, 0) },
];

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

interface MorphingSphereProps {
  showControls?: boolean;
  className?: string;
  onAngleClick?: (angleName: string) => void;
  onSphereClick?: (position: THREE.Vector3, normal: THREE.Vector3) => void;
}

export default function MorphingSphere({
  showControls = true,
  className,
  onAngleClick,
  onSphereClick,
}: MorphingSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const spritesRef = useRef<Map<string, THREE.Sprite>>(new Map());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const sphereMeshRef = useRef<THREE.Points | null>(null);
  const connectionsMeshRef = useRef<THREE.LineSegments | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;

    const rect = container.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });

    const width = rect.width;
    const height = rect.height;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1200);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const controls = new OrbitControls(camera, renderer.domElement);
    Object.assign(controls, {
      enableDamping: true,
      dampingFactor: 0.05,
      rotateSpeed: 0.5,
      minDistance: 5,
      maxDistance: 50,
      autoRotate: true,
      autoRotateSpeed: 0.1,
      enablePan: false,
    });

    // --- Composer and Postprocessing ---
    const composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      0.13,
      0.03,
      0.85
    );
    composer.addPass(bloomPass);

    const filmPass = new FilmPass(0.25, false);
    composer.addPass(filmPass);

    composer.addPass(filmPass);



    // OutputPass is required to render to screen
    const outputPass = new OutputPass();
    outputPass.renderToScreen = true;
    composer.addPass(outputPass);

    // --- Shaders ---
    const nodeShader = {
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 0.5 * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }`,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha * 0.9);
        }`,
    };

    const connectionShader = {
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }`,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4(vColor, 0.3);
        }`,
    };

    function createVisualization() {
      const scale = 8;
      const baseGeometry = new THREE.IcosahedronGeometry(scale, 5);
      const spherePositions = baseGeometry.attributes.position.array as Float32Array;

      const uniqueVerticesMap = new Map<string, THREE.Vector3>();
      const sphereVertices: THREE.Vector3[] = [];

      for (let i = 0; i < spherePositions.length; i += 3) {
        const key = `${spherePositions[i].toFixed(3)},${spherePositions[i + 1].toFixed(3)},${spherePositions[i + 2].toFixed(3)}`;
        if (!uniqueVerticesMap.has(key)) {
          const vertex = new THREE.Vector3(spherePositions[i], spherePositions[i + 1], spherePositions[i + 2]);
          uniqueVerticesMap.set(key, vertex);
          sphereVertices.push(vertex);
        }
      }

      // --- Node Mesh ---
      const nodeGeometry = new THREE.BufferGeometry();
      const sphereNodePositions = sphereVertices.flatMap(v => [v.x, v.y, v.z]);
      nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(sphereNodePositions, 3));

      const nodeColors = new Float32Array(sphereNodePositions.length);
      for (let i = 0; i < sphereNodePositions.length / 3; i++) {
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        nodeColors[i * 3] = color.r;
        nodeColors[i * 3 + 1] = color.g;
        nodeColors[i * 3 + 2] = color.b;
      }
      nodeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));

      const nodeMaterial = new THREE.ShaderMaterial({
        vertexShader: nodeShader.vertexShader,
        fragmentShader: nodeShader.fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const nodesMesh = new THREE.Points(nodeGeometry, nodeMaterial);
      nodesMesh.layers.enable(1);
      nodesMesh.userData = { isSphere: true };
      sphereMeshRef.current = nodesMesh;
      scene.add(nodesMesh);

      // --- Connection Mesh ---
      const edgeGeometry = new THREE.EdgesGeometry(baseGeometry, 1);
      const connectionGeometry = new THREE.BufferGeometry();
      connectionGeometry.setAttribute('position', edgeGeometry.attributes.position);

      const connectionColors: number[] = [];
      const posCount = edgeGeometry.attributes.position.count / 2; // two points per line
      for (let i = 0; i < posCount; i++) {
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        connectionColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
      }
      connectionGeometry.setAttribute('color', new THREE.Float32BufferAttribute(connectionColors, 3));

      const connectionMaterial = new THREE.ShaderMaterial({
        vertexShader: connectionShader.vertexShader,
        fragmentShader: connectionShader.fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const connectionsMesh = new THREE.LineSegments(connectionGeometry, connectionMaterial);
      connectionsMesh.layers.enable(1);
      connectionsMesh.userData = { isSphere: true };
      connectionsMeshRef.current = connectionsMesh;
      scene.add(connectionsMesh);

      return { nodesMesh, connectionsMesh };
    }

    createVisualization();

    // --- Labels ---
    cameraAngles.forEach(angle => {
      const canvas2D = document.createElement('canvas');
      const context = canvas2D.getContext('2d')!;
      canvas2D.width = 1024;
      canvas2D.height = 256;

      const padding = 20;
      const boxWidth = canvas2D.width - padding * 2;
      const boxHeight = canvas2D.height - padding * 2;

      context.fillStyle = 'rgba(0, 0, 0, 0.8)';
      context.fillRect(padding, padding, boxWidth, boxHeight);
      context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      context.lineWidth = 3;
      context.strokeRect(padding, padding, boxWidth, boxHeight);

      context.fillStyle = 'rgb(255, 255, 255)';
      context.font = 'bold 64px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(angle.name, canvas2D.width / 2, canvas2D.height / 2);

      const texture = new THREE.CanvasTexture(canvas2D);
      texture.needsUpdate = true;

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthTest: true,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(angle.position);
      sprite.scale.set(8, 2, 1);
      sprite.userData = { angleName: angle.name, isLabel: true };
      sprite.layers.set(0);
      sprite.renderOrder = 999;
      scene.add(sprite);

      spritesRef.current.set(angle.name, sprite);
    });

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      setDimensions({ width: newWidth, height: newHeight });

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      composer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- Click & Hover Handlers ---
    const handleClick = (event: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);

      const sprites = Array.from(spritesRef.current.values()).filter(
        sprite => sprite.material instanceof THREE.SpriteMaterial && sprite.material.opacity > 0
      );
      const spriteIntersects = raycasterRef.current.intersectObjects(sprites);
      if (spriteIntersects.length > 0) {
        const clickedSprite = spriteIntersects[0].object as THREE.Sprite;
        const angleName = clickedSprite.userData.angleName;
        if (angleName && onAngleClick) onAngleClick(angleName);
        return;
      }

      if (sphereMeshRef.current && onSphereClick) {
        const intersects = raycasterRef.current.intersectObject(sphereMeshRef.current);
        if (intersects.length > 0) {
          const intersect = intersects[0];
          onSphereClick(intersect.point, intersect.point.clone().normalize());
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);

      let overSphere = false;
      if (sphereMeshRef.current) {
        overSphere = raycasterRef.current.intersectObject(sphereMeshRef.current).length > 0;
      }

      const overSprite = Array.from(spritesRef.current.values()).some(
        sprite => sprite.material instanceof THREE.SpriteMaterial && sprite.material.opacity > 0 &&
                  raycasterRef.current.intersectObject(sprite).length > 0
      );

      canvasRef.current.style.cursor = overSphere || overSprite ? 'pointer' : 'default';
    };

    canvasRef.current.addEventListener('click', handleClick);
    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      const cameraDir = new THREE.Vector3();
      camera.getWorldDirection(cameraDir);

      spritesRef.current.forEach(sprite => {
        const dot = sprite.position.clone().normalize().dot(cameraDir.clone().multiplyScalar(-1));
        if (dot > 0.3 && sprite.material instanceof THREE.SpriteMaterial) {
          sprite.material.opacity = Math.min(1.0, (dot - 0.3) / 0.7) * 0.95;
        } else if (sprite.material instanceof THREE.SpriteMaterial) {
          sprite.material.opacity = 0;
        }
      });

      composer.render();
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('click', handleClick);
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full bg-transparent overflow-hidden", className)}
      style={{ minHeight: '100%', minWidth: '100%' }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
