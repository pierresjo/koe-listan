'use strict';
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cookieParser = require('cookie-parser');
const io = require('socket.io')(http);
const mymodule = require('./my-module.js');
let que = [];

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

let server = http.listen(80, () => {
    console.log('server is running on port ' + server.address().port);
});

/*
app.get('/', function(req,res) {
        //res.sendFile(__dirname + '/index.html');     
}); 
*/