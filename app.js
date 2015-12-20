var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io');      //socket.ioの読み込み
var http = require('http');
var debug = require('debug')('order_show');

var routes = require('./routes/index');
var order = require('./routes/order');

var app = express();
var server = http.createServer(app);
io = io.listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ルーティング
app.use('/', routes);                       //クライアント表示画面
app.use('/fromorder', order);         //PHPのリクエスト受け付け

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


app.set('port', process.env.PORT || 7960);

//サーバー生成
server.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});


//接続確立時の処理
io.sockets.on('connection', function (socket){
    //PHPからの情報をクライアントへプッシュ
    socket.on('getorder', function(data){
        io.sockets.emit('ordershow', data);
    });
    //切断時の処理
    socket.on('disconnect', function () {
    });
});


module.exports = app;
