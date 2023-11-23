const cameraBtn = document.getElementById("cameraBtn");

cameraBtn.addEventListener("click", () => {
    if(localStorage.getItem('story') == 'completed'){
        window.location.replace('/home/index.html')
    }else{
        window.alert('Please complete the story first!')
    }
})