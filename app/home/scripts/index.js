const centerBtn = document.getElementById('centerBtn')
const cameraScene = document.getElementById('cameraScene')

const mapBtn = document.getElementById('mapBtn')
const mapScene = document.getElementById('mapScene')

const centerImg = document.getElementById('centerImg')

centerBtn.addEventListener('click', () => {
    if(centerImg.src.includes('camera.png')){
        console.log('cameraBtn')
        cameraScene.style.display = 'block'
        cameraScene.classList.add('block')
        cameraScene.classList.remove('hidden')
    
        mapScene.style.display = 'none'
        mapScene.classList.add('hidden')
        mapScene.classList.remove('block')
    
        centerImg.src = 'map-icon.png'
    }else{
        console.log('mapBtn')
        mapScene.style.display = 'block'
        mapScene.classList.add('block')
        mapScene.classList.remove('hidden')

        cameraScene.style.display = 'none'
        cameraScene.classList.add('hidden')
        cameraScene.classList.remove('block')
        console.log(cameraStream, video.srcObject)

        centerImg.src = 'camera.png'

        if (cameraStream) {
            // Get all tracks from the stream
            const tracks = cameraStream.getTracks();

            // Stop each track
            tracks.forEach(track => track.stop());

            // Remove the stream from the video element
            video.srcObject = null;

            // Reset the camera stream variable
            cameraStream = null;

            console.log(cameraStream, video.srcObject)
        }
    }
})