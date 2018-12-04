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
    var serNo=req.param("serNo");

    pool.query('delete from rule where serNo = ?', [serNo], function(err, result) {
        if (err){
            res.render('ruleDeleteFail', {});      //刪除失敗
        }else if(result.affectedRows==0){            
            res.render('ruleDeleteFail', {});      //無資料被刪除
        }else{
            res.render('ruleDeleteSuccess', {});   //刪除成功
        }
    });
});

module.exports = router;