import inquirer from 'inquirer';
import mysql from 'mysql2';
import cTable from 'console.table';


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employeeTracker'
});

connection.connect((err) => {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments();
          break;

        case 'View all roles':
          viewAllRoles();
          break;

        case 'View all employees':
          viewAllEmployees();
          break;

        case 'Add a department':
          addDepartment();
          break;

        case 'Add a role':
          addRole();7
          break;

        case 'Add an employee':
          addEmployee();
          break;

        case 'Update an employee role':
          updateEmployeeRole();
          break;

        case 'Exit':
          connection.end();
          break;
      }
    });
}

function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllRoles() {
    const query = `SELECT role.id, role.title, role.salary, department.name AS department
                   FROM role 
                   INNER JOIN department 
                   ON role.department_id=department.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                   FROM employee 
                   LEFT JOIN role ON employee.role_id = role.id
                   LEFT JOIN department ON role.department_id = department.id
                   LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the name of the department?'
        }
    ]).then((answer) => {
        connection.query('INSERT INTO department SET ?', answer, (err) => {
            if (err) throw err;
            console.log('Department added successfully!');
            start();
        });
    });
}

function addRole() {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of the role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of the role?'
            },
            {
                name: 'department_id',
                type: 'list',
                choices: res.map(department => ({ name: department.name, value: department.id })),
                message: 'Which department does the role belong to?'
            }
        ]).then((answer) => {
            connection.query('INSERT INTO role SET ?', answer, (err) => {
                if (err) throw err;
                console.log('Role added successfully!');
                start();
            });
        });
    });
}

function addEmployee() {
    connection.query('SELECT * FROM role', (err, roles) => {
        if (err) throw err;

        connection.query('SELECT * FROM employee', (err, employees) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    name: 'first_name',
                    type: 'input',
                    message: 'What is the employee\'s first name?'
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'What is the employee\'s last name?'
                },
                {
                    name: 'role_id',
                    type: 'list',
                    choices: roles.map(role => ({ name: role.title, value: role.id })),
                    message: 'What is the employee\'s role?'
                },
                {
                    name: 'manager_id',
                    type: 'list',
                    choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
                    message: 'Who is the employee\'s manager?'
                }
            ]).then((answer) => {
                connection.query('INSERT INTO employee SET ?', answer, (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    start();
                });
            });
        });
    });
}

function updateEmployeeRole() {
    connection.query('SELECT * FROM role', (err, roles) => {
        if (err) throw err;

        connection.query('SELECT * FROM employee', (err, employees) => {
            if (err) throw err;

            inquirer.prompt([
                {
                    name: 'id',
                    type: 'list',
                    choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
                    message: 'Which employee\'s role do you want to update?'
                },
                {
                    name: 'role_id',
                    type: 'list',
                    choices: roles.map(role => ({ name: role.title, value: role.id })),
                    message: 'Which role do you want to assign to the selected employee?'
                }
            ]).then((answer) => {
                connection.query('UPDATE employee SET ? WHERE ?', [{ role_id: answer.role_id }, { id: answer.id }], (err) => {
                    if (err) throw err;
                    console.log('Employee\'s role updated successfully!');
                    start();
                });
            });
        });
    });
}
