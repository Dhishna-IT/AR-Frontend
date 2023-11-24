const centerBtn = document.getElementById('centerBtn')
const cameraScene = document.getElementById('cameraScene')
const mapScene = document.getElementById('mapScene')
const storyBtn = document.getElementById('storyBtn')
const openInput = document.getElementById('openInput')
const captureBtn = document.getElementById('captureBtn')
const centerImg = document.getElementById('centerImg')

storyBtn.addEventListener('click', () => {
    window.location.replace('/page3/index.html')
})

centerBtn.addEventListener('click', () => {
    if(centerImg.src.includes('camera-float.png')){
        centerImg.src = '../assets/map-float.png'

        cameraScene.style.display = 'block'
        cameraScene.classList.add('block')
        cameraScene.classList.remove('hidden')
    
        mapScene.style.display = 'none'
        mapScene.classList.add('hidden')
        mapScene.classList.remove('block')
    
    }else{
        centerImg.src = '../assets/camera-float.png'
        
        mapScene.style.display = 'block'
        mapScene.classList.add('block')
        mapScene.classList.remove('hidden')

        


        const video = document.getElementById("cameraFeed");

        let cameraStream = null;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
            .getUserMedia({ video: {facingMode: 'environment'} })
            .then(function (stream) { 
                stream.getTracks().forEach(track => console.log(track))
                stream.getTracks()
                .forEach(track => track.stop());
                video.srcObject = null;
                cameraStream = null;
                document.getElementsByTagName('video')[1].style.display = 'none'
                cameraScene.style.display = 'none'
                cameraScene.classList.add('hidden')
                cameraScene.classList.remove('block')
            })
            .catch(function (error) {
                console.error("Error accessing camera:", error);
            });
        } else {
            console.error("getUserMedia is not supported in this browser.");
        }
    }
})

async function checkAllUsers(){
    const res = await axios.get('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/user')
    const allUsers = res.data.result
    let shouldMakeSecondCall = true
    allUsers.map(user => {
        if(user.winner){
            window.alert(`Oops! You are a bit late :(`)
            shouldMakeSecondCall = false
            return false
        }
    })
    if(shouldMakeSecondCall == true){
        const res2 = await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/winner', {}, {
            headers: {
                Authorization: localStorage.getItem('uid')
            }
        })
        return true
    }
}

captureBtn.addEventListener('click', async() => {
    const winner = await checkAllUsers()
    console.log(winner)
    if(winner == true){
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
            .getUserMedia({ video: {facingMode: 'environment'} })
            .then(function (stream) { 
                stream.getTracks().forEach(track => console.log(track))
                stream.getTracks()
                .forEach(track => track.stop());
                video.srcObject = null;
                cameraStream = null;
                document.getElementsByTagName('video')[1].style.display = 'none'
                cameraScene.style.display = 'none'
                cameraScene.classList.add('hidden')
                cameraScene.classList.remove('block')
            })
            .catch(function (error) {
                console.error("Error accessing camera:", error);
            });
        } else {
            console.error("getUserMedia is not supported in this browser.");
        }
        
        cameraScene.style.display = 'none'
        cameraScene.classList.add('hidden')
        cameraScene.classList.remove('block')
        mapScene.style.display = 'none'
        mapScene.classList.add('hidden')
        mapScene.classList.remove('block')
        const winnerScene = document.getElementById('winnerScene')
        winnerScene.classList.remove('hidden')
        winnerScene.classList.add('block')
        const winnerVideo = document.getElementById("winnerVideo");
        winnerVideo.src = '3dAssets/winner.mp4'
        captureBtn.classList.add('hidden')
        captureBtn.classList.remove('block')
    }
})

openInput.addEventListener('click', () => {
    inputBox.classList.add('block')
    inputBox.classList.remove('hidden')
})