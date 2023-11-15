INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (id, title, salary, department_id)
VALUES (01, "Sales Lead", 100000, "Sales"),
       (02, "Salesperson", 80000, "Sales"),
       (03, "Lead Engineer", 150000, "Engineering"),
       (04, "Software Engineer", 120000, "Engineering"),
       (05, "Account Manager", 160000, "Finance"),
       (06, "Acountant", 125000, "Finance"),
       (07, "Legal Team Lead", 250000, "Legal"),
       (08, "Lawyer", 190000, "Legal");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (01, "Johnny", "Appleseed", 01, 01),
       (02, "Mikey", "Mike", 02, 01),
       (03, "Rodrigo", "Alexander", 03, 03),
       (04, "Kevin", "Tupak", 04, 03 ),
       (05, "Sarah", "Lorax", 05, 05),
       (06, "Syd", "Baby", 06, 05),
       (07, "Bosco", "Patrick", 07, 07),
       (08, "Malia", "Singh" 08, 07);
