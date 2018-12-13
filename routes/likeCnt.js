var express = require('express');
var router = express.Router();
//var mysql = require('mysql');

//------------------
// 載入資料庫連結
//-----------------
var pool = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
   pool.query('SELECT a.noteContent,b.nickName,b.avatar,c.bookName,c.content FROM note a LEFT JOIN users AS b ON a.userid=b.userid LEFT JOIN book AS c ON c.bookNo=a.bookNo', function (error, results, fields) {
        if (error){
            res.render('discuss', {data:[]});
        }else{
            res.render('discuss', {data:results});
        }       
    });
});

router.post("/index/:userid", function (req, res) {
    TestData.findById(req.params.userid, function (err, theUser) {
        if (err) {
            console.log(err);
        } else {
            theUser.likes += 1;
            theUser.save();
            console.log(theUser.likes);
            res.send({likeCount: theUser.likes}); //something like this...
        }
    });
});

module.exports = router;
