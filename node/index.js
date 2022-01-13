const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
//const sqlTable = `CREATE TABLE people(id int not null auto_increment, name varchar(255))`
//connection.query(sqlTable)
const sql = `INSERT INTO people(name) values('Diogo Moreira')`
const sql2 = `INSERT INTO people(name) values('Wesley Williams')`
connection.query(sql)
connection.query(sql2)

connection.end()


app.get('/', (req,res) => {
    const cnQuery = mysql.createConnection(config)    
    const cmdQuery = `SELECT * FROM people`
    let _html = "<ul>"
    cnQuery.query(cmdQuery, (err, result, fields) => {
        if (err) throw err;        
        result.map((data) => {
            _html += `<li>${data.name}</li>`
        })
        _html += "</ul>"
        res.send('<h1>Full Cycle</h1><br/>' + _html)
    })
    cnQuery.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})