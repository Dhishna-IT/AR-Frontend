const codeInput = document.getElementById('codeInput');
const enterCode = document.getElementById('enterCode');

const inputBox = document.getElementById('inputBox');
const questionBox = document.getElementById('questionBox');
const couponBox = document.getElementById('couponBox');

// const closeQuestionBox = document.getElementById('closeQuestionBox');
const closeCouponBox = document.getElementById('closeCouponBox');

const questionText = document.getElementById('questionText')
const opt1 = document.getElementById('opt1')
const opt2 = document.getElementById('opt2')
const opt3 = document.getElementById('opt3')
const opt4 = document.getElementById('opt4')

let type = 'model'

let questionSet={}
let questionsSet = []

let coupons = []

couponCodeMap = {
    '14449': 'food0',
    '16901': 'food1',
    '11219': 'food2',
    '13632': 'food3',
    '15958': 'food4'
}

const fetchQuestions = async() => {
    try {
        const res = await axios.get('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/question')
        questionsSet = res.data.result
    } catch (error) {
        console.log(error)
    }
}

fetchQuestions()

function displayQuestion(){
    qid = parseInt(localStorage.getItem('qid'))
    const questionNo = document.getElementById('questionNo')
    questionNo.innerHTML = `${qid+1}`
    if(qid == 30){
        qid = 0
    }
    questionSet = questionsSet[qid]

    questionText.innerHTML = questionSet.q
    opt1.innerHTML = questionSet.a
    opt2.innerHTML = questionSet.b
    opt3.innerHTML = questionSet.c
    opt4.innerHTML = questionSet.d
}

// closeQuestionBox.addEventListener('click', () => {
//     questionBox.classList.add('hidden')
//     questionBox.classList.remove('block')

//     inputBox.classList.remove('hidden')
//     inputBox.classList.add('block')
// })

closeCouponBox.addEventListener('click', () => {
    couponBox.classList.add('hidden')
    couponBox.classList.remove('block')
})

enterCode.addEventListener('click', () => {
    const code = codeInput.value;
    if(code[0] == '0'){
        type = 'model'
    }else if(code[0] == '1'){
        type = 'coupon'
    }

    if(type == 'model'){
        if ((code === '05035' && locIndex == 0) || (code === '09889' && locIndex == 1) || (code === '03984' && locIndex == 2) || (code === '02565' && locIndex == 3) || (code === '09015' && locIndex == 4) || (code === '07342' && locIndex == 5)) {
            inputBox.classList.add('hidden')
            inputBox.classList.remove('block');
    
            questionBox.classList.remove('hidden');
            questionBox.classList.add('block');

            displayQuestion()
        }else{
            window.alert('Wrong code! Please try again')
        }
    }

    if(type == 'coupon'){
        axios.get('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/coupon')
            .then(res => {
                coupons = res.data.result
                if ((code === '14449' || code == '16901' || code == '11219' || code == '13632' || code == '15958' || code == '17826' || '165123' || '19673' || '16882' || '17395') && coupons.includes(couponCodeMap[code])) {
                    inputBox.classList.add('hidden')
                    inputBox.classList.remove('block');
                    
                    couponBox.classList.remove('hidden')
                    couponBox.classList.add('block')

                    axios.delete(`https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/coupon/${couponCodeMap[code]}`, {
                        headers:{
                            Authorization: localStorage.getItem('uid')
                        }
                    })
                }else{
                    window.alert('Wrong coupon code! Please try again')
                }
            })
    }

});

opt1.addEventListener('click', async() => {
    if(opt1.innerText == questionSet.ans){
        const time = new Date()
        await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/level', {timestamp: time}, {
            headers:{
                Authorization: localStorage.getItem('uid')
            }
        })
        locIndex = parseInt(localStorage.getItem('locIndex'))
        locIndex += 1
        localStorage.setItem('locIndex', locIndex)
        window.location.replace('/page3/index.html')
    }else{
        window.alert('You clicked the wrong option! Please try another question')
    }
    qid = parseInt(localStorage.getItem('qid'))
    qid += 1
    localStorage.setItem('qid', qid)
    questionSet = questionsSet[qid]
    displayQuestion()
}
)

opt2.addEventListener('click', async() => {
    if(opt2.innerText == questionSet.ans){
        const time = new Date()
        await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/level', {timestamp: time}, {
            headers:{
                Authorization: localStorage.getItem('uid')
            }
        })
        locIndex = parseInt(localStorage.getItem('locIndex'))
        locIndex += 1
        localStorage.setItem('locIndex', locIndex)
        window.location.replace('/page3/index.html')
    }else{
        window.alert('You clicked the wrong option! Please try another question')
    }
    qid = parseInt(localStorage.getItem('qid'))
    qid += 1
    localStorage.setItem('qid', qid)
    questionSet = questionsSet[qid]
    displayQuestion()
}
)

opt3.addEventListener('click', async() => {
    if(opt3.innerText == questionSet.ans){
        const time = new Date()
        await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/level', {timestamp: time}, {
            headers:{
                Authorization: localStorage.getItem('uid')
            }
        })
        locIndex = parseInt(localStorage.getItem('locIndex'))
        locIndex += 1
        localStorage.setItem('locIndex', locIndex)
        window.location.replace('/page3/index.html')
    }else{
        window.alert('You clicked the wrong option! Please try another question')
    }
    qid = parseInt(localStorage.getItem('qid'))
    qid += 1
    localStorage.setItem('qid', qid)
    questionSet = questionsSet[qid]
    displayQuestion()
}
)

opt4.addEventListener('click', async() => {
    if(opt4.innerText == questionSet.ans){
        const time = new Date()
        await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/level', {timestamp: time}, {
            headers:{
                Authorization: localStorage.getItem('uid')
            }
        })
        locIndex = parseInt(localStorage.getItem('locIndex'))
        locIndex += 1
        localStorage.setItem('locIndex', locIndex)
        window.location.replace('/page3/index.html')
    }else{
        window.alert('You clicked the wrong option! Please try another question')
    }
    qid = parseInt(localStorage.getItem('qid'))
    qid += 1
    localStorage.setItem('qid', qid)
    questionSet = questionsSet[qid]
    displayQuestion()
}
)