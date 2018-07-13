var express = require('express');
var router = express.Router();
//----------------------------------------------------
// 透過require引用db.js的pool物件,
// 即使多個程式均引用, 在系統中只有一份pool物件.
//----------------------------------------------------
var pool = require('./lib/db.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    var pointData;
    var rankData;
	pool.query('SELECT a.point, a.serNo,b.avatar,b.nickName,c.title,c.picture FROM rankperson a LEFT JOIN users AS b ON a.userid=b.userid LEFT JOIN title AS c ON c.userid=b.userid WHERE a.serNo%2<>0 ', function(err, results) {       
		if (err) {
			pointData=[];
		}else{
			pointData=results;
		}
        pool.query('SELECT a.point, a.serNo,b.avatar,b.nickName,c.title,c.picture FROM rankperson a LEFT JOIN users AS b ON a.userid=b.userid LEFT JOIN title AS c ON c.userid=b.userid WHERE a.serNo%2=0', function(err, results) {
            if (err) {
                rankData=[];
            }else{
                rankData=results;
            }

            //---------------------------------   
            // 將供應商及產品型態資料一起送出
            //---------------------------------
            res.render('userpointrank', {pointData:pointData, rankData:rankData});
       }); 
			
    });
});

module.exports = router;