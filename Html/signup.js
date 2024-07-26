const signUpBtn = document.querySelector('.nextBtn');
var count = 0;
let before = document.querySelector('.first-slide'); 
const texts = [
    {
        text:'Sign up with Email',
        link:'Already have an account? <a href="login.html" class="signIn">Sign In</a>'
    },
    {
        text:'Next',
        link:`Don't see your institution? <a href="login.html" class="signIn">Contact us</a>`
    },
    {
        text:'Next',
        link:' '
    },
    {
        text:'Finish',
        link:`Wanna do this later? <a href="login.html" class="signIn">Skip</a>`
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
            break;
    }
});