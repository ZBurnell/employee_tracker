//Dependecies for the Command application
const inquirer = require('inquirer');
const fs = require('fs')
const mysql = require('mysql2');

  inquirer
    .prompt([
{
   type: "list",
   message: "What would you like to do today?",
   Name: "Start Menu",
   choices: ["View All Employees","Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
},
{
  type: "input",
  message: "What is the name of the empoloyee you would like to add?",
  name: "Add Employee",
},
{
  type: "input",
  message: "What is the name of the department you would like to add?",
  name: "Add Department",
},
    ])
  .then((one) => {
 const placeholder = generatedtwo (one)


// Function that creates the new README.md file for you to copy and paste to your own Repo
fs.writeFile('', placeholder , (err) => {
    if (err) {
      console.error('Error creating your file:', err);
    } else {
      console.log('All data added to file successfully.');
    }
  })
});

function init() {}

init();