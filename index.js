const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');


var app = express();

app.use(bodyparser.json());

const mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Sagar@123',
    database : 'EmployeeDB',
    multipleStatements: true
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


app.get('/emp', (req, res)=>{
      mysqlConnection.query('SELECT * FROM employee', (err, rows, fields)=>{
        if(err){
            console.log(err);
        }else{
            console.log(rows);
            res.send(rows)
        }
    })
})



app.get('/emp/:id', (req, res)=>{
    mysqlConnection.query(`SELECT * FROM employee WHERE EmpID = ${req.params.id}`, (err, rows, fields)=>{
      if(err){
          console.log(err);
      }else{
          console.log(rows);
          res.send(rows)
      }
  })
})


app.delete('/emp/:id', (req, res)=>{
    mysqlConnection.query(`DELETE FROM employee WHERE EmpID = ${req.params.id}`, (err, rows, fields)=>{
      if(err){
          console.log(err);
      }else{
          res.send('DELETE SUCCESSFUL')
      }
  })
})


app.post('/emp', (req, res)=>{
    console.log( req.body);
    
    mysqlConnection.query(`insert into employee values(${req.body.EmpID} , "${req.body.Name}", "${req.body.EmpCode}", ${req.body.salary})`, (err, rows, fields)=>{
        if(err){
            console.log(err);
        }else{
            res.send('POST SUCCESSFUL')
        }
    })
})

app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});


app.put('/emp/:id', (req, res)=>{
    console.log(req.body.EmpID);
    console.log(req.body.Name);
    console.log(req.body.EmpCode);
    console.log(req.body.salary);
    
    
    // mysqlConnection.query(`UPDATE employee SET Name = 'Alfred' WHERE EmpID = ${req.params.id}`, (err, rows, fields)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         res.send('POST SUCCESSFUL')
    //     }
    // })
})
