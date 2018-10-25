var express = require('express');
var router = express.Router();
//----------------------------------------------------
// 透過require引用db.js的pool物件,
// 即使多個程式均引用, 在系統中只有一份pool物件.
//----------------------------------------------------
var pool = require('./lib/db.js');
//----------------------------------------------
// 載入使用權檢查
//----------------------------------------------
var authorize = require('./lib/authorize.js');
//----------------------------------------------

/* GET home page. */
router.get('/', function(req, res, next) {
    var userid=req.session.userid;
    var personalData;
    var noteData;
    var messengeData;
    var bookData;
    
    //------------------------------------------
    // 如尚未登入, 轉至未登入頁面
    //------------------------------------------
    if(!authorize.isPass(req)){
        res.render(authorize.illegalURL, {});
        return;
    }
    //------------------------------------------

    pool.query('select * from users', function(err, results) {       
        if (err) {
            personalData=[];
        }else{
            personalData=results;
        }
        pool.query('SELECT a.bookNo,a.noteId,a.noteContent,a.noteTitle,a.date,b.picture FROM note a LEFT JOIN book AS b ON a.bookNo=b.bookNo where userid=? GROUP BY noteId', [userid], function(err, results, fields) {
            if (err) {
                noteData=[];
            }else{
                noteData=results;
            }

        pool.query('SELECT a.mesContent, a.date,b.nickName,b.avatar,c.noteTitle FROM message a LEFT JOIN users AS b ON a.userid=b.userid LEFT JOIN note AS c ON c.userid=b.userid where c.userid=? ', [userid], function(err, results, fields){
            if (err) {
                messengeData=[];
            }else{
                messengeData=results;
            }
			
		pool.query('select * from book', function(err, results) {       
        if (err) {
            bookData=[];
        }else{
            bookData=results;
        }
		
		pool.query('SELECT bookName,picture,SUBSTRING(content,1,30),1,30 FROM book ORDER BY RAND() LIMIT 1', function(err, results, fields) {
            if (err) {
                booksData=[];
            }else{
                booksData=results;
            }
		
		res.render('personal3', {userid:req.session.userid, nickName:req.session.nickName, sign:req.session.sign, avatar:req.session.avatar,personalData:personalData,noteData:noteData, messengeData:messengeData, bookData:bookData});
		});
		});
		});
    });
  });
});

module.exports = router;
