import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export function MorphSphere({
  radius = 15,
  morph = 0,
  onPointSelect,
  onHover,
}: {
  radius?: number;
  morph: number;
  onPointSelect?: (p: THREE.Vector3) => void;
  onHover?: (p: THREE.Vector3 | null) => void;
}) {
  const nodesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const sphere = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(radius, 5);

    const sphereVerts = [...base.attributes.position.array];
    const starVerts: number[] = [];

    const v = new THREE.Vector3();
    const sph = new THREE.Spherical();

    for (let i = 0; i < sphereVerts.length; i += 3) {
      v.set(sphereVerts[i], sphereVerts[i + 1], sphereVerts[i + 2]);
      sph.setFromVector3(v);

      const spike = 0.4 * Math.sin(sph.phi * 6) * Math.sin(sph.theta * 6);
      sph.radius *= 1 + spike;

      v.setFromSpherical(sph);
      starVerts.push(v.x, v.y, v.z);
    }

    // Node geometry
    const nodeGeom = new THREE.BufferGeometry();
    nodeGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(sphereVerts, 3)
    );
    nodeGeom.morphAttributes.position = [
      new THREE.Float32BufferAttribute(starVerts, 3),
    ];

    // Line geometry
    const edges = new THREE.EdgesGeometry(base);
    const linePos = edges.attributes.position.array;
    const lineGeom = new THREE.BufferGeometry();

    lineGeom.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePos, 3)
    );
    lineGeom.morphAttributes.position = [
      new THREE.Float32BufferAttribute(linePos, 3),
    ];

    return { nodeGeom, lineGeom };
  }, [radius]);

  // Apply morph
  useFrame(() => {
    if (nodesRef.current) nodesRef.current.morphTargetInfluences![0] = morph;
    if (linesRef.current) linesRef.current.morphTargetInfluences![0] = morph;
  });

  return (
    <group>
      {/* Node points */}
      <points
        ref={nodesRef}
        geometry={sphere.nodeGeom}
        onPointerMove={(e) => onHover?.(e.point)}
        onPointerOut={() => onHover?.(null)}
        onClick={(e) => onPointSelect?.(e.point)}
      >
        <pointsMaterial
          size={0.2}
          sizeAttenuation
          color="#50eaff"
          transparent
        />
      </points>

      {/* Connections */}
      <lineSegments ref={linesRef} geometry={sphere.lineGeom}>
        <lineBasicMaterial
          color="#20b5a7"
          transparent
          opacity={0.4}
        />
      </lineSegments>

      {/* Front label */}
      <Html position={[0, 0, radius * 1.1]} center>
        <div className="text-xs font-medium text-primary bg-black/80 px-2 py-1 rounded">
          Front
        </div>
      </Html>

      {/* Back label */}
      <Html position={[0, 0, -radius * 1.1]} center>
        <div className="text-xs font-medium text-muted-foreground bg-black/80 px-2 py-1 rounded">
          Back
        </div>
      </Html>
    </group>
  );
}
