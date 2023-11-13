const cameraBtn = document.getElementById('cameraBtn')
const cameraScene = document.getElementById('cameraScene')

const mapBtn = document.getElementById('mapBtn')
const mapScene = document.getElementById('mapScene')

cameraBtn.addEventListener('click', () => {
    console.log('cameraBtn')
    cameraScene.style.display = 'block'
    mapScene.style.display = 'none'
})

mapBtn.addEventListener('click', () => {
    console.log('mapBtn')
    mapScene.style.display = 'block'
    cameraScene.style.display = 'none'
})