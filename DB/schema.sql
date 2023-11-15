DROP DATABASE IF EXISTS realcompany_db;
CREATE DATABASE realcompany_db;

USE realcompany_db;

CREATE TABLE department(
    id INT PRIMARY KEY,
    department_name VARCHAR(30),
);

CREATE TABLE role(
    id INT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
);

CREATE TABLE employee(
    id INT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
);