const teamName = document.getElementById('teamName');
const leaderName = document.getElementById('leaderName');
const level = document.getElementById('level');
const email = document.getElementById('email');

const backBtn = document.getElementById('backBtn');

if(localStorage.getItem('uid') != null){
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    teamName.value = userDetails.teamName
    leaderName.value = userDetails.name
    level.value = userDetails.level
    email.value = userDetails.email
}

backBtn.addEventListener('click', () => {
    window.location.replace('/home/index.html')
})

