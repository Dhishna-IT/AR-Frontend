const cameraBtn = document.getElementById('cameraBtn')
const cameraScene = document.getElementById('cameraScene')

const mapBtn = document.getElementById('mapBtn')
const mapScene = document.getElementById('mapScene')

cameraBtn.addEventListener('click', () => {
    console.log('cameraBtn')
    cameraScene.style.display = 'block'
    cameraScene.classList.add('block')
    cameraScene.classList.remove('hidden')

    mapScene.style.display = 'none'
    mapScene.classList.add('hidden')
    mapScene.classList.remove('block')
})

mapBtn.addEventListener('click', () => {
    console.log('mapBtn')
    mapScene.style.display = 'block'
    mapScene.classList.add('block')
    mapScene.classList.remove('hidden')

    cameraScene.style.display = 'none'
    cameraScene.classList.add('hidden')
    cameraScene.classList.remove('block')
})