-- MySQL database
DROP DATABASE IF EXISTS realcompany_db;
CREATE DATABASE realcompany_db;

USE realcompany_db;

-- Creating a table for different departments at "real company"
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

-- Creating a table for different employee roles at "real company"
CREATE TABLE role (
    -- id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT
);

-- Creating a table for all of the employees working at "real company"
CREATE TABLE employee (
    -- id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT
);
