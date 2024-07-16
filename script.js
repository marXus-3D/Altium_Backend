
async function getPosts(){
    const response = await fetch('http://localhost:8000/api/v1/altium/posts');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const posts = await response.json();
    const postsContainer = document.getElementById('centerPanel');

    posts.forEach(post => {
        postsContainer.innerHTML += `
        <div class="post">
            <div class="profile">
                <div class="profile_img">
                     
                </div>
                <div class="name">
                    <h3>${post.name}<br><span>${formatTime(post.timestamp)}</span></h3>
                </div>
            </div>
            <div class="content">
                <p>${post.content}</p>
            </div>
            <div class="post_footer">
                <input type="button" value="👍 ${post.no_like}">
                <input type="button" value="💬 ${post.no_comments}">
            </div>
        </div>`;
    });
}

function formatTime(time){

// Create a new Date object with the timestamp
const date = new Date(time);

// Get hours, minutes, and seconds from the Date object
let hours = date.getHours();
const minutes = date.getMinutes();

// Determine AM or PM
const amOrPm = hours >= 12 ? 'PM' : 'AM';

// Convert hours from 24-hour to 12-hour format
hours = hours % 12;
hours = hours ? hours : 12; // Handle midnight (0 hours)

// Format the time
const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}${amOrPm}`;
return formattedTime;
}

window.onload = getPosts;