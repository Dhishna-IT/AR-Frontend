const codeInput = document.getElementById('codeInput');
const enterCode = document.getElementById('enterCode');

const inputBox = document.getElementById('inputBox');
const questionBox = document.getElementById('questionBox');
const couponBox = document.getElementById('couponBox');

// const closeQuestionBox = document.getElementById('closeQuestionBox');
const closeCouponBox = document.getElementById('closeCouponBox');

let type = 'model'

let questionSet={}

let coupons = []

couponCodeMap = {
    '11234': 'kfc',
    '12345': 'pizzahut',
    '13456': 'mcdonalds',
    '14567': 'dominos'
}

const fetchQuestion = async() => {
    try {
        const res = await axios.get('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/question')
        console.log(res.data.result)
        questionSet = res.data.result[locIndex-1]
        const questionText = document.getElementById('questionText')
        const opt1 = document.getElementById('opt1')
        const opt2 = document.getElementById('opt2')
        const opt3 = document.getElementById('opt3')
        const opt4 = document.getElementById('opt4')
    
        questionText.innerHTML = res.data.result[locIndex-1].q
        opt1.innerHTML = res.data.result[locIndex-1].a
        opt2.innerHTML = res.data.result[locIndex-1].b
        opt3.innerHTML = res.data.result[locIndex-1].c
        opt4.innerHTML = res.data.result[locIndex-1].d
    } catch (error) {
        console.log(error)
    }
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
        if (code === '01234' && locIndex == 1) {
            inputBox.classList.add('hidden')
            inputBox.classList.remove('block');
    
            questionBox.classList.remove('hidden');
            questionBox.classList.add('block');

            fetchQuestion()

        }else{
            console.log('wrong code')
        }
    }

    if(type == 'coupon'){
        axios.get('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/coupon')
            .then(res => {
                coupons = res.data.result
                if (code === '11234' && coupons.includes(couponCodeMap[code])) {
                    inputBox.classList.add('hidden')
                    inputBox.classList.remove('block');
                    
                    couponBox.classList.remove('hidden')
                    couponBox.classList.add('block')

                    axios.delete(`http://localhost:5000/api/v1/coupon/${couponCodeMap[code]}`, {
                        headers:{
                            Authorization: localStorage.getItem('uid')
                        }
                    })
                }else if(code === '12345' && coupons.includes(couponCodeMap[code])){
                    inputBox.classList.add('hidden')
                    inputBox.classList.remove('block');
                    
                    couponBox.classList.remove('hidden')
                    couponBox.classList.add('block')

                    axios.delete(`http://localhost:5000/api/v1/coupon/${couponCodeMap[code]}`, {
                        headers:{
                            Authorization: localStorage.getItem('uid')
                        }
                    })
                }else if(code === '13456' && coupons.includes(couponCodeMap[code])){
                    inputBox.classList.add('hidden')
                    inputBox.classList.remove('block');
                    
                    couponBox.classList.remove('hidden')
                    couponBox.classList.add('block')

                    axios.delete(`http://localhost:5000/api/v1/coupon/${couponCodeMap[code]}`, {
                        headers:{
                            Authorization: localStorage.getItem('uid')
                        }
                    })
                }else if(code === '14567' && coupons.includes(couponCodeMap[code])){
                    inputBox.classList.add('hidden')
                    inputBox.classList.remove('block');
                    
                    couponBox.classList.remove('hidden')
                    couponBox.classList.add('block')

                    axios.delete(`http://localhost:5000/api/v1/coupon/${couponCodeMap[code]}`, {
                        headers:{
                            Authorization: localStorage.getItem('uid')
                        }
                    })
                }
            })
    }

});

opt1.addEventListener('click', async() => {
    if(opt1.innerText == questionSet.ans){
        console.log('correct answer')
        const time = new Date()
        await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/level', {timestamp: time}, {
            headers:{
                Authorization: localStorage.getItem('uid')
            }
        })
        levelIndex += 1
        localStorage.setItem('levelIndex', locIndex)
        window.location.replace('/page3/index.html')
    }else{
        window.alert('You clicked the wrong option! Please try again')
    }
}
)

opt2.addEventListener('click', async() => {
    if(opt2.innerText == questionSet.ans){
        console.log('correct answer')
        const time = new Date()
        await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/level', {timestamp: time}, {
            headers:{
                Authorization: localStorage.getItem('uid')
            }
        })
        levelIndex += 1
        localStorage.setItem('levelIndex', locIndex)
        window.location.replace('/page3/index.html')
    }else{
        window.alert('You clicked the wrong option! Please try again')
    }
}
)

opt3.addEventListener('click', async() => {
    if(opt3.innerText == questionSet.ans){
        console.log('correct answer')
        const time = new Date()
        await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/level', {timestamp: time}, {
            headers:{
                Authorization: localStorage.getItem('uid')
            }
        })
        levelIndex += 1
        localStorage.setItem('levelIndex', locIndex)
        window.location.replace('/page3/index.html')
    }else{
        window.alert('You clicked the wrong option! Please try again')
    }
}
)

opt4.addEventListener('click', async() => {
    if(opt4.innerText == questionSet.ans){
        console.log('correct answer')
        const time = new Date()
        await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/level', {timestamp: time}, {
            headers:{
                Authorization: localStorage.getItem('uid')
            }
        })
        levelIndex += 1
        localStorage.setItem('levelIndex', locIndex)
        window.location.replace('/page3/index.html')
    }else{
        window.alert('You clicked the wrong option! Please try again')
    }
}
)