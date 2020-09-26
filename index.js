const inquirer = require("inquirer");
const connection = require("./connection.js");
require("console.table");

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "view employees",
        "view roles",
        "view departments",
        "add an employee",
        "add a role",
        "add a department",
        "update an employee's role",
        "quit",
      ],
    })
    .then(function (answer) {
      console.log(answer);
      if (answer.action === "view employees") {
        viewEmployees();
      }
      if (answer.action === "view roles") {
        viewRoles();
      }
      if (answer.action === "view departments") {
        viewDepartments();
      }
      if (answer.action === "add an employee") {
        addEmployees();
      }
      if (answer.action === "add a role") {
        addRoles();
      }
      if (answer.action === "add a department") {
        addDepartments();
      }
      if (answer.action === "update an employee's role") {
        var list = viewEmployees();
        update(list);
      }
      if (answer.action === "quit") {
        quit();
      }
    });
}

function viewEmployees() {
  return connection.query(
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM departments LEFT JOIN roles ON departments.id = roles.department_id LEFT JOIN employees ON roles.id = employees.role_id LEFT JOIN employees manager ON employees.manager_id = manager.id ORDER BY employees.id ASC;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      console.log(res);
      start();
    }
  );
}
function update(arr) {
  inquirer.prompt([
    {
      name: "select",
      type: "rawlist",
      message: "Select employee ID",
      choices: arr.map(x => x.id),
    },
  ]);
  .then(answer => {
    connection.query(
      "SELECT"
    )
  })
}
function viewRoles() {
  connection.query(
    "SELECT roles.title, roles.salary, departments.name AS department FROM departments LEFT JOIN roles ON departments.id = roles.department_id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}
function viewDepartments() {
  connection.query(
    "SELECT departments.name AS department FROM departments;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}
function addEmployees() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employees first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employees last name?",
      },
      {
        name: "role",
        type: "list",
        message: "What is the employees role?",
        choices: [
          "SOFTWARE ENGINEER",
          "WEB DEVELOPER",
          "SENIOR SOFTWARE ENGINEER",
          "LAWYER",
          "SALES MANAGER",
          "SALES PERSON",
          "ACCOUNTANT",
          "FINANCIAL ANALYST",
          "ACCOUNTANT INTERN",
          "CEO",
          "VP",
        ],
      },
      {
        name: "manager",
        type: "list",
        message: "Who is the employees manager?",
        choices: [
          "Nancy Drew",
          "Andrew Douglas",
          "Mandy Candy",
          "Morgan Taylor",
          "Todd West",
          "Bob Smith",
        ],
      },
    ])
    .then(function (answer) {
      const firstName = answer.firstName;
      const lastName = answer.lastName;
      // Figure out how to find role id and manager id based on answer.role and answer.manager, then insert into the array '[firstName, lastName, 1, 1]' inside the connection.query
      const role = answer.role;
      const manager = answer.manager;
      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [firstName, lastName, 1, 1],
        function (err, res) {
          if (err) throw err;
          console.log("Successfully added an employee");
          start();
        }
      );
    });
}
function addRoles() {
  inquirer.prompt([
    {
      name: "role",
      type: "list",
      message: "What is the role?",
      choices: [
        "SOFTWARE ENGINEER",
        "WEB DEVELOPER",
        "SENIOR SOFTWARE ENGINEER",
        "LAWYER",
        "SALES MANAGER",
        "SALES PERSON",
        "ACCOUNTANT",
        "FINANCIAL ANALYST",
        "ACCOUNTANT INTERN",
        "CEO",
        "VP",
      ],
    },
    {
      name: "salary",
      type: "input",
      message: "What is the roles salary?",
    },
    {
      name: "id",
      type: "input",
      message: "What is the role's department id?",
    },
  ]);
  //   connection.query(
  //  "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", []
  //     function (err, res) {
  //       if (err) throw err;
  //       console.table(res);
  //       start();
  //     }
  //   );
}
function addDepartments() {
  inquirer.prompt([
    {
      name: "department",
      type: "list",
      message: "What is the employees department?",
      choices: [
        "ADMINISTRATION",
        "ACCOUNTING",
        "SALES",
        "LEGAL",
        "ENGINEERING",
      ],
    },
  ]);
  //   connection.query(
  //  "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", []
  //     function (err, res) {
  //       if (err) throw err;
  //       console.table(res);
  //       start();
  //     }
  //   );
}
function quit() {
  connection.end();
}
//   connection.query(
//  "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", []
//     function (err, res) {
//       if (err) throw err;
//       console.table(res);
//       start();
//     }
//   );
//}
// function addEmployees() {
//   connection.query(
//  "INSERT INTO employees
//     (first_name, last_name, role_id, manager_id)
// VALUES
// ("Nancy", "Drew", 2, null)"
//     function (err, res) {
//       if (err) throw err;
//       console.table(res);
//       start();
//     }
//   );
// }

start();
