'use strict';


submit1.onclick = function(){
    fetch('/lr2/task_9')
    .then(response => response.json())
    .then(data => {
        response1.innerHTML = data[0][0]['books_price']
    })
    .catch(error => console.error("error: ", error));
}

clear1.onclick = function(){
    response1.innerHTML = "...";
}


submit2.onclick = function(){
    fetch('/lr2/task_14')
    .then(response => response.json())
    .then(data => {
        response2.innerHTML = data[0][0]['avg_book_price']
    })
    .catch(error => console.error("error: ", error));
}

clear2.onclick = function(){
    response2.innerHTML = "...";
}


submit3.onclick = function(){
    fetch('/lr2/task_9')
    .then(response => response.json())
    .then(data => {
        if (parseInt(data[0][0]['books_price']) < 1000 || parseInt(data[0][0]['books_price']) > 5000)
            response3.innerHTML = 'Сумма закупок = ' + data[0][0]['books_price']
        else
            response3.innerHTML = '';
            
    })
    .catch(error => console.error("error: ", error));
}

clear3.onclick = function(){
    response3.innerHTML = "...";
}

submit4.onclick = function(){
    fetch('/lr2/task_34')
    .then(response => response.json())
    .then(data => {
        response4.innerHTML = 'Выполнено';
    })
    .catch(error => console.error("error: ", error));
}

clear4.onclick = function(){
    response4.innerHTML = "...";
}
