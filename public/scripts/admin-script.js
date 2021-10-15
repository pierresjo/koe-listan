'use strict';
let socket = io();

window.addEventListener('load', ()=> {

});

socket.on('updateList', (data) => {

    let listholder = document.querySelector('#list');
    listholder.innerHTML = null;

    data.forEach(element => {
        let li = document.createElement('li');
        li.innerHTML = "<b>" + element.grupp + "</b><br>" + element.msg;
        li.classList.add('list-group-item');

        let i = document.createElement('i');
        i.classList.add('fas','fa-trash-alt','float-right');
        i.style.cursor='pointer';
        i.addEventListener('click', remove);

        li.appendChild(i);
        listholder.appendChild(li);
    });

});

function remove(evt) {

    let grupp = evt.target.parentNode.querySelector('b').textContent;

    console.log(grupp);
    socket.emit('deleteGroup', { "grupp": grupp });


}




//Hämtad från w3schoools
//https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}