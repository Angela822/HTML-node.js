var express = require('express');
var router = express.Router();
//----------------------------------------------------
// 透過require引用db.js的pool物件,
// 即使多個程式均引用, 在系統中只有一份pool物件.
//----------------------------------------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	var bookNo=req.param('bookNo');
    var bookData;
    var noteData;
	pool.query('SELECT * From book where bookNo=?  ',[bookNo],  function (err, results, fields) {       
		if (err) {
			bookData=[];
		}else{
			bookData=results;
		}
		
        pool.query('SELECT a.noteContent,a.noteTitle,a.noteId,b.nickName,b.avatar,c.bookName,c.bookNo,c.author,c.publisher,c.date,c.type,c.language,c.picture,c.authorIntro,c.content FROM note a LEFT JOIN users AS b ON a.userid=b.userid LEFT JOIN book AS c ON c.bookNo=a.bookNo where c.bookNo=?  GROUP BY noteId',[bookNo],  function (err, rows, fields){
            if (err) {
                noteData=[];
            }else{
                noteData=results;
            }

            //---------------------------------   
            // 將供應商及產品型態資料一起送出
            //---------------------------------
            res.render('discuss3', {bookData:bookData, noteData:noteData});
       }); 
			
    });
});

module.exports = router;