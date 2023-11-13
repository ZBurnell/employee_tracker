INSERT INTO department (id, department_name)
VALUES (01, "Sales"),
       (02, "Engineering"),
       (03, "Finance"),
       (04, "Legal"),

INSERT INTO role (id, title, salary, department_id)
VALUES (01, "Sales Lead", 100000, "Sales"),
       (02, "Salesperson", 80000, "Sales"),
       (03, "Lead Engineer", 150000, "Engineering"),
       (04, "Software Engineer", 120000, "Engineering"),
       (05, "Account Manager", 160000, "Finance"),
       (06, "Acountant", 125000, "Finance"),
       (07, "Legal Team Lead", 250000, "Legal"),
       (08, "Lawyer", 190000, "Legal"),

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (01, "Johnny", "Appleseed", "Sales Lead", 01),
       (02, "Mikey", "Mike", "Salesperson", 01),
       (03, "Rodrigo", "Alexander", "Lead Engineer", 03),
       (04, "Kevin", "Tupak", "Software Engineer", 03 ),
       (05, "Sarah", "Lorax", "Account Manager", 05),
       (06, "Syd", "Baby", "Acountant", 05),
       (07, "Bosco", "Patrick", "Legal Team Lead", 07),
       (08, "Malia", "Singh" "Lawyer", 07),