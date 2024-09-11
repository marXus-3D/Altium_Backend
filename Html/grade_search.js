
//  references to the form grade input, the table tyshi
const gradeForm = document.getElementById("gradeForm");
const gradeInput = document.getElementById("gradeInput");
const gradeTable = document.getElementById("gradeTable");

//event listener for the form sumbmission   
gradeForm.addEventListener("submit", (event) => {
    // apparently there is somthing defualt to prevent idk (do explain if you can)
    event.preventDefault();
//student name from input 
  const studentName = document.getElementById("studentName").value;

    // just an example gringus bringus array until the database is here idk 
  const students = [
    { name: "gringus", grade: 85 },
    { name: "bringus", grade: 92 },
    { name: "Hussein", grade: 69 },
    { name: "darky", grade: 96 },
    
  ];

  const foundStudent = students.find(student => student.name == studentName);

  if (foundStudent) {
    
    gradeInput.style.display = "block";
    document.getElementById("grade").value = foundStudent.grade;
  } else {
    alert("Student not found.");
  }
});
//you submit the grade here 
gradeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //et the student name and grade from the input fields and all
  const studentName = document.getElementById("studentName").value;
  const grade = document.getElementById("grade").value;

  //another gringy bringy demo before the DB Logic 
  const students = [
    { name: "gringus", grade: 85 },
    { name: "bringus", grade: 92 },
    { name: "Hussein", grade: 69 },
    { name: "darky", grade: 96 }
    
  ];

  const index = students.findIndex(student => student.name == studentName);
  if (index !== -1) // Find index returns -1 if it finds nothing so this whole thing excustes if something is found thus the !==
  {
    students[index].grade = grade;
    // this specifically updates the grade of the dude at the specific index by the grade we inout
    updateTable(students);
  } else {
    alert("Student not found.");
  }
});
 // now this is just a function to update the grade table with the latest student data that we gave it
function updateTable(students) {
    //this finds the gradtable in the HTML and selects the specifc part which in my case is the tbody which is due to be updated
    //it also clears the already existing data sice it has been upadated
  const tbody = gradeTable.querySelector("tbody");
  tbody.innerHTML = "";

 //this then goes on to create a new row in the tbody by going over every array ekemtns in the students array
 //also creates a column for name and grade aswell
  students.forEach(student => {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    const gradeCell = document.createElement("td");
// give it the content that the table needs
    nameCell.textContent = student.name;
    gradeCell.textContent = student.grade;
    //this just append everything.

    row.appendChild(nameCell);
    row.appendChild(gradeCell);
    tbody.appendChild(row);  

  });
}