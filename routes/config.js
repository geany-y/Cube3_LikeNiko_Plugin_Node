var express = require('express');
var setting = require('config');
var router = express.Router();


//クライアント画面の表示
router.post('/', function(req, res) {
  //console.log(setting);
  //setting.config.canvas_height = 100;
  console.log(req.body);
  res.send('respond with a resource');		//PHPへレスポンス返却
});

module.exports = router;
