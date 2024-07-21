// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYfBm1bVX-jWuGY1ThG3FgGU3V_QLZB7Q",
  authDomain: "altium-cd024.firebaseapp.com",
  projectId: "altium-cd024",
  storageBucket: "altium-cd024.appspot.com",
  messagingSenderId: "904813905259",
  appId: "1:904813905259:web:f1bb555fdb05b18022382e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const signUpBtn = document.getElementById('nextBtn');//document.querySelector('nextBtn');

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email,password)
    .then((userCred) => {
        const user = userCred.user;
        console.log(user);
    });

});