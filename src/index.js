const express=require('express');
const morgan=require('morgan');
const exphbs=require('express-handlebars');
const path=require('path');

const session=require('express-session');
const passport=require('passport');


//  Initialization
const app=express();
require('./lib/passport'); //para login

//  Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//  Middlewares
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//  log
app.use(passport.initialize());
app.use(passport.session());

//  Global variables
app.use((req, res, next) => {
    app.locals.user=req.user;
    next();
});

//  Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));

//  Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port: ' + app.get('port'));
});