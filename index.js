//Dependecies for the Command application
const db = require('./db/connection.js')
const inquirer = require('inquirer');

const promptUser = () => {
     return inquirer.prompt([
        {
         type: 'list',
         message: "Which action would you like to take?",
         name: 'start',
         choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee",  "Add Role", "Update Employee role", "Add Department", "Quit"]
        }
    ]).then((answer) => {
        switch (answer.start) {
            case "View all employees":
                viewAllEmployees();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "View all departments":
                viewAllDepartments();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add a role":
                addRole();
                break;       
            case "Update an employee role":
                updateEmployeeRole();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Quit":
                stop();
                break;
        }
    })
};
promptUser();
const viewAllEmployees = () => {
    db.query(`SELECT * FROM employee`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}
const viewAllRoles = () => {
    db.query(`SELECT * FROM role`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}
const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, function (err, results) {
        console.log(`\n`);
        console.table(results);
        promptUser();
    })
}
const addDepartment = () => {
    return inquirer.prompt([
        {
         type: 'input',
         message: "What is the name of the department you wish to add?",
         name: 'name'
        }
    ]).then((answer) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, answer.name, (err, results) => {
            console.log("\nDepartment has been added successfully.");
            viewAllDepartments();
        })
    })
}
const addRole = () => {
    let departmentArray = [];
    db.query(`SELECT * FROM department`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            departmentArray.push(results[i].name);
        } return inquirer.prompt([
            {
             type: 'input',
             message: "What is the title of the new role?",
             name: 'title',
            },
            {
             type: 'input',
             message: "What is the salary for the new role?",
             name: 'salary',
            },
            {
             type: 'list',
             message: "What department is the new role under?",
             name: 'department',
             choices: departmentArray
            }
        ]).then((answer) => {
            db.query(`SELECT id FROM department WHERE department.name = ?`, answer.department, (err, results) => {
                let department_id = results[0].id;
            db.query(`INSERT INTO role(title, salary, department_id)
            VALUES (?,?,?)`, [answer.title, answer.salary, department_id], (err, results) => {
                console.log("\nNew role added. See below:");
                viewAllRoles();})
            });
        })
    })
}
const addEmployee = () => {
    const roleArray= [];
    const employeeArray= [];
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].title);
        }
    db.query(`SELECT * FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let employeeName = `${results[i].first_name} ${results[i].last_name}`
            employeeArray.push(employeeName);
        }return inquirer.prompt([
            {
             type: 'input',
             message: "What is the employee's first name?",
             name: 'first_name',
            },
            {
             type: 'input',
             message: "What is the employee's last name?",
             name: 'last_name',
            },
            {
             type: 'list',
             message: "What is the employee's role?",
             name: 'role',
             choices: roleArray
            },
            {
             type: 'list',
             message: "Does the employee have a manager?",
             name: 'has_manager',
             choices: ["Yes", "No"]
            }
        ]).then((answer) => {
            let roleName = answer.role;
            let first_name = answer.first_name;
            let last_name = answer.last_name;
            let role_id = '';
            let manager = '';
            db.query(`SELECT id FROM role WHERE role.title = ?`, answer.role, (err, results) => {
                role_id = results[0].id;
            });
            if (answer.has_manager === "Yes") {
                return inquirer.prompt([
                    {
                    type: 'list',
                    message: "Please select the employees manager",
                    name: 'manager',
                    choices: employeeArray
                    }   
                ]).then((answer) => {
                    db.query(`SELECT id FROM role WHERE role.title = ?`, roleName, (err, results) => {
                        role_id = results[0].id;
                    })
                    db.query(`SELECT id FROM employee WHERE employee.first_name = ? AND employee.last_name = ?;`, answer.manager.split(" "), (err, results) => {
                        manager = results[0].id;
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                        VALUES (?,?,?,?)`, [first_name, last_name, role_id, manager], (err, results) => {
                            console.log("\nNew employee added. See below:");
                            viewAllEmployees(); })
                    })
                })
            }
        })
    })
})
}
const updateEmployeeRole = () => {
    const roleArray= [];
    const employeeArray= [];
    db.query(`SELECT * FROM role`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleArray.push(results[i].title);}
    db.query(`SELECT * FROM employee`, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let employeeName = `${results[i].first_name} ${results[i].last_name}`
            employeeArray.push(employeeName);
        }return inquirer.prompt([
            {
             type: 'list',
             message: "Which employee do you want to update?",
             name: 'employee',
             choices: employeeArray
            },
            {
             type: 'list',
             message: "What is the employee's new role?",
             name: 'role',
             choices: roleArray
            },
        ]).then((answer) => {
            db.query(`SELECT id FROM role WHERE role.title = ?;`, answer.role, (err, results) => {
                role_id = results[0].id;
                        viewAllEmployees();})
            })
        })
    })
}
