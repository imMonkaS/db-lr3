'use strict';

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

select_change(selected_db.value);

 function serialize(obj) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

function generateSearchInputs(parent, data){
    for(let el of data[1].slice(1)){
        let capitalizedName = capitalizeFirstLetter(el['name'].split('_').join(' '))

        let field_div = document.createElement('div');
        field_div.classList.add('search-div')
        
        let field_name = document.createElement('span');
        field_name.innerHTML = capitalizedName;
        
        let field_input = document.createElement('input');
        field_input.name = el['name'];
        field_input.classList.add('search-field')
        field_input.onkeydown = (event)=>{
            if (event.key == 'Enter'){
                search_btn.onclick();
            }
        }

        field_div.append(field_name);
        field_div.append(field_input);
        parent.append(field_div);
    }
    let search_btn = document.createElement('button');
    search_btn.innerHTML = 'Искать';
    search_btn.classList.add('search-submit');

    search_btn.onclick = ()=>{
        let fields = {}
        for (let field of document.querySelectorAll('.search-field')){
            fields[field.name] = field.value;
        }
        fields['db'] = selected_db.value;
        fetch(`/lr1/search?${serialize(fields)}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
        })
        .then((response) => response.json())
        .then((data) => {
            let wrapper = document.querySelector('.wrapper');
            wrapper.innerHTML = '';
            create_table_from_db_json(data, selected_db.value, '/lr1', wrapper, false);
        });
    }

    parent.append(search_btn);
}

function select_change(db){
    if (document.querySelector('.search-input-container') !== null){
        document.querySelector('.search-input-container').remove();
    }

    let searchInputContainer = document.createElement('div');
    searchInputContainer.classList.add('search-input-container');
    document.querySelector('.container').append(searchInputContainer);

    fetch(`/lr1/get_db?db=${db}`)
    .then(response => response.json())
    .then(data => {
        generateSearchInputs(searchInputContainer, data);
    })
    .catch(error =>{
        let error_text = document.createElement('h1');
        error_text.innerHTML = `Таблицы ${capitalizeFirstLetter(db.split('_').join(' '))} не существует`;
        document.querySelector('.wrapper').append(error_text);
        
        console.error("error: ", error)
    });
}
