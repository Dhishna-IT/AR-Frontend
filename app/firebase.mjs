import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js'
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
// import axios from "https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.1/axios.min.js"

const firebaseConfig = {
  apiKey: "AIzaSyBxBYM2_aWWrjVfcBsfVjFxo8D7RAQ2e08",
  authDomain: "ar-backend-3b206.firebaseapp.com",
  projectId: "ar-backend-3b206",
  storageBucket: "ar-backend-3b206.appspot.com",
  messagingSenderId: "670134185411",
  appId: "1:670134185411:web:57c2a85e57ccd0dc8a6176",
  measurementId: "G-1Q76YSXVLF"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

console.log('firebase.mjs loaded')

document.getElementById('loginform').addEventListener('submit', loginFirebase)

function loginFirebase(e) {
  e.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      let accessToken
      user.getIdTokenResult().then(async(tokenResult) => {
        const {token} = tokenResult
        accessToken = token
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('uid', user.uid)
        
        const headers = {
            Authorization: accessToken,
            uid: user.uid
        }
        
        window.location.replace('/home/index.html')
        await axios.post('https://ar-backend-7a3f65dd5c44.herokuapp.com/api/v1/login', {name: user.email}, {headers})
      })

    })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert(errorMessage)
  });
}