var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors');

const products = require("./routes/products");
const useraccounts = require("./routes/user_accounts");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(cors());

///''''GET''''///
app.get('/products', products.findAll);
app.get('/products/votes', products.findTotalVotes);
app.get('/products/:id', products.findOne);
app.get('/products/getByName/:productname', products.findProductByName);
app.get('/fuzzy/:productname', products.findFuzzyName);
app.get('/useraccounts', useraccounts.findAll);

///''''POST''''///
app.post('/products/addProduct', products.addProduct);
app.post('/products/:id/addSpecs', products.addSpecs);
app.post('/useraccounts/addUser', useraccounts.addUser);

///''''PUT''''///
app.put('/products/:id/vote', products.incrementUpvotes);
app.put('/products/:id/downvote', products.downvote);
app.put('/useraccounts/:username/', useraccounts.changeUsername);

///''''DELETE''''///
app.delete('/products/delete/:id', products.deleteProduct);
app.delete('/useraccounts/delete/:id', useraccounts.deleteUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
