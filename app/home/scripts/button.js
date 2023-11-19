const centerBtn = document.getElementById('centerBtn')
const cameraScene = document.getElementById('cameraScene')
const mapScene = document.getElementById('mapScene')

const centerImg = document.getElementById('centerImg')

centerBtn.addEventListener('click', () => {
    if(centerImg.src.includes('camera.png')){
        console.log('cameraBtn')
        centerImg.src = 'map-icon.png'

        cameraScene.style.display = 'block'
        cameraScene.classList.add('block')
        cameraScene.classList.remove('hidden')
    
        // mapScene.style.display = 'none'
        // mapScene.classList.add('hidden')
        // mapScene.classList.remove('block')
    
    }else{
        console.log('mapBtn')
        centerImg.src = 'camera.png'
        
        // mapScene.style.display = 'block'
        // mapScene.classList.add('block')
        // mapScene.classList.remove('hidden')

        cameraScene.style.display = 'none'
        cameraScene.classList.add('hidden')
        cameraScene.classList.remove('block')


        const video = document.getElementById("cameraFeed");

        let cameraStream = null;
        // Check if getUserMedia is available in the browser
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
            .getUserMedia({ video: {facingMode: 'environment'} })
            .then(function (stream) { 
                stream.getTracks().forEach(track => console.log(track))
                stream.getTracks()
                .forEach(track => track.stop());
                // Assign the camera stream to the video element
                video.srcObject = null;
                cameraStream = null;
            })
            .catch(function (error) {
                console.error("Error accessing camera:", error);
            });
        } else {
            console.error("getUserMedia is not supported in this browser.");
        }
    }
})