require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Conected MongoDB');
        app.emit('start');
    })
    .catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const csrf = require('csurf');
const routes = require('./routes');
const { csrfErrorMiddleware, csrfMiddleware, globalMiddleware} = require('./src/middlewares/middleware');
const path = require('path');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));
const sessionOption = session({
    secret: 'fjdlaçfça',
    store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*30,
        httpOnly: true
    }
});
app.use(sessionOption);
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(flash());
app.use(csrf());

app.use(csrfMiddleware);
app.use(csrfErrorMiddleware);
app.use(globalMiddleware);


app.use(routes);

app.on('start', ()=> {
    app.listen(3000, ()=> {
        console.log('http://localhost:3000')
    });
});
