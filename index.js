const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');


var app = express();

app.use(bodyparser.json());

const mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Sagar@123',
    database : 'EmployeeDB'
  });
  
  //EmployeeDB.employee

  mysqlConnection.connect((err) => {
    if(err){
        console.log("error", +JSON.stringify(err));
    }else{

        console.log('Connected to MySQL Server!');
    }
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
  });

app.get('/emp', (res, req)=>{

    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields)=>{
        if(err){
            console.log(err);
        }else{
            console.log(rows)
        }
    })
})
