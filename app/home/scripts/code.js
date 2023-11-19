const codeInput = document.getElementById('codeInput');
const enterCode = document.getElementById('enterCode');

const inputBox = document.getElementById('inputBox');
const questionBox = document.getElementById('questionBox');

// const closeQuestionBox = document.getElementById('closeQuestionBox');

let type = 'model'

let questionSet={

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

enterCode.addEventListener('click', () => {
    const code = codeInput.value;
    console.log(code[0])
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

    }

});

opt1.addEventListener('click', () => {
    if(opt1.innerText == questionSet.ans){
        console.log('correct answer')
        window.location.replace('/page3/index.html')
    }
}
)

opt2.addEventListener('click', () => {
    if(opt2.innerText == questionSet.ans){
        console.log('correct answer')
        window.location.replace('/page3/index.html')
    }
}
)

opt3.addEventListener('click', () => {
    if(opt3.innerText == questionSet.ans){
        console.log('correct answer')
        window.location.replace('/page3/index.html')
    }
}
)

opt4.addEventListener('click', () => {
    if(opt4.innerText == questionSet.ans){
        console.log('correct answer')
        window.location.replace('/page3/index.html')
    }
}
)