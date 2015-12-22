var express = require('express');
var setting = require('config');
var router = express.Router();

//クライアント画面の表示
router.get('/', function(req, res) {
  console.log(setting);
  res.render('index', { 
      url: setting.config.nodeurl + ':' + setting.config.port,
      height: setting.config.canvas_height,
      width: setting.config.canvas_width
  });
});

module.exports = router;
