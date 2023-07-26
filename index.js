const express = require('express');
const app = express();
const port = 8002;

app.set('view engine', 'ejs');
app.set('views', './views');

//we are telling all get,post etc are doing in below file, use below express Router
app.use('/',require('./routes/index')); //we can give app.use(require('./routes)); by defaultly it will fetch index.js


app.listen(port,function(err){
    if (err){
        console.log(`Error : ${err}`); // to embed variable inside  a string, we use bactick character. this is called interpolation
    }
    console.log(`Server is running on port : ${port}`);
})