const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/Express_folder_structure');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to database'));

db.once('open', function(){
    console.log('succesfull conecction to DB');
});

module.exports = db