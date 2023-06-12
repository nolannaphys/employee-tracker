const inquirer = require('inquirer');
const { table } = require('table');
const mysql = require('mysql2/promise');

let db;
mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'nolanpassword',
    database: 'employee_db'
  }
)
  .then((connection) => {
    db = connection;
    console.log(`Connected to the employee database.`)
  });

const config = {
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,

    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,

    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,

    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  }
};

async function showTable(data, cb) {
  let tableData = [];
  tableData = [
    //column
    Object.keys(data[0]),
    //values
    ...data.map(val => Object.values(val))];

  const answers = await inquirer.prompt([
    {
      message: "\n" + table(tableData, config),
      type: 'input',
      name: 'name'
    }
  ])
    .then(() => {
      if (cb) cb();
      console.log("Done!")
    })
};

const dbData = [
  { id: 1, name: "Nolan" },
  { id: 2, name: "Hank" },
  { id: 3, name: "George" }
];

const addDepartment = async function () {
  const resluts = await db.query("SELECT * FROM department");
  const dbData = results[0];
  const choiceData = dbData.map((row) => ({
    name: row.name,
    value: row
  }))
  choiceData.push({
    name: "No Department",
    value: { id: null }
  });

  const firstAnswer = await inquirer.prompt([
    {
      message: 'What would you like to do?',
      type: 'list',
      choices: choiceData,
      name: 'answers'
    };
]);

const otherAnswers = await inquirer.prompt([
  {
    name: 'View All Departments',
    value: 'viewDepartment'
  },
  {
    name: 'View All Roles',
    value: 'viewRoles'
  },
  {
    name: 'View All Employees',
    value: 'viewEmployees'
  }
])
}

// showTable(dbData, () => {
//   console.log("Do stuff after!");
// });

