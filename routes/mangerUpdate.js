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
    var mangerId=req.param("mangerId");
    var mangerName=req.param("mangerName");
    	
    pool.query('UPDATE manger SET mangerName=? where mangerId=?', [mangerName,mangerId], function(err, rows, fields) {
        if (err){
            res.render('mangerUpdateFail', {});     //新增失敗
        }else{
            res.render('mangerUpdateSuccess', {});  //新增成功
        }
    });
});

module.exports = router;