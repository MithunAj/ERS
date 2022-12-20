const bodyParser = require('body-parser');
const express = require('express');
const app  = express();
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const mongoStore = require('connect-mongo');
const passportLocalStrategy = require('./config/passport-local-strategy');
const port = 8000;
const db = require('./config/mongoose');
const path = require('path');

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static(path.join(__dirname,'/assets')));
app.use(session({
    name: 'ERS',
    secret: 'SomethingBlah',
    saveUninitialized: false,
    cookie:{
        maxAge : 1000 * 60 * 100
    },
    store: mongoStore.create({
        mongoUrl: 'mongodb+srv://MithunAj:TqZQxDDMNLfQgTiG@cluster0.per79te.mongodb.net/?retryWrites=true&w=majority',
        autoRemove: 'disables'
    },
    function(err){
        console.log(err || 'connect-mongo setup ok')
    }
    
    )
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use('/',require('./routes'));





app.listen(port,function(err){
    if(err){
        console.log('There was an error listening',err);
        return;
    }

    console.log('App is listening on port :',port);
})
