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
    var bookNo=req.param('bookNo');
    var date=new Date();
    pool.query('INSERT INTO collection SET userid=?,bookNo=?,date=?', [userid,bookNo,date], function(err, rows, fields) {
        if (err){
            res.render('bookcolFail', {});     //新增失敗
        }else{
            res.render('bookcolSuccess', {});  //新增成功
        } 
    });

});

module.exports = router;