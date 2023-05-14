
# Employee Tracker


# Clip of it working
[2023-05-14 11-51-31.zip](https://github.com/kylecoding1/MYSQL2.0/files/11472719/2023-05-14.11-51-31.zip)


A command-line application to manage a company's employee database.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

## Description

The Employee Tracker is a Node.js command-line application that allows business owners to view and manage departments, roles, and employees in their company. It provides functionalities such as viewing department and role information, adding new departments, roles, and employees, as well as updating an employee's role.

The application uses the MySQL database to store and retrieve data related to departments, roles, and employees. It utilizes the Inquirer package to interact with the user through prompts and displays data in a formatted table using the console.table package.

## Installation

To install and run the Employee Tracker application, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd employee-tracker`
3. Install the dependencies: `npm install`
4. Set up your MySQL database by running the provided SQL script: `mysql -u <username> -p <database-name> < db/schema.sql`
5. Configure the database connection in the `src/index.js` file, updating the host, user, password, and database information.
6. Start the application: `npm start`

Note: Make sure you have Node.js and MySQL installed on your machine.

## Usage

Upon running the application, you will be presented with a menu of options to choose from. You can navigate through the menu using the arrow keys and select an option by pressing Enter. The available options include:

- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role
- Exit

Selecting any of the view options will display the corresponding data in a formatted table. Adding a department, role, or employee will prompt you to enter the necessary information. Updating an employee's role will allow you to choose an employee and update their role.

After each action, you will be returned to the main menu to perform further operations or choose the exit option to quit the application.

## Technologies

The Employee Tracker application is built using the following technologies:

- Node.js
- Inquirer
- MySQL
- console.table

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

