var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');

/* post home page. */
router.post('/', function(req, res, next) {
    //取得使用者傳來的參數
    var userid=req.param("userid");
    var password=req.param("password");
   // var pswRepeat=req.param("pswRepeat");
    var nickName=req.param("nickName");

    //建立一個新資料物件
    var newData={
        userid:userid,
        password:password,
       /// pswRepeat:pswRepeat,
        nickName:nickName
    }

    pool.query('INSERT INTO users SET ?',newData, function(err, rows, fields) {
        if (err){
            res.render('registerFail', {});     //註冊失敗
        }else{
            res.render('registerSuccess', {});  //註冊成功
        }
    });
});

module.exports = router;