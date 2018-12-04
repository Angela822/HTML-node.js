var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//----------------
// 引用db.js
//----------------
var pool = require('./lib/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	//------------------------
	// 取得使用者輸入的參數
	//------------------------
	var serNo=req.query.serNo.trim();
	
	
	//------------------------
	// 讀取資料庫內容
	//------------------------	
    pool.query('select * from rule where serNo=?', [serNo], function(err, results) {
        if (err)throw err;

        if(results.length==0){
            res.render('dataNotFound', {});
        }else{
            res.render('ruleModifyForm', {data:results});  
        }  
    }); 
});

module.exports = router;