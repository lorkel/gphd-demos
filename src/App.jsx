import React, { useEffect, useRef } from 'react';
import 'aframe';
import 'mind-ar/dist/mindar-image-aframe.prod.js';

const MindARComponent = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    if (sceneRef.current) {
      const scene = sceneRef.current;

      // Set up the A-Frame scene
      scene.setAttribute('mindar-image', 'imageTargetSrc: //cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind;');
      scene.setAttribute('color-space', 'sRGB');
      scene.setAttribute('renderer', 'colorManagement: true, physicallyCorrectLights');
      scene.setAttribute('vr-mode-ui', 'enabled: false');
      scene.setAttribute('device-orientation-permission-ui', 'enabled: false');

      // Create the assets
      const assets = document.createElement('a-assets');
      const card = document.createElement('img');
      card.setAttribute('id', 'card');
      card.setAttribute('src', '//cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.png');
      assets.appendChild(card);

      const avatarModel = document.createElement('a-asset-item');
      avatarModel.setAttribute('id', 'avatarModel');
      avatarModel.setAttribute('src', '//cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/softmind/scene.gltf');
      assets.appendChild(avatarModel);

      // Add the assets to the scene
      scene.appendChild(assets);

      // Create the camera
      const camera = document.createElement('a-camera');
      camera.setAttribute('position', '0 0 0');
      camera.setAttribute('look-controls', 'enabled: false');
      scene.appendChild(camera);

      // Create the image target entity
      const imageTarget = document.createElement('a-entity');
      imageTarget.setAttribute('mindar-image-target', 'targetIndex: 0');

      const plane = document.createElement('a-plane');
      plane.setAttribute('src', '#card');
      plane.setAttribute('position', '0 0 0');
      plane.setAttribute('height', '0.552');
      plane.setAttribute('width', '1');
      plane.setAttribute('rotation', '0 0 0');
      imageTarget.appendChild(plane);

      const gltfModel = document.createElement('a-gltf-model');
      gltfModel.setAttribute('rotation', '0 0 0');
      gltfModel.setAttribute('position', '0 0 0.1');
      gltfModel.setAttribute('scale', '0.005 0.005 0.005');
      gltfModel.setAttribute('src', '#avatarModel');
      gltfModel.setAttribute('animation', 'property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate');
      imageTarget.appendChild(gltfModel);

      scene.appendChild(imageTarget);
    }
  }, []);

  return <a-scene ref={sceneRef}></a-scene>;
};

export default MindARComponent;