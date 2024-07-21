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

const signUpModal = document.createElement('div');

onAuthStateChanged(auth, user=>{
    const loggedUserId = localStorage.getItem('loggedInUserId'); 
 
    if (user) {
     console.log('User Logged in');
    //  closeModal();
    }
    else{
     console.log('User not found');
     const modalStyle = document.createElement('style');
     modalStyle.textContent = `
     .hidden {
        display: none; /* Hide the modal initially using a separate class */
    }
     .modal{
        width: 100%;
        height: 100%;
        left: 0;
        z-index: 1;
        position: fixed;

        backdrop-filter: blur(5px);
        background-color: rgba(0,0,0,0.4);
     }
    .container {
        margin: 25% 10%;
        

        border: 1px solid var(--accent);
        display: flex;
        flex-direction: column;
        border-radius: 30px;

        justify-content: center;
        align-items: center;

        justify-self: center;
        align-self: center;
    }

    .googleBtn{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--accent);
        width: 50%;
        height: 50px;

        border-radius: 50px;
        
        margin: 10px 0;
        cursor: pointer;
    }
    .googleBtn:hover{
        transition: 0.8s;
        background-color: color-mix(in srgb-linear, var(--background) 100%, rgb(59, 200, 255) 2%);

        font-weight: 800;
    }
    .divider{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        justify-content: space-between;
        width: 50%;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .divider hr{
        width: 45%;
    }
    .divider h3{
        font-weight: 400;
    }

    .container input{
        border: 1px solid var(--text);
        margin-bottom: 30px;
        border-radius: 8px;
        padding: 0 5px;

        color: #B4B4B4;

        width: 50%;
        height: 50px;
    }

    .nextBtn{
        border: 1px solid var(--accent);
        border-radius: 50px;

        width: 50%;
        height: 40px;

        margin-bottom: 20px;
        cursor: pointer;
        transition: 0.6s;
        font-size: 18px;
        font-weight: bold;
    }
    .nextBtn:hover{
        transition: 0.8s;
        background-color: color-mix(in srgb-linear, var(--background) 100%, var(--accent) 2%);
        font-size: 16px;
    }
    .container p{
        margin-top: 20px;
        font-size: 13px;
    }
    .container p>a{
        text-decoration: none;
        font-weight: 900;
        color: var(--accent);
    }`;
    document.head.appendChild(modalStyle);
    signUpModal.classList.add('modal', 'hidden')
    signUpModal.innerHTML = `
     <div class="container">
         <h1>Sign Up to Altium</h1>
         <div class="googleBtn">
             Google
         </div>
         <div class="googleBtn">
             Apple
         </div>
         <div class="divider">
             <hr> <h3>or</h3> <hr>
         </div>
         <input type="email" placeholder="Email or Username" class="email">
         <input type="password" placeholder="Password" class="password">
         <button value="Next" class="nextBtn" id="nextBtn">Next</button>
         <p>Have an account already? <a href="#" class="signIn">Sign in</a></p>
     </div>
     `;
     document.body.appendChild(signUpModal);
     openModal();

     subscribe();
    }
 });


const logout = document.querySelector('.signIn');
logout.addEventListener('click', e => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(() => {
        window.location.href = "logout.html";
    });
});

function openModal() {
    signUpModal.classList.remove('hidden'); // Remove the hidden class to show the modal
}
  
function closeModal() {
    signUpModal.classList.add('hidden');  // Add the hidden class to hide the modal
}

function subscribe(){
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
}