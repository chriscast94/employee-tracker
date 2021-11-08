const mysql = require('mysql2');
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

const deptArray = [];
console.log(deptArray);
const roleArray = ["HR Representative", "Junior Accountant", "Full Stack Developer"];
console.log(roleArray);
const empArray = ["Ash Ketchum", "Alice Liddell", "Lyra Silvertongue"];
console.log(empArray);

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
        'Exit Program'],
    },

  ])
    .then(answers => {
      if (answers.firstQuestion === 'View all departments') {
        db.query(
          'SELECT * FROM department', function (err, results) {
            console.table(results);
            inquirerPrompt();
          })
      }

      if (answers.firstQuestion === 'View all roles') {
        db.query(
          'SELECT * FROM position', function (err, results) {
            console.table(results);
            inquirerPrompt();
          })
      }

      if (answers.firstQuestion === 'View all employees') {
        db.query(
          'SELECT * FROM employee', function (err, results) {
            console.table(results);

          })
      }

      if (answers.firstQuestion === 'Add a department') {
        addDept()
      }

      if (answers.firstQuestion === 'Add a role') {
        addRole();
      }

      if (answers.firstQuestion === 'Add an employee') {
        addEmp();
      }

    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      }
    });
}
//------------------------------------------------------------------------------------------------------------------
// Add department function for prompt and push into table and array
function addDept() {
  db.query('SELECT * FROM department'

  )
  inquirer.prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'What is the name of the department?',
    },
  ])
    .then(answers => {
      db.query(
        `INSERT INTO department (department_name)
      VALUES ("${answers.newDepartment}")`
      );
      //push into deptArray
      deptArray.push(`${answers.newDepartment}`);
      console.log(deptArray);
      inquirerPrompt();
    })
    //catches error - retrived this code from MYSQL page here: https://www.npmjs.com/package/mysql2
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      }
    });
}
//------------------------------------------------------------------------------------------------------------------
//Function to add role and push into role array
function addRole() {
  db.query('SELECT * FROM position'

  )
  inquirer.prompt([

    {
      type: 'input',
      name: 'newRole',
      message: 'What is the name of the new role?',
    },

    {
      type: 'input',
      name: 'roleSalary',
      message: 'What is the salary of the new role?',
    },

    {
      type: 'list',
      name: 'roleDept',
      message: 'What department is the new role in?',
      choices: deptArray
    },
  ])
    .then(answers => {
      db.query(
        `INSERT INTO position (title, salary, department_id) 
        VALUES ("${answers.newRole}, ${answers.roleSalary}, ${answers.roleDept}")`
      );
      roleArray.push (`${answers.newRole}`);
      inquirerPrompt();
    })
    //catches error
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      }
    });
}
//------------------------------------------------------------------------------------------------------------------
//Add employee function for prompt
function addEmp() {
  db.query(
    'SELECT * FROM employee'
  )
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the new employee?',
    },

    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of the new employee?',
    },

    {
      type: 'list',
      name: 'empRole',
      message: 'What is the role of the employee?',
      choices: roleArray,
    },

    {
      type: 'list',
      name: 'empManager',
      message: 'Who is the manager of the employee?',
      choices: empArray
    }
  ])
    .then(answers => {
      db.query(
        `INSERT INTO employee (first_name, last_name, position_id, manager_id)
      ${answers.firstName}, ${answers.lastName}, ${answers.empRole}, ${empManager}`
      )
      roleArray.push (`${answers.newRole}`);
      inquirerPrompt();
    })
    //catches error
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      }
    });
}
//------------------------------------------------------------------------------------------------------------------
//Codes taken from examples
//MySQL

// // simple query
// db.query(
//   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// // with placeholder
// db.query(
//   'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//   ['Page', 45],
//   function (err, results) {
//     console.log(results);
//   }
// );
// //------------------------------------------------------------------------------------------------------------------
// // Table
// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

//------------------------------------------------------------------------------------------------------------------
inquirerPrompt();