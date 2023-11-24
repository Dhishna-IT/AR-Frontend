const cameraBtn = document.getElementById("cameraBtn");
const mapBtn = document.getElementById("mapBtn");

cameraBtn.addEventListener("click", () => {
    if(localStorage.getItem('story') == 'completed'){
        window.location.replace('/home/index.html')
    }else{
        window.alert('Please complete the story first!')
    }
})

mapBtn.addEventListener("click", () => {
    if(localStorage.getItem('story') == 'completed'){
        window.location.replace('/home/index.html')
    }else{
        window.alert('Please complete the story first!')
    }
})