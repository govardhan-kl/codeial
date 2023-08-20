const express = require('express');
const cookie = require('cookie-parser')
const app = express();
const port = 8002;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

const session = require('express-session');// this is for encrption
const passport = require('passport');//press ctrl + space to get autosuggestion
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const MongoStore = require('connect-mongo');// this is for adding cookies to db so that whnever server restarts the session doesnt expire


app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(express.static('assets'));

app.use(expressLayouts);//need to call before routes are called so that it knows layouts are created

//extracting styles and scripts from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//we are doing encrption and setting age for cookie
app.use(session({
    name:"codeial",
    secret: 'blahsomething',
    saveUninitialized: false, //this is for when a request is called without any login then we don't need to save any cokkie
    resave: false, //this is for when a request comes do we need to reqwite the session cokkies everytime
    cookie: {
        maxAge:(1000 * 60 *100)
    },
    store: new MongoStore( //this adds the session to DB
        {
            // mongooseConnection: db,
            autoRemove: 'disabled',
            mongoUrl: "mongodb://0.0.0.0:27017/Express_folder_structure"
        },
        function(err){
            console.log(err || "connect mongodb setup ok")
        }
    )
}));

//we are telling the app to use paasport
app.use(passport.initialize()); 
app.use(passport.session()); //for maintaining sessions
app.use(passport.setAuthenticatedUser)

app.use(flash());
app.use(customMware.setFlash);

//we are telling all get,post etc are doing in below file, use below express Router
app.use('/',require('./routes/index')); //we can give app.use(require('./routes)); by defaultly it will fetch index.js


app.listen(port, function(err){
    if (err){
        console.log(`Error : ${err}`); // to embed variable inside  a string, we use bactick character. this is called interpolation
    }
    console.log(`Server is running on port : ${port}`);
})