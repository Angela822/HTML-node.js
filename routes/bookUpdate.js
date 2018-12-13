var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.post('/', function(req, res) {
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
	
	
    pool.query('UPDATE book SET bookName=?, author=?, publisher=?, date=?, language=?, type=?, picture=?, ISBN=? where bookNo=?', [bookName, author, publisher, date, language, type, picture, ISBN, bookNo], function(err, rows, fields) {
        if (err){
            res.render('bookUpdateFail', {});     //新增失敗
        }else{
            res.render('bookUpdateSuccess', {});  //新增成功
        }
    });
});

module.exports = router;