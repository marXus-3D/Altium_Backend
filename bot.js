async function callGemniApi() {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": `AIzaSyCaCvcbS2zKq7MvWmkVfdZbK4qiVv1Pik0`,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "I'm going to ask you to generate me a post that's preferably less than 255 characters long but it's not a problem if it exceeds format this post as a twitter post i want you to generate a post about any random think you can think of try to be more relatable with yound people and don't forget to add relevant hashtags.",
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const res = data.candidates[0].content.parts[0].text;
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}

const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
  "Helen",
  "Ivan",
  "Judy",
  "Kevin",
  "Laura",
  "Michael",
  "Nancy",
  "Olivia",
  "Paul",
  "Queen",
  "Richard",
  "Sarah",
  "Thomas",
  "Ursula",
  "Victor",
  "Wendy",
  "Xavier",
  "Yvette",
  "Zachary",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
  "Martinez",
  "Anderson",
  "Taylor",
  "Thomas",
  "Moore",
  "Jackson",
  "White",
  "Lee",
  "Harris",
  "Clark",
  "Lewis",
  "Wright",
  "Walker",
  "Hall",
  "Allen",
  "Young",
  "King",
  "Wright",
  "Carter",
  "Roberts",
];

const uids = [];
const emailDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "yandex.com",
  "gmx.com",
  "mail.ru",
  "zoho.com",
  "fastmail.fm",
  "tutanota.de",
  "posteo.de",
  "hushmail.com",
  "startmail.com",
  "mail.com",
  "mailbox.org",
  "riseup.net",
  "guerrillamail.com",
];
const bios = [
  "Just a regular person trying to navigate life one day at a time.",
  "Living life to the fullest, one adventure at a time.",
  "Passionate about [topic]. Always learning and growing.",
  "Coffee lover, bookworm, and dreamer.",
  "Making the most of every moment. Grateful for the journey.",
  "Love to laugh, learn, and explore new things.",
  "A work in progress, but always striving for better.",
  "Living life with a positive attitude and a grateful heart.",
  "Chasing dreams and making memories.",
  "Forever curious, always learning.",
  "Software engineer, problem solver, and tech enthusiast.",
  "Teacher, mentor, and lifelong learner.",
  "Writer, storyteller, and wordsmith.",
  "Designer, creative thinker, and problem solver.",
  "Entrepreneur, innovator, and risk-taker.",
  "Healthcare professional, compassionate caregiver, and healer.",
  "Scientist, researcher, and explorer.",
  "Business professional, leader, and team player.",
];

// for (let i = 0; i < firstNames.length; i++) {
//   const id = uuidv4();
//   uids.push(id);
//   const usrsr = {
//     user_id: id,
//     username: `${firstNames[i].toLowerCase()}${lastNames[
//       i
//     ].toLocaleUpperCase()}`,
//     email: `${firstNames[i].toLowerCase()}${lastNames[i]
//       .toLocaleUpperCase()
//       .substring(0, 4)}@${
//       emailDomains[Math.floor(Math.random() * emailDomains.length)]
//     }`,
//     password: `qazxswedc`,
//     fname: firstNames[i],
//     lname: lastNames[i],
//     dob: getRandomDate(),
//     bio: bios[Math.floor(Math.random() * bios.length)],
//     ppic: null,
//     institution: "HiLCoE School of computer science",
//     acc_type: "Teacher",
//     education_level: Math.random() < 0.5 ? "Masters" : "Degree",
//   };

//   await postUser(usrsr);
// }

// console.log(uids);

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getRandomDate() {
  // Get the current time in milliseconds
  const now = Date.now();

  // Calculate 18 years in milliseconds
  const eighteenYearsAgo = now - 18 * 365 * 24 * 60 * 60 * 1000;

  // Generate a random number between 0 and the current time minus 18 years
  const randomTimestamp = Math.floor(Math.random() * (now - eighteenYearsAgo));

  // Create a new Date object from the random timestamp
  const randomDate = new Date(randomTimestamp);

  return randomDate;
}

async function postUser(usr) {
  try {
    const response = await fetch("http://localhost:8000/api/v1/altium/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usr),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Success:", data);
  } catch (error) {
    console.error("Error:", error);
    // Handle errors here (e.g., display an error message)
  }
}

const ids = [
  "75b16fd7-799d-4a24-b1e6-bfa21dac0460",
  "28c26037-af34-4998-95f9-01d9d7c5da1a",
  "66893b79-a61e-483a-a6f9-3b1e8615ddce",
  "f11332c4-af5f-4fb1-a44b-4b535fa3fa2e",
  "b3472d8e-b407-4dca-8bbb-2e732ab436a5",
  "5e739223-a767-4635-a2a3-92effc1f078c",
  "1bb81f56-522d-4ada-b5e4-a1a4c78598b0",
  "a64c7119-cfc0-48bb-b436-9e03de55d89c",
  "fec709a2-b8a9-42fd-ac17-846c5a1283af",
  "daf5ed11-11c2-433f-ae80-4a5c55f5a65e",
  "7ac372a1-3806-4c66-b779-146cbaecf57c",
  "9a1163ff-660b-4a76-add8-c38e8f3fe437",
  "c885ac50-2095-4111-a45e-e08034b3ddab",
  "6bb46215-8500-4023-b528-f06982f241c3",
  "508fb27a-0b02-49fc-8e1e-8c1f1c3f2ffb",
  "c453b8c2-bcab-48da-8ee1-eebaeaa30c44",
  "c897675d-67bc-40e6-b906-4377831573d4",
  "df35179f-9dde-43e3-8854-50b594910ac5",
  "10428030-1bd9-4df8-ba6a-9ca0dec41032",
  "491393f9-508d-4b80-8944-db51a9fa8860",
  "b8710557-d9f2-4f57-b5d2-a4806eea0049",
  "bb3101e2-3015-45a4-9911-4b7fcfe766d2",
  "17a6f2df-bea4-4c8a-89dd-b4776217b0e5",
  "8b9bb778-c06e-4b24-9bb7-8961aedf4986",
  "967979d1-45f2-4b02-9c1a-24dba35cd5d8",
  "9aaeb4e6-990a-4acd-aae3-5c8c6b3194f4",
];

for (let i = 0; i < ids.length; i++) {
  const idx = Math.floor(Math.random() * (5- 3 + 1)) + 3;

  for (let j = 0; j < idx; j++) {
    const pst = {
      user_id: ids[i],
      content: await callGemniApi(),
      media_type: "Text",
      media_url: null,
      name: firstNames[i] + " " + lastNames[i],
    };
    console.log(pst);
    await postPost(pst);
  }
}
async function postPost(pst) {
  try {
    const response = await fetch("http://localhost:8000/api/v1/altium/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pst),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    // Handle errors here (e.g., display an error message)
  }
}
