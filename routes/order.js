//基本ライブラリ読み込み
var express = require('express');
var router = express.Router();
var ioc = require('socket.io-client');	//サーバーからサーバへの通信用に必要

//PHPからのリクエスト
router.use('/', function(req, res) {
	socket = ioc.connect('http://www.les-tournesol.com:7960');	//サーバーへ接続
    //console.log(req.body);
	socket.emit('getorder', req.body);		//PHPデータをサーバーへ転送
	res.send('respond with a resource');		//PHPへレスポンス返却
});

module.exports = router;
