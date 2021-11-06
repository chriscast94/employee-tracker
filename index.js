const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const table = require('console.table');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'elatedink973',
  database: 'company_db'
},
console.log('Accessed the company_db databse.')
);

//------------------------------------------------------------------------------------------------------------------

//Prompt questions using inquirer
function inquirerPrompt() {
  inquirer.prompt([
    //Ask what you want to do
    {
      type: 'list',
      name: 'firstQuestion',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'],
    },

    {
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of the department?',
      when: (input) => input.firstQuestion === 'Add a department'
    },

    {
      type: 'input',
      name: 'newRole',
      message: 'What is the name of the new role?',
      when: (input) => input.firstQuestion === 'Add a role'
    },

    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the salary of the new role?',
      when: (input) => input.firstQuestion === 'Add a role'
    },

    {
      type: 'input',
      name: 'roleDept',
      message: 'What department is the new role in?',
      when: (input) => input.firstQuestion === 'Add a role'
    },

    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the new employee?',
      when: (input) => input.firstQuestion === 'Add an employee'
    },

    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of the new employee?',
      when: (input) => input.firstQuestion === 'Add an employee'
    },

    {
      type: 'list',
      name: 'empRole',
      message: 'What is the role of the employee?',
      choices: [

      ],
      when: (input) => input.firstQuestion === 'Add an employee'
    },

    {
      type: 'list',
      name: 'empManager',
      message: 'Who is the manager of the employee?',
      choices: [

      ],
      when: (input) => input.firstQuestion === 'Add an employee'
    }

  ])
    .then((answers) => {
      if (answers.firstQuestion === 'View all departments') {
        db.query(
          'SELECT * FROM department', function (err, results) {
            console.table(results);
          })
      }

      if (answers.firstQuestion === 'View all roles') {
        db.query(
          'SELECT * FROM position', function (err, results) {
            console.table(results);
          })
      }

      if (answers.firstQuestion === 'View all employees') {
        db.query(
          'SELECT * FROM employee', function (err, results) {
            console.table(results);
          })
      }

    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } 
    });
}
//------------------------------------------------------------------------------------------------------------------

//MySQL

// simple query
db.query(
  'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// with placeholder
db.query(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Page', 45],
  function (err, results) {
    console.log(results);
  }
);
//------------------------------------------------------------------------------------------------------------------
// Table
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

  //------------------------------------------------------------------------------------------------------------------
