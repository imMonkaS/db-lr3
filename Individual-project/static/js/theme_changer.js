"use strict";

function apply_theme(){
    if (check_theme() == 'dark'){
        darkThemeToggle.innerHTML = '🌙';
        darkThemeToggle.classList.add('moon');
        body.classList.add('body-dark-theme');
        document.querySelector('header').classList.add('header-dark-theme');
        for (let card of document.querySelectorAll('.card')){
            card.classList.add('card-dark-theme');
        }
        
        for (let t_header of document.querySelectorAll('div.row.header')){
            t_header.classList.add('dark-header');
        }
        for (let t_row of document.querySelectorAll('div.row:not(.header)')){
            t_row.classList.add('dark');
        }
    }
    else if (check_theme() == 'light'){
        body.classList.remove('body-dark-theme');
        darkThemeToggle.innerHTML = '☀️';
        darkThemeToggle.classList.add('sun');
        for (let card of document.querySelectorAll('.card')){
            card.classList.add('card-light-theme');
        }
    }
}
apply_theme();

darkThemeToggle.addEventListener('click', () => {
    if (check_theme() == 'light'){
        darkThemeToggle.innerHTML = '🌙';
        darkThemeToggle.classList.add('moon');
        darkThemeToggle.classList.remove('sun');
        set_theme('dark');
        
        
        for (let t_header of document.querySelectorAll('div.row.header')){
            t_header.classList.add('dark-header');
        }
        for (let t_row of document.querySelectorAll('div.row:not(.header)')){
            t_row.classList.add('dark');
        }
    }
    else{
        darkThemeToggle.innerHTML = '☀️';
        darkThemeToggle.classList.remove('moon');
        darkThemeToggle.classList.add('sun');
        set_theme('light');
        
        for (let t_header of document.querySelectorAll('div.row.header')){
            if (t_header.classList.contains('dark-header'))
                t_header.classList.remove('dark-header');
        }
        for (let t_row of document.querySelectorAll('div.row:not(.header)')){
            if (t_row.classList.contains('dark'))
                t_row.classList.remove('dark');
        }
    }
    body.classList.toggle('body-dark-theme');

    document.querySelector('header').classList.toggle('header-dark-theme'
                                                     );
    for (let card of document.querySelectorAll('.card')){
        card.classList.toggle('card-light-theme');
        card.classList.toggle('card-dark-theme');
    }
});