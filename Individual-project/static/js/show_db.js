'use strict';

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

    for(let el of data[0]){
        let row = document.createElement('div');
        row.classList.add('row');
        table.append(row);

        let delete_cell = document.createElement('div');
        delete_cell.classList.add('cell');
        delete_cell.classList.add('delete');
        delete_cell.innerHTML = 'Delete';

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

    parent.append(table);

    // Insertion fields
    if (allow_insert){
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
            field_input.classList.add('insert-field')

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
                    update_db(`${db_root_path}/get_db`, name.toLowerCase().split(' ').join('_'), db_root_path);
                }
                else{
                    alert('Something went wrong');
                }
            });
        }
        parent.append(submit_btn);
    }

    console.log(data)
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
