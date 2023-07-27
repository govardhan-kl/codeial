const express = require('express');
const app = express();
const port = 8002;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('assets'));

app.use(expressLayouts);//need to call before routes are called so that it knows layouts are created

//extracting styles and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//we are telling all get,post etc are doing in below file, use below express Router
app.use('/',require('./routes/index')); //we can give app.use(require('./routes)); by defaultly it will fetch index.js


app.listen(port, function(err){
    if (err){
        console.log(`Error : ${err}`); // to embed variable inside  a string, we use bactick character. this is called interpolation
    }
    console.log(`Server is running on port : ${port}`);
})