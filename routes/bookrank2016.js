var express = require('express');
var router = express.Router();
//----------------------------------------------------
// 透過require引用db.js的pool物件,
// 即使多個程式均引用, 在系統中只有一份pool物件.
//----------------------------------------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
   /* pool.query('select * from rankbook', function (error, results, fields) {
        if (error){
            res.render('bookrank', {bookdata:[]});
        }else{
            res.render('bookrank', {bookdata:results});
        } 
	});	*/
	pool.query('SELECT a.rankNo,a.date,a.serNo,b.bookNo,b.bookName,b.picture,b.author,b.publisher,b.content FROM rankbook a INNER JOIN book b ON a.bookNo=b.bookNo WHERE a.date between "2016-01-01" and "2016-12-31" GROUP BY serNo', function(error, rows, fields) {       
		if (error){
			res.render('bookrank2016', {data:[]});
		}else{
			res.render('bookrank2016', {data:rows});
		}		
    });
});

module.exports = router;

//SELECT a.rankNo,a.date,b.bookName,b.picture,b.author,b.publisher,b.content FROM rankbook a INNER JOIN book b ON a.bookNo=b.bookNo WHERE a.date LIKE '2016%'

