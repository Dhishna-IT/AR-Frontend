function updateModel(){
    const gltfModel = document.getElementById('gltfModel')
    const newModelURL = `3dAssets/${locIndex+1}.gltf`;
    gltfModel.setAttribute('gltf-model', `${newModelURL}`);
}