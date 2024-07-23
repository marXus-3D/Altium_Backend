const signUpBtn = document.querySelector('.nextBtn');

let email;
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    email = document.querySelector('.email').value;
    // const password = document.querySelector('.password').value;

    // fetch(`http://localhost:8000/api/v1/altium/users/${email}`)
    // .then(response => {
    //     if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    // })
    // .then(data => {
    //     console.log('Response data:', data);
    //     // Here you can check if data is the actual object you expect
    //     // For example, check if it has certain properties, etc.
    //     if (data) {
    //     console.log('Received user:', data);

    //     } else {
    //     console.error('Unexpected response structure:', data);
    //     }
    // })
    // .catch(error => {
    //     console.error('Error fetching data:', error);
    // });
    // document.querySelector('.password').style.display = "block";
    document.querySelector('.password').classList.remove('hidePass');
    signUpBtn.innerText = "Login";
});