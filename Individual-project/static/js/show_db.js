'use strict';

function create_table_from_db_json(data, name, parent){
    let table_name_text = document.createElement('h1');
    table_name_text.innerHTML = name;
    parent.append(table_name_text);

    let table = document.createElement('div');
    table.classList.add('table');

    let table_header = document.createElement('div');
    table_header.classList.add('row');
    table_header.classList.add('header');
    table.append(table_header);

    for (let el of data[1]){
        let h_cell = document.createElement('div');
        h_cell.classList.add('cell');
        h_cell.innerHTML = el['name'];
        table_header.append(h_cell);
    }

    for(let el of data[0]){
        let row = document.createElement('div');
        row.classList.add('row');
        table.append(row);
        for (let value of Object.values(el)){
            let r_cell = document.createElement('div');
            r_cell.classList.add('cell');
            if (value == null)
                r_cell.innerHTML = 'NULL';
            else
                r_cell.innerHTML = value;
            row.append(r_cell);
        }
    }

    parent.append(table);
    apply_theme();
}

function update_db(data, name){
    document.querySelector('div.wrapper').innerHTML = '';
    create_table_from_db_json(data, name, document.querySelector('div.wrapper'));
}
