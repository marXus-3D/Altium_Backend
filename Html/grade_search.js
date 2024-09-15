// Sample data for courses and students each student has an id and a name
const courses = {
  "Course 1": [
      { id: 1, name: "Tingus" },
      { id: 2, name: "Pingus" },
      { id: 2, name: "Abebe" },
      { id: 2, name: "Abel" },
      { id: 2, name: "Parrot" }
  ],
  "Course 2": [
      { id: 3, name: "Gringus" },
      { id: 4, name: "Bringus" }
  ]
};

// this function just fills the drop down menu with the data provided
function populateCourses() {
  //get the dropdown by using the id
  const courseSelect = document.getElementById('courseSelect');
  //this goes over eachcourse in the Courses we provided
  for (let course in courses) {
    //and then over here it creates an option in the select as said in the HTML
      let option = document.createElement('option');
      //set the value
      option.value = course;
      //the text that id going to display 
      option.textContent = course;
      // and finally it adds it the dropdown
      courseSelect.appendChild(option);
  }
}

// this functionloads all the students in a course and displays them
function loadStudents() {
  //determine the selected course
  const course = document.getElementById('courseSelect').value;
  //this gets the container with the table data in the HTML
  const studentsTableContainer = document.getElementById('studentsTableContainer');
  //then the tbody here
  const studentsTableBody = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];
  
  studentsTableBody.innerHTML = ""; // Clear existing rows
// this checks if the selcetd course is there and if it has students
  if (course && courses[course]) {
    // show the table 
      studentsTableContainer.style.display = 'block';
      //get the students in the course
      const students = courses[course];
      //go over each student and adds a row to the table and adds two cells for name and grade
      students.forEach(student => {
          let row = studentsTableBody.insertRow();
          let cell1 = row.insertCell(0);
          let cell2 = row.insertCell(1);
          //add the name from the studenr data
          cell1.textContent = student.name;
          //create an input form in the table for entering the grade
          cell2.innerHTML = `<input type="text" name="${student.name}" placeholder="Enter grade" />`;
      });
  } else {
      studentsTableContainer.style.display = 'none';
  }
}

// function to handle form submission
function submitGrades() {
  //this again gets the elemnt by id
  const form = document.getElementById('gradesForm');
  //creates an OBJ that contains all values
  const formData = new FormData(form);
  
  // this is just an empty object for the data to be sent to the DB
  let grades = {};
  // apparently formdata is built in and what it does is basically make 
  //like key and value from the form field and the values they have
  //the idea is when used with for each you give it formdata.foreach(callbackfunction)
  //in this case it just takes the Value and key(name) of the form
  //then we convert it into a plain object 
  formData.forEach((value, key) => {
      grades[key] = value;
  });
  
  console.log("Grades submitted:", grades);
  
  //we need something that sends the data to the Dbor the server idk
  //someone fills this out cuz i have no clue 
 
}

// just call the populate courses method to show the DD menu with the courses 
window.onload = populateCourses;
// Function to search and highlight student rows
function searchStudents() {
  //get the search iteam and make it case insensetive and take away any spaces
  const input = document.getElementById('searchInput').value.trim().toLowerCase(); // Trim white spaces
  const table = document.getElementById('studentsTable');
  const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

  if (input === "") {
      // because the search also cosiders white spaces when the search is empty remove the highlight so basically
      // if the search input is empty, show all rows without highlighting
      //it basically coverts the rows to an array andremoves it
      Array.from(rows).forEach(row => row.classList.remove('highlight'));
      return;
  }

  // Remove previous highlights
  //this basically goes over each row and reomves any removes the highlight ckass
  Array.from(rows).forEach(row => row.classList.remove('highlight'));


  Array.from(rows).forEach(row => {
      const nameCell = row.cells[0].textContent.toLowerCase();
      if (nameCell.includes(input)) {
          row.classList.add('highlight');
      }
  });
}