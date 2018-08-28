var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');


//------------------
// 載入資料庫連結
//------------------
var pool = require('./lib/db.js');

//--------------------------------
// 引用multer, easyimg外掛
//-------------------------------- 
var multer  = require('multer');
var easyimg = require('easyimage');

//---------------------------------
// 宣告上傳存放空間及檔名更改
//---------------------------------
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
	    //檔案存在<public>內的<images>中.
        cb(null, 'public\\images');
    },

    filename: function (req, file, cb) {
	    //將檔名前增加時間標記, 避免圖名重覆而被覆蓋.  
        cb(null, Date.now()+"--"+file.originalname);		
    }   
})


/* POST home page. */
router.post('/', function(req, res) {
	//-----------------------------------------------
	// 產生multer的上傳物件
	//-----------------------------------------------
	var maxSize=1*1024*1024;  //設定最大可接受圖片大小(1M)
	
	var upload = multer({
		storage:storage,
		limits:{ fileSize: maxSize }
	}).single('avatar');  //表單中的檔案名稱

    // 上傳檔案
    upload(req, res, function (err) {
		//---------------------
	    // 如果失敗
		//---------------------		
        if (err) {
			var file = req.file;
			res.render('fileUploadFail',{});
            return
        }

		
		//---------------------
		// 如果成功
		//---------------------		
		var filename=null;
		
		if (typeof req.file != 'undefined'){
			//-------------------------------------------------------
			// 顯示成功上傳的圖片資訊
			//-------------------------------------------------------
			var file = req.file;
			console.log('文件類型：%s', file.mimetype);
			console.log('原始文件名：%s', file.originalname);
			console.log('文件大小：%s', file.size);
			console.log('文件保存路徑：%s', file.path);
		
			filename = file.path.replace(/^.*[\\\/]/, '')
			var path=file.path.substring(0, file.path.length-filename.length);
			console.log("僅路徑:", path);
			//-------------------------------------------------------

			
			
			//-------------------------------------------------------	
			// 用easyimg顯示圖片資訊
			//-------------------------------------------------------	
			easyimg.info(file.path).then(
				function(file) {
					console.log(file);
				}, function (err) {
					console.log(err);
				}
			);
			//-------------------------------------------------------

			

			//-------------------------------------------------------	
			// 用easyimg產生小方圖
			//-------------------------------------------------------	
			/*var thembnailName=path+"thumbnail-"+filename;
			
			easyimg.thumbnail({
				src:file.path, 
				dst:thembnailName,
				width:300, height:300,
				x:0, y:0
			}).then(
				function(image) {
					console.log('已產生小方圖: ' + image.width + ' x ' + image.height);
				},
				function (err) {
					console.log(err);
				}
			);	
			//-------------------------------------------------------


			//-------------------------------------------------------	
			// 用easyimg調整大小並裁剪圖片
			//-------------------------------------------------------	
			var cropedName=path+"croped-"+filename;
			
			easyimg.rescrop({
				src:file.path, 
				dst:cropedName,
				width:800, height:550,
				cropwidth:800, cropheight:500,
				x:0, y:0
			}).then(
				function(image) {
					console.log('已產生調整大小並裁剪後的圖片: ' + image.width + ' x ' + image.height);
				},
				function (err) {
					console.log(err);
				}
			);		*/		
			//-------------------------------------------------------
		}
		

		// 上傳成功, 接著取得使用者傳來的參數
		var userid=req.param("userid");
		var nickName=req.param("nickName");
		var sign=req.param("sign");
		var avatar='';
		
		// 設定資料表圖片的名稱 
		if (typeof req.file != 'undefined'){
			avatar="croped-"+filename;      	
		}
		
		// 將更改資料
		pool.query('UPDATE users SET nickName=?, sign=?, avatar=?  ', [nickName, sign, avatar, userid], function(err, rows, fields) {
			if (err){
				//刪除先前已上傳的圖片
				var deleteFile=null;
				
				deleteFile='public/images/' + filename;
				fs.unlink(deleteFile, (err) => {
					if (err) console.log('圖片檔(原圖)未上傳');
					console.log('已刪除圖片檔(原圖)');
				});		
				
				deleteFile='public/images/' + "croped-" + filename;
				fs.unlink(deleteFile, (err) => {
					if (err) console.log('圖片檔(裁剪圖)未上傳');
					console.log('已刪除圖片檔(裁剪圖)');
				});	
				
				var deleteFile='public/images/' + "thumbnail-" + filename;
				fs.unlink(deleteFile, (err) => {
					if (err) console.log('圖片檔(小方圖)未上傳');
					console.log('已刪除圖片檔(小方圖)');
				});	
							
				res.render('personalUpdateFail', {});     //導向更改失敗頁面
			}else{
				res.render('personalUpdateSuccess', {});  //導向更改成功頁面
			}
		});
    })
});

module.exports = router;
