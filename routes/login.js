var express = require('express');
var router = express.Router();
var mysql = require('mysql');

//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');


/* POST home page. */
router.post('/', function(req, res, next) {
    //取得使用者傳來的參數
    var userid=req.param("userid");
    var password=req.param("password");
    var nickName=req.param("nickName");

    pool.query('select * from users where userid=? and password=?', [userid, password], function(err, rows, fields) {
        if (err){
		    //如果失敗, 清除session中的資訊.
            req.session.loginPass=false;
			req.session.userNo=''; 
            req.session.userid=''; 
            res.render('loginFail', {});
		}else if(rows.length==0){
		    //如果帳/密不符, 清除session中的資訊.		
            req.session.loginPass=false;
			req.session.userNo=''; 
            req.session.userid=''; 		
            res.render('loginFail', {});
        }else{	
		    //如果成功, 將登入者姓名記錄在session中.
            req.session.loginPass=true;
            req.session.userNo=rows[0].userNo; 
            req.session.userid=rows[0].userid; 
            req.session.nickName=rows[0].nickName; 		
            res.redirect('/loginSuccess');
		}
    });
});

module.exports = router;