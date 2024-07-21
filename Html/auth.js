// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
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
const auth = getAuth();



const signUpBtn = document.getElementById('nextBtn');//document.querySelector('nextBtn');

signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCred) => {
        console.log(`User logged in ${userCred.user}`);
        localStorage.setItem('loggedInUserId', userCred.user.uid);
        window.location.href="";
    })
    .catch((err)=>{
        console.log(err);
        if(err.code == 'auth/invalid-credential'){
            console.log('Incorrect Email and Password Combination');
        }
        else{
            console.log('Account does not Exist');
        }
    });

    // createUserWithEmailAndPassword(auth, email,password)
    // .then((userCred) => {
    //     const user = userCred.user;
    //     console.log(user);
    // })
    // .catch((err) => {

    // });

});

const logout = document.querySelector('.signIn');
logout.addEventListener('click', e => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(() => {
        window.location.href = "logout.html";
    });
});

onAuthStateChanged(auth, user=>{
   const loggedUserId = localStorage.getItem('loggedInUserId'); 

   if (user) {
    console.log('User Logged in');
   }
   else{
    console.log('user logged out');
   }
});