const inquirer = require('inquirer');
const cTable = require("console.table");
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
    db.query('select * from employee',(err, res) => {
        if (err){
            throw err;
        }
    })
}); 

// Create function to prompt user for initial action 
const init = () => {
    return inquirer.prompt([
        {
        name: 'start',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add employee',
                'Add department',
                'Add role',
                'Update employee',
                'EXIT' 
        ],
        default: "View all employees",       
        }])
        .then(option => {
            switch (option.start) {
                case "View all employees": 
                    viewEmployees(); 
                    break; 
                case "View all departments":
                    viewDepartments(); 
                    break; 
                case "View all roles":
                    viewRoles(); 
                    break; 
                case "Add employee":
                    addEmployee(); 
                    break;
                case "Add department": 
                    addDepartment(); 
                    break; 
                case "Add role":
                    addRole(); 
                    break; 
                case "Update employee":
                    updateEmployee(); 
                    break; 
                case "EXIT": 
                    exit(); 
                default:
                    break; 
            }
        })
}

// Create function to view all employees in database
const viewEmployees = () => {
    db.query("select * from employee", (err, res) => {
        if(err) {
            throw err; 
        }
        console.log(res.length + " employees found");
        console.table(res); 
        init(); 
    })
}; 

// Create function to view departments
const viewDepartments = () => {
    db.query("select * from department", (err, res) => {
        if(err) {
            throw err; 
        }
        console.table(res); 
        init(); 
    })
}; 

// Create function to view employee roles
const viewRoles = () => {
    db.query("select * from role", (err, res) => {
        if(err) {
            throw err; 
        }
        console.table(res); 
        init(); 
    })
}; 

// Create function to add employee to database
const addEmployee = () => {
    db.query("select * from role", (err, res) => {
        if (err) {
            throw err; 
        }
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input', 
                message: "Enter the employee's first name",
            },
            {
                name: 'last_name',
                type: 'input', 
                message: "Enter the employee's last name"
            },
            {
                name: 'manager_id',
                type: 'input', 
                message: "Enter the id for this employee's manager"
            },
            { 
                name: "role", 
                type: "list", 
                choices: () => {
                let roleArray = []; 
                for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title); 
                }
                return roleArray;
                }, 
                message: "What is this employee's role?"
            }
        ]) 
        .then(answer => {
            let role_id; 
            for (let i = 0; i < res.length; i++) {
                if (res[i].title === answer.role) {
                    role_id = res[i].id; 
                }
            }
            db.query("insert into employee set ?", 
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name, 
                    manager_id: answer.manager_id, 
                    role_id: role_id,
                }, 
                () => {
                    if (err) {
                        throw err; 
                    }
                    console.log("Employee has been added"); 
                    init(); 
                }
            )
        })
    })
}; 

const addDepartment = () => {
    inquirer.prompt ([
        {
            name: 'addDept',
            type: 'input', 
            message: "Enter the department name",
        }
    ])
    .then(answer => {
        db.query("insert into department set ?",
        {
            name: answer.addDept
        }); 
        db.query("select * from department", (err, res) => {
                if (err) {
                    throw err; 
                }
                console.log("Your department has been added"); 
                console.table(res); 
                init(); 
        })
    })
}; 

const addRole = () => {
    db.query("select * from department", (err, res) => {
        if (err) {
            throw err; 
        }
        inquirer.prompt([
            {
                name: "addRole", 
                type: "input", 
                message: "Enter the title of the role"
            }, 
            {
                name: "salary", 
                type: "input", 
                message: "Enter the salary for this role"
            }, 
            {   
                name: "dept", 
                type: "list", 
                message: "Choose which department to assign this role to",
                choices: () => {
                    const deptArray = []; 
                    for (let i = 0; i < res.length; i++) {
                        deptArray.push(res[i].name);
                    }
                    return deptArray; 
                },
            }
        ])
        .then(answer => {
            let dept_id; 
            for (let i = 0; i < res.length; i++) {
                if (res[i].name === answer.dept) {
                    dept_id = res[i].id;
                }
            }
            db.query("insert into role set ?", 
            {
                title: answer.addRole, 
                salary: answer.salary,
                department_id: dept_id
            },
            () => {
                if (err) {
                    throw err;
                }
                console.log("Role has been added"); 
                viewRoles(); 
            })
        })
    })
}; 

// Create function to update employee
const updateEmployee = () => {
    db.query("select * from employee", (err, employeeResults) => {
        if(err) {
            throw err; 
        }
        db.query("select * from role", (err, roleResults) => {
            if(err) {
                throw err; 
            }
        inquirer.prompt([
            {
                name: "employeeId", 
                type: "list", 
                message: "Choose which employee role to update",
                choices: () => {
                    let employeeArray = []; 
                    employeeResults.forEach(employee => {
                        employeeArray.push({name:`${employee.last_name} ${employee.first_name}`, value: employee.id})
                    })
                    return employeeArray;
                }
            }, 
            {
                name: "roleId", 
                type: "list", 
                message: "Choose the employee's new role", 
                choices: () => {
                    let roleArray = []; 
                    roleResults.forEach(role => {
                        roleArray.push({name: role.title, value: role.id}); 
                })
                return roleArray;
            }
        }
        ])
        .then(answer => {
            let employeeId =  answer.employeeId;
            let roleId = answer.roleId; 
            
            db.query("update employee set role_id = ? where id = ?", 
            [
                roleId, employeeId
            ],
            () => {
                if (err) {
                    throw err;
                }
                console.log("Employee role has been updated"); 
                init(); 
            })
        })
    })
    })
}

const exit = () => {
    db.end();
}

init();

