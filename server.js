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

    console.log("MySQL connected!")
    
    db.query('select * from employee',(err, res) => {
        if (err){
            throw err;
        }
        console.log(res)
    })
    db.end();
})


