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
    var ruleContent=req.param("ruleContent");

    //建立一個新資料物件
    var newData={
        serNo:serNo,
        ruleContent:ruleContent,
    }   

    pool.query('INSERT INTO rule SET ?', newData, function(err, rows, fields) {
        if (err){
            res.render('ruleAddFail', {});     //新增失敗
        }else{
            res.render('ruleAddSuccess', {});  //新增成功
        }
    });
});

module.exports = router;