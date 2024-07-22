import React, { useEffect } from 'react';
import * as THREE from "https://unpkg.com/three@0.139.0/build/three.module.js";
import textureImg from '../assets/8k_sun.jpg';

const Prehome = () => {

  useEffect(() => {
    const initGlobe = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(39, window.innerWidth / window.innerHeight, 0.1, 800);
      const renderer = new THREE.WebGLRenderer({ alpha: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
      renderer.domElement.id = "globeCanvas";

      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(textureImg);

      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({ map: texture });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(sphere);

      // Ajouter une lumière ambiante pour un éclairage global
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Ajouter une lumière ponctuelle pour des ombres et des reflets
      const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
      pointLight.position.set(10, 10, 10);
      scene.add(pointLight);

      camera.position.z = 3;

      const animate = () => {
        requestAnimationFrame(animate);
        sphere.rotation.x += 0.0000;
        sphere.rotation.y += 0.0005;
        renderer.render(scene, camera);
      };

      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });

      return () => {
        document.body.removeChild(renderer.domElement);
        window.removeEventListener('resize', () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      };
    };

    initGlobe();
  }, []);

  return (
    <div>
      <canvas id="globeCanvas"/>
    </div>
  );
};

export default Prehome;
