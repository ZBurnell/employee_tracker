// Dependecies to start the command line application
const inquirer = require('inquirer');
const db = require('./config/connection.js');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employee_database();
});

// Start of the command line function
var employee_database = function () {
    inquirer.prompt([{
            type: 'list',
            message: "Which action would you like to take?",
            name: 'prompt',
            choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee",  "Add Role", "Update Employee Role", "Add Department", "Quit"] 
    //  View all of the emplyees currently listed in the database
    }]).then((answers) => {
        if (answers.prompt === 'View All Employees') {
        db.query(`SELECT * FROM employee`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Employees: ");
            console.table(result);
            employee_database();
        });       
    //  View all of the current roles listed in the database  
    } else if (answers.prompt === 'View All Roles') {
        db.query(`SELECT * FROM role`, (err, result) => {
            if (err) throw err;
            console.log("Viewing All Roles: ");
            console.table(result);
            employee_database();
        });
    //  View all of the current departments in the database 
    }else if (answers.prompt === 'View All Departments') {
        db.query(`SELECT * FROM department`, (err, result) => {
            if (err) throw err;
            console.log('Viewing All Departments: ');
            console.table(result);
            employee_database();
        });
    //  Adding a new employee to the database
    } else if (answers.prompt === 'Add Employee') {
        db.query(`SELECT * FROM employee, role`, (err, result) => {
            if (err) throw err;
            inquirer.prompt([
                {   type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the employee you wish to add?',
                    validate: firstNameInput => {
                        if (firstNameInput) {
                            return true;
                        } else {
                            console.log('Please add a different name!');
                            return false;
                        }
                    }
                },
                {   type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the employee you wish to add?',
                    validate: lastNameInput => {
                        if (lastNameInput) {
                            return true;
                        } else {
                            console.log('Please add a differnt name');
                            return false;
                        }
                    }
                },
                {   type: 'list',
                    name: 'role',
                    message: 'What is the employees role?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].title);
                        }
                        var newArray = [...new Set(array)];
                        return newArray;
                    }
                },
                {   type: 'input',
                    name: 'manager',
                    message: 'Who will manage the employee?',
                    validate: managerInput => {
                        if (managerInput) {
                            return true;
                        } else {
                            console.log('Please choose a differnt manager');
                            return false;
                        }
                    }
                }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].title === answers.role) {
                        var role = result[i];
                    }
                }
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answers.firstName, answers.lastName, role.id, answers.manager.id], (err, result) => {
                    if (err) throw err;
                    console.log(`Successfully added ${answers.firstName} ${answers.lastName} to the database.`)
                    employee_database();
                });
            })
        });
    //  Adding a new role to the database
    } else if (answers.prompt === 'Add Role') {
        db.query(`SELECT * FROM department`, (err, result) => {
            if (err) throw err;
            inquirer.prompt([
                {   type: 'input',
                    name: 'role',
                    message: 'What is the name of the role you wish to add?',
                    validate: roleInput => {
                        if (roleInput) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                },
                {   type: 'input',
                    name: 'salary',
                    message: 'What is the salary for the new role?',
                    validate: salaryInput => {
                        if (salaryInput) {
                            return true;
                        }  else {
                            return false;
                        }
                    }
                },
                {   type: 'list',
                    name: 'department',
                    message: 'Which department does the role belong to?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].name);
                        }
                        return array;
                    }
                }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].name === answers.department) {
                        var department = result[i];
                    }
                }
                db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [answers.role, answers.salary, department.id], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.role} to the database.`)
                    employee_database();
                });
            })
        });
    // Updating a current employees role
    } else if (answers.prompt === 'Update Employee Role') {
        db.query(`SELECT * FROM employee, role`, (err, result) => {
            if (err) throw err;
            inquirer.prompt([
                {   type: 'list',
                    name: 'employee',
                    message: 'Which employees role do you want to update?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].last_name);
                        }
                        var employeeArray = [...new Set(array)];
                        return employeeArray;
                    }
                },
                {   type: 'list',
                    name: 'role',
                    message: 'What is their new role?',
                    choices: () => {
                        var array = [];
                        for (var i = 0; i < result.length; i++) {
                            array.push(result[i].title);
                        }
                        var newArray = [...new Set(array)];
                        return newArray;
                    }
                }
            ]).then((answers) => {
                for (var i = 0; i < result.length; i++) {
                    if (result[i].last_name === answers.employee) {
                        var name = result[i];
                    }
                } for (var i = 0; i < result.length; i++) {
                    if (result[i].title === answers.role) {
                        var role = result[i];
                    }
                }
                db.query(`UPDATE employee SET ? WHERE ?`, [{role_id: role}, {last_name: name}], (err, result) => {
                    if (err) throw err;
                    console.log(`Updated ${answers.employee} role in the database.`)
                    employee_database();
                });
            })
        }); 
        // Adding a new department to the database
        } else if (answers.prompt === 'Add Department') {
            inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of the department you would like to add?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please choose a different department!');
                        return false;
                    }
                }
            }]).then((answers) => {
                db.query(`INSERT INTO department (name) VALUES (?)`, [answers.department], (err, result) => {
                    if (err) throw err;
                    console.log(`Added ${answers.department} to the database.`)
                    employee_database();
                });
            })
        // logout of the database 
        } else if (answers.prompt === 'Quit') {
            db.end();
            console.log("See ya next time!");
        }
    })
};
