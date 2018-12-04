var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.get('/', function(req, res) {
    //取得使用者傳來的參數
    var bookNo=req.param("bookNo");
    var bookName=req.param("bookName");
    var author=req.param("author");
    var authorIntro=req.param("authorIntro");
    var content=req.param("content");
    var publisher=req.param("publisher");
    var date=req.param("date");
    var language=req.param("language");
    var type=req.param("type");
	var picture=req.param("picture");
	var ISBN=req.param("ISBN");

    //建立一個新資料物件
    var newData={
        bookNo:bookNo,
        bookName:bookName,
        author:author,
        authorIntro:authorIntro,
        content:content,
        publisher:publisher,
        language:language,
		type:type,
		picture:picture,
		ISBN:ISBN
    }	
	
    pool.query('INSERT INTO book SET ?', newData, function(err, rows, fields) {
        if (err){
            res.render('bookAddFail', {});  
            console.log();   //新增失敗
        }else{
            res.render('bookAddSuccess', {});  //新增成功
        }
    });
});

module.exports = router;