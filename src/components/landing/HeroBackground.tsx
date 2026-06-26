import { useEffect, useRef } from "react";
import type * as THREE from "three";

/**
 * Three.js neural-particle hero background.
 * - Floating particle cloud + connecting lines
 * - Cursor parallax with easing/inertia
 * - Lazy: only mounts after first paint; pauses when offscreen.
 */
export default function HeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
      camera.position.z = 14;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Particle cloud
      const COUNT = 220;
      const positions = new Float32Array(COUNT * 3);
      const speeds = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 26;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
        speeds[i] = 0.2 + Math.random() * 0.6;
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xffc801,
        size: 0.06,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(pGeo, pMat);
      scene.add(points);

      // Connecting lines (sparse neural look)
      const lineGeo = new THREE.BufferGeometry();
      const lineMat = new THREE.LineBasicMaterial({
        color: 0xff9932,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      });
      const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
      scene.add(lineSegments);

      // Holographic grid
      const grid = new THREE.GridHelper(60, 40, 0x114c5a, 0x114c5a);
      (grid.material as THREE.Material).transparent = true;
      (grid.material as THREE.Material).opacity = 0.18;
      grid.position.y = -6;
      grid.rotation.x = 0;
      scene.add(grid);

      // Soft glowing orb
      const orbGeo = new THREE.IcosahedronGeometry(1.6, 1);
      const orbMat = new THREE.MeshBasicMaterial({
        color: 0xff9932,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(4, 1, -2);
      scene.add(orb);

      const orb2 = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1, 1),
        new THREE.MeshBasicMaterial({
          color: 0xffc801,
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        }),
      );
      orb2.position.set(-5, -1, -1);
      scene.add(orb2);

      const target = { x: 0, y: 0 };
      const cur = { x: 0, y: 0 };

      const onPointer = (e: PointerEvent) => {
        const rect = mount.getBoundingClientRect();
        target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", onResize);

      let visible = true;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => (visible = e.isIntersecting)),
        { threshold: 0 },
      );
      io.observe(mount);

      // Rebuild line segments occasionally based on proximity
      const rebuildLines = () => {
        const pos = pGeo.attributes.position.array as Float32Array;
        const pts: number[] = [];
        const maxDist = 1.8;
        const maxLinks = 220;
        let links = 0;
        for (let i = 0; i < COUNT && links < maxLinks; i++) {
          for (let j = i + 1; j < COUNT && links < maxLinks; j++) {
            const dx = pos[i * 3] - pos[j * 3];
            const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
            const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
            const d2 = dx * dx + dy * dy + dz * dz;
            if (d2 < maxDist * maxDist) {
              pts.push(
                pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2],
              );
              links++;
            }
          }
        }
        lineGeo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(pts, 3),
        );
        lineGeo.attributes.position.needsUpdate = true;
      };

      let lineTick = 0;
      const clock = new THREE.Clock();

      const tick = () => {
        if (!visible) {
          raf = requestAnimationFrame(tick);
          return;
        }
        const t = clock.getElapsedTime();

        // Inertia toward target
        cur.x += (target.x - cur.x) * 0.04;
        cur.y += (target.y - cur.y) * 0.04;

        camera.position.x = cur.x * 1.2;
        camera.position.y = -cur.y * 0.8;
        camera.lookAt(0, 0, 0);

        // Ambient float
        const pos = pGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          pos[i * 3 + 1] += Math.sin(t * speeds[i] + i) * 0.0025;
        }
        pGeo.attributes.position.needsUpdate = true;

        orb.rotation.x = t * 0.15;
        orb.rotation.y = t * 0.2;
        orb2.rotation.x = -t * 0.12;
        orb2.rotation.y = t * 0.18;
        points.rotation.y = t * 0.04;
        grid.rotation.y = t * 0.02;

        if (++lineTick % 18 === 0) rebuildLines();

        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      rebuildLines();
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
        pGeo.dispose();
        pMat.dispose();
        lineGeo.dispose();
        lineMat.dispose();
        orbGeo.dispose();
        orbMat.dispose();
        if (renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
    />
  );
}
