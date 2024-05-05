'use strict';

let params = new URLSearchParams(document.location.search);
let s = params.get('s');

function show_authors(){
    fetch('/lr2/get_db_books_authors')
    .then(response => response.json())
    .then(data => {
        create_table_from_db_json(data, document.querySelector('div.wrapper'));
    })
    .catch(error => console.error("error: ", error));
}

function show_books(){
    fetch('/lr2/get_db_books_books')
    .then(response => response.json())
    .then(data => {
        create_table_from_db_json(data, document.querySelector('div.wrapper'));
    })
    .catch(error => console.error("error: ", error));
}

function show_deliveries(){
    fetch('/lr2/get_db_books_deliveries')
    .then(response => response.json())
    .then(data => {
        create_table_from_db_json(data, document.querySelector('div.wrapper'));
    })
    .catch(error => console.error("error: ", error));
}

function show_pub_house(){
    fetch('/lr2/get_db_books_pub_house')
    .then(response => response.json())
    .then(data => {
        create_table_from_db_json(data, document.querySelector('div.wrapper'));
    })
    .catch(error => console.error("error: ", error));
}

function show_purchases(){
    fetch('/lr2/get_db_books_purchases')
    .then(response => response.json())
    .then(data => {
        create_table_from_db_json(data, document.querySelector('div.wrapper'));
    })
    .catch(error => console.error("error: ", error));
}

switch (s){
    case 'authors':
        show_authors();
        break;
    case 'books':
        show_books();
        break;
    case 'deliveries':
        show_deliveries();
        break;
    case 'pub_house':
        show_pub_house();
        break;
    case 'purchases':
        show_purchases();
        break;
    default:
        document.querySelector('.wrapper').innerHTML = 'Такой базы данных нет в списке.'
        break;
}
