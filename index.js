//Dependecies for the Command application
const inquirer = require('inquirer');
const mysql = require('mysql2');


db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  employee_tracker();
});

var employee_tracker = function() {
  inquirer
    .prompt([{  
  type: "list",
   message: "What would you like to do today?",
   Name: "Start Menu",
   choices: ["View All Employees", "View all Roles", "View All Departments", "Add Employee", "Update Employee Role",  "Add Role", "Add Department", "Quit"]
  }])
  .then((answers) => {
    if (answers.prompt === 'View All Employees') {
      db.query(`SELECT * FROM department`, (err, result) => {
        if (err) throw err;
        console.log("Viewing All Departments: ");
        console.table(result);
        employee_tracker();
        });
    } else if (answers.prompt === 'View All Roles') {
      db.query(`SELECT * FROM role`, (err, result) => {
        if (err) throw err;
        console.log("Viewing All Roles: ");
        console.table(result);
        employee_tracker();
        });
    } else if (answers.prompt === 'View All Departments') {
      db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) throw err;
        console.log("Viewing All Employees: ");
        console.table(result);
        employee_tracker();
        });
    } else if (answers.prompt === 'Add A Department') {
        inquirer.prompt([
        {
          type: 'input',
          name: 'department',
          message: 'What is the name of the department you would like to add?',
          validate: departmentInput => {
            if (departmentInput) {
            return true;
            } else {
            console.log('Please add a new department!');
            return false;
            }}
    }])
      } else if (answers.prompt === 'Quit') {
          db.end();
          console.log("Have a wonderful day!");
      }
  })
};