// Only Import the functions we need from the SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYfBm1bVX-jWuGY1ThG3FgGU3V_QLZB7Q",
  authDomain: "altium-cd024.firebaseapp.com",
  projectId: "altium-cd024",
  storageBucket: "altium-cd024.appspot.com",
  messagingSenderId: "904813905259",
  appId: "1:904813905259:web:f1bb555fdb05b18022382e",
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const signUpModal = document.createElement("div");
const modalStyle = document.createElement("style");

onAuthStateChanged(auth, (user) => {
  const loggedUserId = localStorage.getItem("loggedInUserId");

  if (user) {
    console.log("User Logged in");
    closeModal();
  } else {
    console.log("User not found");
    loginPage();
  }
});

function loginPage() {
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
    }
    .password{  
        display: block;
        transition: 0.8s;
    }
    .hidePass{
        display: none;
        transition: 0.8s;
    }`;
    document.head.appendChild(modalStyle);
    signUpModal.classList.add("modal", "hidden");
    signUpModal.innerHTML = `
     <div class="container">
        <h1>Sign in to Altium</h1>
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
        <input type="password" placeholder="Password" class="password hidePass">
        <button value="Next" class="nextBtn" id="nextBtn">Next</button>
        <p>Don't have an account? <a href="#" class="signIn">Sign Up</a></p>
    </div>
     `;
    document.body.appendChild(signUpModal);
    openModal();

    subscribe();
}

function signUpPage(){
  signUpModal.innerHTML = `
  <div class="container"> 
        <div class="first-slide" style="display: flex;">
            <h1>Sign in to Altium</h1>
            <div class="googleBtn">
                Google
            </div>
            <div class="googleBtn">
                Apple
            </div>
            <div class="divider">
                <hr> <h3>or</h3> <hr>
            </div>
        </div>

        <div class="second-slide" style="display: none;">
            <h1 style="justify-self: flex-start; align-self: self-start; margin-left: 20%;">Select your Personal Info</h1>
            <div class="collegeInfo">
                <label for="collegeSelect">Select your Institution</label>
                <select id="collegeSelect" class="collegeSelect">
                    <option>HiLCoE School of Computer Science</option>
                    <option value="Addis Ababa University">Addis Ababa University</option>
                </select>
            </div>
            <div class="collegeInfo">
                <label for="occupationSelect">Select your Occupation</label>
                <select id="occupationSelect" class="occupationSelect" style="width: 30%;">
                    <option>Teacher</option>
                    <option>Student</option>
                </select>
            </div>
            <div class="row">
                <div class="collegeInfo">
                    <label for="fname">First Name</label>
                    <input type="text" placeholder="First Name" class="fname" id="fname">
                </div>
                <div class="collegeInfo">
                    <label for="lname">Last Name</label>
                    <input type="text" placeholder="Last Name" class="lname" id="lname">
                </div>
            </div>
        </div>

        <div class="third-slide" style="display: none;">
            <h1 style="justify-self: flex-start; align-self: self-start; margin-left: 20%;">Create your account</h1>
            <div class="collegeInfo">
                <label for="dob">Date of Birth</label>
                <input type="date" class="dob" id="dob">
            </div>
            <div class="collegeInfo">
                <label for="email">Email</label>
                <input type="email" placeholder="johndoe@john.doe" class="email" style="width: 80%;">
            </div>
            <div class="row">
                <div class="collegeInfo">
                    <label for="password">Password</label>
                    <input type="password" placeholder="Password" class="password hidePass">
                </div>
                <div class="collegeInfo" style="justify-content: flex-end;">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" placeholder="Confirm Password" class="confirmPassword password hidePass">
                </div>
            </div>
        </div>    
        
        <div class="fourth-slide" style="display: none;">
            <h1 style="justify-self: flex-start; align-self: self-start; margin-left: 20%;">Create your account</h1>
            <div class="circle_profile">
                <svg xmlns="http://www.w3.org/2000/svg" height="50%" viewBox="0 -960 960 960" width="50%" fill="var(--accent)"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
            </div>
            <p style="font-weight: bold; font-size: 16px;">Upload a profile picture <br>
                <center><span style="font-size: 14px; margin-top: 15px;">Max is 2MB</span></center>
            </p>
            <div class="collegeInfo" style="justify-self: center; align-self: center; width: 40%; margin-bottom: 40px;">
                <label for="bioArea">Bio</label>
                <textarea name="bioArea" id="bioArea" style="height: 100px;"></textarea>
            </div>
        </div>

        <button value="Next" class="nextBtn" id="nextBtn">Sign up with Email</button>
        <p class="footerLink">Already have an account? <a href="#" class="bottomLink">Sign In</a></p>
    </div>`;
  modalStyle.textContent = `.hidden {
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

    .container .first-slide{
        background-color: transparent;
        width: 100%;
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        justify-self: center;
        align-self: center;
    }
    .container .second-slide{
        text-align: left;
        background-color: transparent;
        width: 100%;
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        justify-self: center;
        align-self: center;
    }
    .container .third-slide{
        text-align: left;
        background-color: transparent;
        width: 100%;
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: center;

        justify-self: center;
        align-self: center;
    }
    .container .fourth-slide{
        text-align: left;
        background-color: transparent;
        width: 100%;
        display: flex;
        flex-direction: column;

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
        height: 50px;

        margin-bottom: 20px;
        cursor: pointer;
        transition: 0.6s;
        font-size: 18px;
        font-weight: bold;

        box-shadow:20px 10px 35px rgba(24, 20, 248, 0.9);
    }
    .nextBtn:hover{
        transition: 0.8s;
        background-color: color-mix(in srgb-linear, var(--background) 100%, var(--accent) 2%);
        font-size: 16px;

        box-shadow:20px 20px 35px rgba(24, 20, 248, 0.9);
    }
    .container p{
        margin-top: 20px;
        font-size: 13px;
    }
    .container p>a{
        text-decoration: none;
        font-weight: 900;
        color: var(--accent);
    }
    .collegeInfo{
        width: 60%;
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
    }
    .container select{
        margin-top: 10px;
        width: 100%;
        height: 40px;

        border: 1px solid var(--text);
        border-radius: 8px;
    }
    .row{
        width: 60%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
    }

    .circle_profile{
        width: 10vw;
        height: 10vw;
        background-color: color-mix(in srgb-linear, var(--background) 100%, var(--primary) 2%);

        border: 1px solid var(--accent);
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    svg {
        background-color: transparent;
    }`;
    document.head.appendChild(modalStyle);
    signUpModal.classList.add("modal", "hidden");

    document.body.appendChild(signUpModal);
    openModal();

    subscribeSignUp();
}

function openModal() {
  signUpModal.classList.remove("hidden"); // Remove the hidden class to show the modal
}

function closeModal() {
  signUpModal.classList.add("hidden"); // Add the hidden class to hide the modal
}

function subscribe() {
  const signUpBtn = document.getElementById("nextBtn"); //document.querySelector('nextBtn');

  signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log(`User logged in ${userCred.user}`);
        localStorage.setItem("loggedInUserId", userCred.user.uid);
        window.location.href = "";
      })
      .catch((err) => {
        console.log(err);
        if (err.code == "auth/invalid-credential") {
          console.log("Incorrect Email and Password Combination");
        } else {
          console.log("Account does not Exist");
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

  // const logout = document.querySelector(".signIn");
  // logout.addEventListener("click", (e) => {
  //   localStorage.removeItem("loggedInUserId");
  //   signOut(auth).then(() => {
  //     window.location.href = "logout.html";
  //   });
  // });

  const signUp = document.querySelector(".signIn");
  signUp.addEventListener("click", (e) => {
    signUpPage();
  });
}
var count = 0;
function subscribeSignUp () {
  const signUpBtn = document.querySelector('.nextBtn');
  let before = document.querySelector('.first-slide'); 
  const texts = [
      {
          text:'Sign up with Email',
          link:'Already have an account? <a href="#" class="bottomLink">Sign In</a>'
      },
      {
          text:'Next',
          link:`Don't see your institution? <a href="#" class="bottomLink">Contact us</a>`
      },
      {
          text:'Next',
          link:' '
      },
      {
          text:'Finish',
          link:`Wanna do this later? <a href="#" class="bottomLink">Skip</a>`
      }
  ];

  const footerLink = document.querySelector('.footerLink');

  signUpBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switch (count) {
          case 0:
              ++count;
              before.style.display = "none";
              before = document.querySelector('.second-slide');
              footerLink.innerHTML = texts[count].link;
              signUpBtn.innerText = texts[count].text;
              before.style.display = "flex";
              bottomSubscribe();
              break;
          case 1:
              ++count;
              before.style.display = "none";
              before = document.querySelector('.third-slide');
              footerLink.innerHTML = texts[count].link;
              signUpBtn.innerText = texts[count].text;
              before.style.display = "flex";
              break;
          case 2:
              ++count;
              before.style.display = "none";
              before = document.querySelector('.fourth-slide');
              footerLink.innerHTML = texts[count].link;
              signUpBtn.innerText = texts[count].text;
              before.style.display = "flex";
              bottomSubscribe();
              break;
      }
  });

  bottomSubscribe();
}

function bottomSubscribe() {
  const signUp = document.querySelector(".bottomLink");
  signUp.addEventListener("click", (e) => {
    console.log(count, "This is your current screen");
    switch (count) {
      case 0:
          loginPage();
          break;
      case 1:
          alert('Contact us on telegram');
          break;
      case 3:
          alert('skipped');
          break;
    }
  });
}
