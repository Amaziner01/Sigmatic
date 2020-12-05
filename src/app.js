const express = require('express');
const path = require('path');
const app = express();

//Vars
var port = process.env.PORT || 3000;


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(require('./routes'));

//Serve files
app.use('/public', express.static(path.join(__dirname, 'public')));

//Listen
app.listen(port, ()=>{
    console.log(`Running on port ${port}...`);
});