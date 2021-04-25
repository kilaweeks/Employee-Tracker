const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const consoleTable = require("console.table");
const mysql = require("mysql"); 

// Creates connection to MySQL database
const db = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",  
    password: "password", 
    database: "employee_db"
}); 

// Connects to server
db.connect((err) => {
    if (err) {
        throw err; 
    }

    console.log("MySQL connected!")

    db.query('select * from employee',(err, res) => {
        if (err){
            throw err;
        }
        console.log(res)
    })
    db.end();
}); 


// Create writeFile function
// const writeFileAsync = util.promisify(fs.writeFile);
// Create readFile function 
// const readFileAsync = util.promisify(fs.readFile);

// Create function to prompt user for inital action 
// const init = () => {
//     return inquirer.prompt([
//         {
//         name: 'start',
//         type: 'list',
//         message: 'What would you like to do?',
//         choices: [
//                 'View all employees',
//                 'View all departments',
//                 'View all roles',
//                 'Add employee',
//                 'Add department',
//                 'Add role',
//                 'Update employee',
//                 'Delete employee',
//                 'EXIT' 
//         ],
//         default: "View all employees",       
//         }])
//         .then(option => {
//             switch (option.start) {
//                 case "View all employees": 
//                     viewEmployees(); 
//                     break; 
//                 case "View all departments":
//                     viewDepartments(); 
//                     break; 
//                 case "View all roles":
//                     viewRoles(); 
//                     break; 
//                 case "Add employee":
//                     addEmployee(); 
//                     break;
//                 case "Add department": 
//                     addDepartment(); 
//                     break; 
//                 case "Add role":
//                     addRole(); 
//                     break; 
//                 case "Update employee":
//                     updateEmployee(); 
//                     break; 
//                 case "Delete employee": 
//                     deleteEmployee(); 
//                     break; 
//                 case "EXIT": 
//                     exit(); 
//                 default:
//                     break; 
//             }
//         })
// }

// // Create function to view all employees in database
// const viewEmployees = () => {
//     db.query("select * from employee", (err, res) => {
//         if(err) {
//             throw err; 
//         }
//         console.log(res.length + " employees found");
//         console.consoleTable(`Employees: ${res}`); 
//         init(); 
//     })
// }; 

// const viewDepartments = () => {
//     db.query("select * from department", (err, res) => {
//         if(err) {
//             throw err; 
//         }
//         console.log(`Departments: ${res}`); 
//         init(); 
//     })
// }; 

// const viewRoles = () => {
//     db.query("select * from roles", (err, res) => {
//         if(err) {
//             throw err; 
//         }
//         console.log(`Roles: ${res}`); 
//         init(); 
//     })
// }; 

// const addEmployee = () => {
//     db.query("select * from role", (err, res) => {
//         if (err) {
//             throw err; 
//         }
//         inquirer.prompt([
//             {
//                 name: 'first_name',
//                 type: 'input', 
//                 message: "Enter the employee's fist name",
//             },
//             {
//                 name: 'last_name',
//                 type: 'input', 
//                 message: "Enter the employee's last name"
//             },
//             {
//                 name: 'manager_id',
//                 type: 'input', 
//                 message: "Enter the id for this employee's manager"
//             },
//             {
//                 name: "role", 
//                 type: "list", 
//                 choices: () => {
//                 let roleArray = []; 
//                 for (let i = 0; i < res.length; i++) {
//                     roleArray.push(res[i].title); 
//                 }
//                 return roleArray;
//                 }, 
//                 message: "What is this employee's role?"
//             }
//         ]) 
//         .then(answer => {
//             let role_id; 
//             for (let i = 0; i < res.length; i++) {
//                 if (res[i].title === answer.role) {
//                     role_id = res[i].id; 
//                     console.log(role_id); 
//                 }
//             }
//             db.query(
//                 "insert into employee set ?", 
//                 {
//                     first_name: answer.first_name,
//                     last_name: answer.last_name, 
//                     manager_id: answer.manager_id, 
//                     role_id: role_id,
//                 }, 
//                 (err) => {
//                     if (err) {
//                         throw err; 
//                         console.log("Employee has been added"); 
//                         init(); 
//                     }
//                 }
//             )
//         })
//     })
// }
// init(); 
