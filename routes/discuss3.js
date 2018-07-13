var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//-----------------
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
   var bookName=req.param('bookName');
   
   pool.query('select * from book where bookName=?',[bookName],  function (err, rows, fields) {
        if (err) throw err;

		if(rows.length==0){
			res.render('DataNotFound', {});         
		}else{
			res.render('discuss3', { data: rows });   
		}	    
    });
});

module.exports = router;
