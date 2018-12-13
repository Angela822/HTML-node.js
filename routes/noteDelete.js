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
    var noteid=req.param("noteid");
	
    //建立一個新資料物件

	
	//刪除資料庫內容
    pool.query('DELETE FROM note where noteid=?', [noteid], function(err, rows, fields) {
        if (err){
            res.render('noteDelFail', {});     //刪除失敗
        }else{
            res.render('noteDelSuccess', {});  //刪除成功
        }
    });
});

module.exports = router;