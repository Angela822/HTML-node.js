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
    var noteId=req.param("noteId");
   
    var noteContent=req.param("noteContent");
    var date=new Date();
	
    //建立一個新資料物件
   
	
    pool.query('UPDATE note SET  noteContent=?, date=? where noteId=?', [ noteContent, date,noteId], function(err, rows, fields) {
        if (err){
            res.render('noteEditFail', {});     //新增失敗
        }else{
            res.render('noteEditSuccess', {});  //新增成功
        }
    });
});

module.exports = router;