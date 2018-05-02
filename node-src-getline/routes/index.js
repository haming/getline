var express = require('express');
var http = require('http');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/getText', function(req, ress, next) {
  console.log(req.body.line)
   // var STR = loadPage(req.body.line)
   //  res.send(STR);
   //  http://www.baidu.com
   // http://tuijian.hao123.com/hotrank

    http.get(req.body.line,function (res) {
        var html = '';

        res.on("data",function (d) {
            html += d;
        })
        res.on('end',function(){
            ress.send(html)
        })
    })

});


module.exports = router;
