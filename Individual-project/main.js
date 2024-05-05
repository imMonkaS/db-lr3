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

app.post('/lr1', function(req, res){
    console.log(req.body.text1);

    res.sendFile("lr1.html", {root: "html"});
});

app.get('/lr1/get_db_vacations_documents', function(req, res){
    db_vacations_pool.query(`select * from documents`).then(function(data) {
        res.json(data);
    });
});

app.get('/lr1/get_db_vacations_vacations', function(req, res){
    db_vacations_pool.query(`select * from vacations`).then(function(data) {
        res.json(data);
    });
});

app.get('/lr1/get_db_vacations_employees', function(req, res){
    db_vacations_pool.query(`select * from employees`).then(function(data) {
        res.json(data);
    });
});

//1111 1111//

//2222 2222//
// Часть второй лабы

app.get('/lr2', function(req, res){
    res.sendFile("lr2.html", {root: "html"});
});

app.get('/lr2/task_9', function(req, res){
    db_books_pool.query(`select sum(cost * amount) AS books_price from purchases`).then(function(data) {
        console.log(data[0][0]['books_price']);
        res.json(data);
    });
});

app.get('/lr2/task_14', function(req, res){
    db_books_pool.query(`select round(avg(cost), 2) AS avg_book_price from purchases`).then(function(data) {
        console.log(data[0][0]['avg_book_price']);
        res.json(data);
    });
});

app.get('/lr2/get_db_books_authors', function(req, res){
    db_books_pool.query(`select * from authors`).then(function(data_authors) {
        res.json(data_authors);
    });
});

app.get('/lr2/get_db_books_books', function(req, res){
    db_books_pool.query(`select * from books`).then(function(data_books) {
        res.json(data_books);
    });
});

app.get('/lr2/get_db_books_deliveries', function(req, res){
    db_books_pool.query(`select * from deliveries`).then(function(data_deliveries) {
        res.json(data_deliveries);
    });
});

app.get('/lr2/get_db_books_pub_house', function(req, res){
    db_books_pool.query(`select * from publishing_house`).then(function(data_pub_house) {
        res.json(data_pub_house);
    });
});

app.get('/lr2/get_db_books_purchases', function(req, res){
    db_books_pool.query(`select * from purchases`).then(function(data_purchases) {
        res.json(data_purchases);
    });
});

app.get('/lr2/show', function(req, res){
    res.sendFile("lr2_show.html", {root: "html"});
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