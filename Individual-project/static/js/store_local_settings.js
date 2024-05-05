"use strict";
const darkThemeToggle = document.getElementById('dark-theme-toggle');
const body = document.body;

function check_theme(){
    let theme = localStorage.getItem('site-theme');
    if (theme == null){
        set_theme('dark');
        theme = 'dark';
    }
    return theme;
}
function set_theme(theme){
    localStorage.setItem('site-theme', theme);
}
