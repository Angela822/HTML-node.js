var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//-----------------
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var userid=req.session.userid;
   var bookName=req.param('bookName');
   
   pool.query('SELECT a.noteContent,a.noteTitle,a.noteId,b.nickName,b.avatar,c.bookName,c.bookNo,c.type,c.author,c.publisher,c.date,c.language,c.picture,c.authorIntro,c.content FROM note a LEFT JOIN users AS b ON a.userid=b.userid LEFT JOIN book AS c ON c.bookNo=a.bookNo where bookName=?  GROUP BY noteId',[bookName],  function (err, rows, fields) {
        if (err) throw err;

		if(rows.length==0){
			res.render('DataNotFound', {});         
		}else{
			res.render('userDiscuss2', {userid:req.session.userid, nickName:req.session.nickName, sign:req.session.sign, avatar:req.session.avatar,data: rows });   
		}	
	    
    });
});

module.exports = router;
