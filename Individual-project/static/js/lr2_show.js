'use strict';

let params = new URLSearchParams(document.location.search);
let db = params.get('db');

function show_db(db){
    fetch(`/lr2/get_db?db=${db}`)
    .then(response => response.json())
    .then(data => {
        create_table_from_db_json(data, capitalizeFirstLetter(db.split('_').join(' ')), document.querySelector('div.wrapper'));
    })
    .catch(error =>{
        let error_text = document.createElement('h1');
        error_text.innerHTML = `Таблицы ${capitalizeFirstLetter(db.split('_').join(' '))} не существует`;
        document.querySelector('.wrapper').append(error_text);
        // console.error("error: ", error)
    });
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

show_db(db);
