'use strict';

function create_delete_cell(db_root_path, name){
    let delete_cell = document.createElement('div');
        delete_cell.classList.add('cell');
        delete_cell.classList.add('delete');
        delete_cell.innerHTML = 'Удалить';

        delete_cell.onclick = (event)=>{
            let id = delete_cell.parentElement.children[1].innerHTML;
            let field_name = delete_cell.parentElement.parentElement.children[0].children[1].innerHTML;

            if (!event.ctrlKey){
                let c = confirm("Вы точно хотите удалить запись под номером " + id);
                if (!c)
                    return;
            }
            
            fetch(`${db_root_path}/delete?db=${name.toLowerCase().split(' ').join('_')}`, {
                method: "DELETE",
                body: JSON.stringify({
                    id,
                    field_name
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status == 'success'){
                        delete_cell.parentElement.remove();
                    }
                    else{
                        alert('Something went wrong');
                    }
                });
        }
        return delete_cell;
}

function append_rows(data, table, db_root_path, name){
    for(let el of data[0]){
        let row = document.createElement('div');
        row.classList.add('row');
        table.append(row);

        let delete_cell = create_delete_cell(db_root_path, name);
        row.append(delete_cell);

        for (let value of Object.values(el)){
            let r_cell = document.createElement('div');
            r_cell.classList.add('cell');
            if (value == null)
                r_cell.innerHTML = 'NULL';
            else{
                if (typeof(value) == 'string'){
                    r_cell.innerHTML = value.replace('T00:00:00.000Z', '');
                }
                else
                    r_cell.innerHTML = value;
            }
            row.append(r_cell);
        }
    }
}

function create_table_from_db_json(data, name, db_root_path, parent, allow_insert = true){
    let table_name_text = document.createElement('h1');
    table_name_text.innerHTML = name;
    parent.append(table_name_text);

    let table = document.createElement('div');
    table.classList.add('table');

    let table_header = document.createElement('div');
    table_header.classList.add('row');
    table_header.classList.add('header');
    table.append(table_header);

    let empyt_cell = document.createElement('div');
    empyt_cell.classList.add('cell');
    table_header.append(empyt_cell);
    for (let el of data[1]){
        let h_cell = document.createElement('div');
        h_cell.classList.add('cell');
        h_cell.innerHTML = el['name'];
        table_header.append(h_cell);
    }

    append_rows(data, table, db_root_path, name);

    parent.append(table);

    // Insertion fields
    if (allow_insert){
        create_insert_elements(data, parent, table, name, db_root_path);
    }

    // console.log(data);
    apply_theme();
}

function update_db(path, db, db_root_path){
    document.querySelector('div.wrapper').innerHTML = '';
    show_db(path, db, db_root_path);
}

function show_db(path, db, db_root_path){
    fetch(`${path}?db=${db}`)
    .then(response => response.json())
    .then(data => {
        create_table_from_db_json(data, capitalizeFirstLetter(db.split('_').join(' ')), db_root_path, document.querySelector('div.wrapper'));
    })
    .catch(error =>{
        let error_text = document.createElement('h1');
        error_text.innerHTML = `Таблицы ${capitalizeFirstLetter(db.split('_').join(' '))} не существует`;
        document.querySelector('.wrapper').append(error_text);
        
        console.error("error: ", error)
    });
}

function append_latest_row(path, db, code_parameter_name, table, db_root_path, name){
    fetch(`${path}?db=${db}&id=${code_parameter_name}`)
    .then(response => response.json())
    .then(data => {
        append_rows(data, table, db_root_path, name);
        apply_theme();
    })
    .catch(error =>{
        alert('something wend wrong');
        console.error("error: ", error);
    });
}

function create_insert_elements(data, parent, table, name, db_root_path){
    let insert_title = document.createElement('h2');
        insert_title.innerHTML = `Вставка в таблицу ${name}`;
        parent.append(insert_title);

        for(let el of data[1].slice(1)){
            let capitalizedName = capitalizeFirstLetter(el['name'].split('_').join(' '))

            let field_div = document.createElement('div');
            field_div.classList.add('insert-div')
            
            let field_name = document.createElement('span');
            field_name.innerHTML = capitalizedName;
            
            let field_input = document.createElement('input');
            field_input.name = el['name'];
            field_input.placeholder = el['name'];
            field_input.maxLength = 30;
            field_input.classList.add('insert-field')
            
            field_input.onkeydown = (event)=>{
                if (event.key == 'Enter'){
                    submit_btn.onclick();
                }
            }

            field_div.append(field_name);
            field_div.append(field_input);
            parent.append(field_div);
        }
        let submit_btn = document.createElement('button');
        submit_btn.innerHTML = 'Вставить';
        submit_btn.classList.add('insert-submit');

        submit_btn.onclick = ()=>{
            let fields = {}
            for (let field of document.querySelectorAll('.insert-field')){
                fields[field.name] = field.value;
            }
            fetch(`${db_root_path}/insert?db=${name.toLowerCase().split(' ').join('_')}`, {
            method: "POST",
            body: JSON.stringify({
                fields,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.status == 'success'){
                    append_latest_row(db_root_path + '/get_latest_row', name.toLowerCase().split(' ').join('_'), table.children[0].children[1].innerHTML,
                                        table, db_root_path, name);
                }
                else{
                    alert(data.status);
                }
            });
        }
        parent.append(submit_btn);
}
