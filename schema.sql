DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

-- Create Department table with id and name
CREATE TABLE department (
    department_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30)
);

--Create role/position table with id, title, salary, and department id
CREATE TABLE position (
    position_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT REFERENCES department(department_id)
);

--Create employee table with id, first name, last name, role id, and manager id
CREATE TABLE employee (
    employee_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL REFERENCES position(position_id),
    manager_id INT REFERENCES employee(employee_id)
);