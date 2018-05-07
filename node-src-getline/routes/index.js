var express = require('express');
var http = require('http');
// var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var router = express.Router();
var url = "";
var i = 0;
/* GET home page. */


/* 跨域 */
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Content-Type", "application/json");
    next();
});

router.get('/test', function(req, res, next) {
    res.send("success")
});

router.post('/getText', function(req, ress, next) {
    url = req.body.line;
   //  http://www.baidu.com
   // http://tuijian.hao123.com/hotrank
    if(url.search("http://") == -1){ //非http://
        if(url.search("https://") != -1){
            url = url.replace("https","http")
        }else{
            url = "http://" + url;
        }
    }
    console.log(url)
    http.get(url,function (res) {
        var html = '';

        res.on("data",function (d) {
            html += d;
        })
        res.on('end',function() {
            // ress.send(html)

            var $ = cheerio.load(html); //采用cheerio模块解析html

            var time = $('.article-info a:first-child').next().text().trim();

            var news_item = {
                //获取文章的标题
                title: $('div.article-title a').text().trim(),
                //获取文章发布的时间
                Time: time,
                //获取当前文章的url
                link: "http://www.ss.pku.edu.cn" + $("div.article-title a").attr('href'),
                //获取供稿单位
                author: $('[title=供稿]').text().trim(),
                //i是用来判断获取了多少篇文章
                i: i = i + 1,
            }

            console.log(news_item);

            ress.send(news_item)
        })
    })
});


module.exports = router;
