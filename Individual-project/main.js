const express = require('express');
const mysql2 = require('mysql2/promise');

const db_books_pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'db_books',
    password: '',
});

const db_vacations_pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'db_vacations',
    password: '',
});

const app = express();

// Подключение статичных файлов и прием данных с post запросов
app.use(express.static("static/"));
app.use(express.json());
app.use(express.urlencoded());
// 

//!!!! !!!!//
// Главная

app.get('/', function(req, res){
    res.sendFile("index.html", {root: "html"});
});

//!!!! !!!!//

//1111 1111//
// Часть первой лабы

app.get('/lr1', function(req, res){
    res.sendFile("lr1.html", {root: "html"});
});

app.get('/lr1/get_db', function(req, res){
    db = req.query.db;
    db_vacations_pool.query(`select * from ${db}`).then(function(data) {
        res.json(data);
    })
    .catch(error => {
        // console.log(error);
        res.sendFile("lr1_show.html", {root: "html"});
    });
});

app.post('/lr1/insert', async function(req, res){
    fields = []
    values = []
    for (key of Object.keys(req.body.fields)){
        if (req.body.fields[key] != ''){
            fields.push(key);
            values.push("'" + req.body.fields[key] + "'");
        }
    }

    await db_vacations_pool.query(
        `insert into ${req.query.db} (${fields.join(', ')}) values (${values.join(', ')});
        `
    ).then(function(data){
        res.send({status: 'success'});
    })
    .catch(error => {
        // console.log(error);
        res.send({status: 'error'});
    })
});

app.get('/lr1/show', function(req, res){
    res.sendFile("lr1_show.html", {root: "html"});
});

//1111 1111//

//2222 2222//
// Часть второй лабы

app.get('/lr2', function(req, res){
    res.sendFile("lr2.html", {root: "html"});
});

app.get('/lr2/task_9', function(req, res){
    db_books_pool.query(`select sum(cost * amount) AS books_price from purchases`).then(function(data) {
        res.json(data);
    });
});

app.get('/lr2/task_14', function(req, res){
    db_books_pool.query(`select round(avg(cost), 2) AS avg_book_price from purchases`).then(function(data) {
        res.json(data);
    });
});

app.get('/lr2/get_db', function(req, res){
    db = req.query.db;
    db_books_pool.query(`select * from ${db}`).then(function(data) {
        res.json(data);
    })
    .catch(error => {
        // console.log(error);
        res.sendFile("lr2_show.html", {root: "html"});
    })
});

app.get('/lr2/show', function(req, res){
    res.sendFile("lr2_show.html", {root: "html"});
});

app.post('/lr2/insert', async function(req, res){
    fields = []
    values = []
    for (key of Object.keys(req.body.fields)){
        if (req.body.fields[key] != ''){
            fields.push(key);
            values.push("'" + req.body.fields[key] + "'");
        }
    }

    await db_books_pool.query(
        `insert into ${req.query.db} (${fields.join(', ')}) values (${values.join(', ')});
        `
    ).then(function(data){
        res.send({status: 'success'});
    })
    .catch(error => {
        // console.log(error);
        res.send({status: 'error'});
    })
});

//2222 2222//

// 404 handler

app.use(function(req, res, next) {
    res.status(404);

    if (req.accepts('html')) {
        res.sendFile("404.html", {root: "html"});
        return;
    }
})

// 404 handler

// Запуск сервера
app.listen(3000, function(){
    console.log('server started!');
});
