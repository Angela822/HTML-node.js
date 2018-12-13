var fs = require('fs');

var key = fs.readFileSync('./ssl/private.key');
var cert = fs.readFileSync('./ssl/certificate.crt');
var ca = fs.readFileSync('./ssl/ca_bundle.crt');

var options = {
  key: key,
  cert: cert,
  ca: ca
};

function setSSL(app){
	var https = require('https');
	https.createServer(options, app).listen(443);

	var http = require('http');
	http.createServer(app).listen(80);
}

module.exports=setSSL