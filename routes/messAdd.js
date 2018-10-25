var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    //取得使用者傳來的參數
    var userid=req.session.userid;
    
    var mesContent=req.param("mesContent");
    var date=new Date();
	
    //建立一個新資料物件
   
	
    pool.query('INSERT INTO message SET userid=? mesContent=?, date=?', [userid,mesContent, date], function(err, rows, fields) {
        if (err){
            res.render('noteAddFail', {});     //新增失敗
        }else{
            res.render('noteAddSuccess', {});  //新增成功
        }
    });
});

module.exports = router;