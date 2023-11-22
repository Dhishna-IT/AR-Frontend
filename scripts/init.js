let locIndex
if(localStorage.getItem('locIndex') === null || localStorage.getItem('locIndex') === undefined || localStorage.getItem('locIndex') === ""){
  locIndex = 0
  localStorage.setItem('locIndex', locIndex)
}else{
  locIndex = parseInt(localStorage.getItem('locIndex'))
}

let qid
if(localStorage.getItem('qid') === null || localStorage.getItem('qid') === undefined || localStorage.getItem('qid') === ""){
  qid = 0
  localStorage.setItem('qid', qid)
}else{
  qid = parseInt(localStorage.getItem('qid'))
}

async function fetchUserDetails(){
    try {
        const res = await axios.get(`https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/user/${localStorage.getItem('uid')}`)
        console.log(res)
        localStorage.setItem('userDetails', JSON.stringify(res.data.result))
    } catch (error) {
        console.log(error)
    }
}

if(localStorage.getItem('uid') != null){
  console.log(localStorage.getItem('uid'))
  fetchUserDetails()
}