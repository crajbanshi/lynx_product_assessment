const express = require('express')
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'j6zQXIyB22',
    password: 'r8E4xAwtmU',
    database: 'j6zQXIyB22'
});
connection.connect();
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/products', async (req, res) => {

    let query = "SELECT * FROM product LIMIT 10;";
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.get('/product/:id', async (req, res) => {
    let id = req.params.id;
    let ifCAD = req.query.cur;
    let updateQuery = `UPDATE product set productViewed = productViewed+1 where id=${id};`
    let query = `SELECT * FROM product WHERE id=${id};`;
    connection.query(updateQuery, function (error) {
        if (error) throw error;
        connection.query("SELECT * FROM currency;", function (error, currency) {
            if (error) throw error;
            let curRate = JSON.parse(currency[0].data);
            connection.query(query, function (error, results, fields) {
                if (error) throw error;
                let result = results[0];
                if (ifCAD == 'CAD') {
                    result.price *= curRate.result;
                }
                res.send(result);
            });
        });
    });
})


app.get('/mostviewed', async (req, res) => {
    let query = `SELECT * FROM product ORDER BY productViewed DESC;`;
    connection.query(query, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})