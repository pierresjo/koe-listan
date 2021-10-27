'use strict';
let socket = io();

window.addEventListener('load', ()=> {

    document.querySelector('.btn-danger').addEventListener('click', (evt)=>{
        
        evt.preventDefault();
        let msg = document.querySelector('#msg').value;
        //console.log(msg);
        try {
            if (msg.length < 5) throw 'Skriv ärende...';

            let que = document.querySelectorAll('li');

            let grp = decodeURI(getCookie('nickName'));
            console.log(grp);
            que.forEach((element)=> {
                console.log(element.textContent);
                if(element.textContent === grp) throw 'Du väntar redan på hjälp';
            });

            socket.emit('addGroup', { "msg": msg });

            document.querySelector('#msg').value='';

        }
        catch(ex) {
            alert(ex);
        }
        
    });

});

socket.on('updateList', (data) => {

    let listholder = document.querySelector('#list');
    listholder.innerHTML = null;
    listholder.style.listStyleType = 'decimal';

    data.forEach(element => {
        let li = document.createElement('li');
        li.textContent = element.grupp;
        li.classList.add('list-group-item');       
        listholder.appendChild(li);
    });

});


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