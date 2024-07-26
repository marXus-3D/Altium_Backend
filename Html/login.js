import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDYfBm1bVX-jWuGY1ThG3FgGU3V_QLZB7Q",
  authDomain: "altium-cd024.firebaseapp.com",
  projectId: "altium-cd024",
  storageBucket: "altium-cd024.appspot.com",
  messagingSenderId: "904813905259",
  appId: "1:904813905259:web:f1bb555fdb05b18022382e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const signUpBtn = document.querySelector(".nextBtn");

var logged = false;
let email;
let password;
signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  email = document.querySelector(".email").value;
  password = document.querySelector(".password").value;

  if (password) {
    signIn();
  }

  if (!logged) {
    fetch(`http://localhost:8000/api/v1/altium/users/${email}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);
      // Here you can check if data is the actual object you expect
      // For example, check if it has certain properties, etc.
      if (data) {
        console.log("Received user:", data);
        document.querySelector(".password").style.display = "block";
        document.querySelector(".password").classList.remove("hidePass");
        signUpBtn.innerText = "Login";
        logged = true;
      } else {
        console.error("Unexpected response structure:", data);
        alert("Username of Email doesn't exist");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      alert("Username of Email doesn't exist");
    });
  }
});

function signIn() {
  alert("Logged In");
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
}
