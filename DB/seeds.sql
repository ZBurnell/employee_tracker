-- Seeded data for the department table
INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

-- Seeded data for the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Johnny", "Appleseed", 01, 01),
       ("Mikey", "Mike", 02, 01),
       ("Rodrigo", "Alexander", 03, 03),
       ("Kevin", "Tupak", 04, 03 ),
       ("Sarah", "Lorax", 05, 05),
       ("Syd", "Baby", 06, 05),
       ("Bosco", "Patrick", 07, 07),
       ("Malia", "Singh", 08, 07);

-- Seeded data for the role table
INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Acountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);