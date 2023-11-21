AFRAME.registerComponent('mycomponent', {
    init: function () {
      this.el.addEventListener('click', this.handleTouchStart.bind(this));
      this.el.addEventListener('touchstart', this.handleTouchStart.bind(this));
    },

    handleTouchStart: function () {
      this.stopCamera();
    },

    stopCamera: function () {
      const sceneEl = this.el.sceneEl;
      const camera = sceneEl.camera;

      // Check if the camera has a reference to the stream
      if (camera && camera.components['device-orientation']) {
        const cameraStream = camera.components['device-orientation'].sensorSource.sourceStream;

        // Check if the cameraStream is available
        if (cameraStream) {
          const tracks = cameraStream.getTracks();
          tracks.forEach(track => track.stop());
          console.log('Camera stopped.');
        } else {
          console.warn('Camera stream not available.');
        }
      } else {
        console.warn('Camera component not found.');
      }
    }
  });

  function updateModel(newLatitude, newLongitude) {
    console.log("updating model called");
    var model = document.getElementById("gltfModel");
    model.removeAttribute("gltf-model");
    model.setAttribute('gps-new-entity-place', `latitude: ${newLatitude}; longitude: ${newLongitude};`);
    const newModelURL = `3dAssets/${locIndex}.glb`
    console.log(newModelURL)
    localStorage.setItem('locIndex', locIndex)
    model.setAttribute('gltf-model', `${newModelURL}`);
    console.log("model updated");
  }

  const mybutton2 = document.getElementById("mapBtn");
  mybutton2.addEventListener("click", () => {
    updateModel();
  });
