import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

import map from "assets/map.png";

const loadTexture = (url) => {
  return new Promise((resolve) => {
    new THREE.TextureLoader().load(url, resolve);
  });
};

// Convert coordinates from 2d to 3d
const calcPosFromLatLonRad = (lat, lng, radius, offset) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -((offset + radius) * Math.sin(phi) * Math.cos(theta));
  const z = (offset + radius) * Math.sin(phi) * Math.sin(theta);
  const y = (offset + radius) * Math.cos(phi);
  return { x, y, z };
};

// Get image data
const getImageData = function (image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  return ctx.getImageData(0, 0, image.width, image.height);
};

// Rotate the globe so that coordinates face the camera
export const rotateGlobe = (globe, lat, lng, vrtOffset, hrzOffset) => {
  gsap.to(globe.rotation, {
    duration: 3,
    x: lat * (Math.PI / 180) - vrtOffset,
    y: (270 - lng) * (Math.PI / 180) + hrzOffset,
  });
};

export const Globe = ({ spots, setGlobe }) => {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    (async () => {
      // Get container dimensions
      const width = container.current.clientWidth;
      const height = container.current.clientHeight;

      // Set up scene
      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x000428, 1000, 1200);

      // Set up camera
      const camera = new THREE.PerspectiveCamera(50, width / height);
      camera.position.z = 1500;

      // Set up renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      container.current.appendChild(renderer.domElement);

      // Set up lights
      const ambientLightColor = 0xffffff;
      const ambientLightIntensity = 1;
      const ambientLight = new THREE.AmbientLight(
        ambientLightColor,
        ambientLightIntensity
      );
      scene.add(ambientLight);

      const directionalLightColor = 0x004e92;
      const directionalLightIntensity = 1;
      const directionalLight = new THREE.DirectionalLight(
        directionalLightColor,
        directionalLightIntensity
      );
      directionalLight.position.set(10, 10, 0);
      directionalLight.target.position.set(0, 0, 0);
      scene.add(directionalLight);
      scene.add(directionalLight.target);

      // Load world map
      const imageData = await loadTexture(map).then((texture) => {
        return getImageData(texture.image);
      });

      // Define dot count and radius
      const DOT_COUNT = 60000;
      const RADIUS = 600;

      const positions = [];
      let indices = [];

      for (let i = DOT_COUNT; i >= 0; i--) {
        const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
        const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;

        const circleGeometry = new THREE.CircleGeometry(2, 5);
        const vector = new THREE.Vector3();

        vector.setFromSphericalCoords(RADIUS, phi, theta);

        circleGeometry.lookAt(vector);
        circleGeometry.translate(vector.x, vector.y, vector.z);
        circleGeometry.computeBoundingSphere();

        // Center position of circle
        const { x, y, z } = circleGeometry.boundingSphere.center;

        // convert uv coordinates to xy
        const u = 0.5 + Math.atan2(x / RADIUS, z / RADIUS) / (2 * Math.PI);
        const v = 0.5 - Math.asin(y / RADIUS) / Math.PI;

        const xPix = Math.round(u * imageData.width);
        const yPix = Math.round(v * imageData.height);

        const pixels = imageData.data;
        const pixelIndex = (yPix * imageData.width + xPix) * 4;
        const pixelAlpha = pixels[pixelIndex + 3];

        if (pixelAlpha > 50) {
          // prettier-ignore
          positions.push(...Array.from(circleGeometry.attributes.position.array));
          indices.push(Array.from(circleGeometry.index.array));
        }
      }

      const dotGeometry = new THREE.BufferGeometry();
      const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x4cddf2 });

      const position = new THREE.Float32BufferAttribute(positions, 3);
      indices = indices.map((arr, i) => arr.map((ind) => ind + i * 7)).flat();
      const index = new THREE.Uint32BufferAttribute(indices, 1);

      dotGeometry.setIndex(index);
      dotGeometry.setAttribute("position", position);

      const dotMesh = new THREE.Mesh(dotGeometry, dotMaterial);
      dotMesh.rotation.x = 0.5;
      scene.add(dotMesh);

      setGlobe(dotMesh);

      // Create points
      spots.forEach((spot) => {
        const point = new THREE.Mesh(
          new THREE.SphereGeometry(10, 20, 20),
          new THREE.MeshBasicMaterial({ color: 0xf59e0b })
        );

        const { x, y, z } = calcPosFromLatLonRad(spot.lat, spot.lng, RADIUS, 0);
        point.position.set(x, y, z);
        point.userData = spot;

        dotMesh.add(point);
      });

      const globeGeometry = new THREE.SphereGeometry(598, 64, 64);
      const globeMaterial = new THREE.MeshPhongMaterial({
        color: 0x000428,
        fog: false,
      });

      const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
      scene.add(globeMesh);

      // Animate scene
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    })();
  }, []);

  return <div ref={container} style={{ width: "100%", height: "100%" }} />;
};
