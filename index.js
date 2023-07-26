const express = require('express');
const app = express();
const port = 8002;


app.listen(port,function(err){
    if (err){
        console.log(`Error : ${err}`); // to embed variable inside  a string, we use bactick character. this is called interpolation
    }
    console.log(`Server is running on port : ${port}`);
})