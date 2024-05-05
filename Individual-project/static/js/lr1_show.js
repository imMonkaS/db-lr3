'use strict';

let params = new URLSearchParams(document.location.search);
let db = params.get('db');

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

show_db("/lr1/get_db", db, '/lr1');
