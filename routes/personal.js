var express = require('express');
var router = express.Router();
//----------------------------------------------------
// 透過require引用db.js的pool物件,
// 即使多個程式均引用, 在系統中只有一份pool物件.
//----------------------------------------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
	var personalData;
    var messengeData;
	var bookData;

    pool.query('select * from users', function(err, results) {       
        if (err) {
            personalData=[];
        }else{
            personalData=results;
        }

        pool.query('SELECT a.mesContent, a.date,b.nickName,b.avatar,c.notetitle,c.picture FROM message a LEFT JOIN users AS b ON a.userid=b.userid LEFT JOIN note AS c ON c.userid=b.userid', function(err, results) {
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
		
		res.render('personal', {personalData:personalData, messengeData:messengeData, bookData:bookData});
		});
		});
    });
});

module.exports = router;
