const inquirer = require("inquirer");
const db = require ('./server.js');
const table = require("console.table");
let holderArray = [];

Menu();

    function Menu(){
        inquirer
    .prompt([
    {
     type: 'list',
     message: 'What would you like to do?',
     name: 'choice',
     choices:['View all departments', 'View all roles', 'View all employees',
    'add a department', 'add a role', 'add an employee', 'update an employee role'],
     },])
     .then(response => {
        if(response.choice == 'View all departments'){
            viewDepartments();
        }else if(response.choice == 'View all roles'){
            viewRoles();
        }else if(response.choice == 'View all employees'){
            viewEmployees();
        }else if(response.choice == 'add a department'){
            addDepartment();
        }else if(response.choice == 'add a role'){
             addRole();
        }else if(response.choice == 'add an employee'){
             addEmployee();
        }else if(response.choice == 'update an employee role'){
             updateEmployee();
        }
     })
    }

    function viewDepartments(){
        //shows dep names and dep id's in a table
        let depQuery = 'SELECT * FROM department';
        db.query(depQuery, (error, data) => {
            if(error){
                throw error;
            }
            console.table(data);
            Menu();
        })

    }

    function viewRoles(){
        let roleQuery = 'SELECT * FROM role'
        db.query(roleQuery, (error, data) =>{
            if(error){
                throw error;
            }
            console.table(data);
            Menu();
        })
    }

    function viewEmployees(){
        let empQuery = 'SELECT * FROM employee'
        db.query(empQuery, (error, data) => {
            if(error){
                throw error;
            }
            console.table(data);
            Menu();
        })
    }

    function addDepartment(){
            inquirer
        .prompt([
        {
         type: 'input',
         message: 'What is the new department name?',
         name: 'name',
         },])
         .then((response) => {
            let add = `INSERT INTO department (name) VALUES ("${response.name}")`;
            db.query(add, (error, data) => {
                if(error){
                    throw error;
                }
                console.log("data successfully added");
            })
            Menu();
         })
    }

    function addRole(){
        inquirer
        .prompt([
        {
         type: 'input',
         message: 'What is the new role title?',
         name: 'title',
         },
        {
            type: 'input',
            message: 'What is the new role salary?',
            name: 'salary',
        },
        {
            type: 'input',
            message: 'What is the new roles department ID?',
            name: 'department_id',
        },])
         .then((response) => {
             console.log('made it');
            let add = `INSERT INTO role (title, salary, department_id) VALUES ("${response.title}", "${response.salary}", "${response.department_id}")`;
            db.query(add, (error, data) => {
                console.log("inside query");
                if(error){
                    console.log('in the error');
                    throw error;
                }
                console.log("data successfully added");
            })
            Menu();
         })
    }

    function addEmployee(){
        inquirer
        .prompt([
        {
         type: 'input',
         message: 'What is the new employees first name?',
         name: 'first_name',
        },
        {
         type: 'input',
         message: 'What is the new employees last name?',
         name: 'last_name',
        },
        {
            type: 'input',
            message: 'What is the new employees role ID?',
            name: 'role_id',
        },
        {
            type: 'input',
            message: 'Who is this new employees managers ID?',
            name: 'manager_id',
        },])
        .then((response) => {
            console.log('made it');
           let add = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.first_name}", "${response.last_name}", "${response.role_id}", "${response.manager_id}")`;
           db.query(add, (error, data) => {
               console.log("inside query");
               if(error){
                   console.log('in the error');
                   throw error;
               }
               console.log("data successfully added");
           })
           Menu();
        })
    }

    function updateEmployee(){
    //  db.query("UPDATE role SET name = ? WHERE name = ?",)
    inquirer
        .prompt([{
            type: "input",
            message:
            "Please enter the ID of the employee you wish to update.",
            name: "emp_id",
        },
        {
            type: "input",
            message:
            "Please enter the ID of the role you wish to put employee into.",
            name: "role_id",
        }])
        .then((response) => {
            let update = `UPDATE employee SET role_id=${response.role_id} WHERE id=${response.emp_id}`;
            db.query(update, (error, data) => {
                if(error){
                    throw error;
                }
            })
            Menu();
        })
    
    }