/**
 * Created by Administrator on 2017/8/8 0008.
 */
var express=require('express');
var querystring = require('querystring');
var app=express();
var h=require('http');
var hs=require('https');
var url = require('url');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('content-type', 'text/html;charset=UTF-8');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*

 */

app.get('/api',function(req,res){
     console.log('这是git请求');

     var rawData = '';
     var urlString=req.query.url;
     var result = url.parse(urlString);

     if(result.protocol=='https:'){
        var http=hs;
     }else{
        var http=h;
     }
 
    http.get(req.query.url,function (response) {
       
        response.on('data', function(data){
           rawData+=data;
        });
        response.on('end', function(data){
            res.send(rawData)
        });
    })

})



app.post('/api',function(req,res){
  
  console.log('这是post请求');
  if(req.body.data){
     var postData = req.body.data;
   }

 
    sendData(req, res, postData);
});

app.listen(3000,function(err, res){
    if (err) return console.log(err); 
     console.log('success'); 
});






function sendData(req, res, obj) {

   const data = JSON.stringify(obj);
   let str = '';
   var urlString=req.body.url;
   var result = url.parse(urlString);

   if(result.protocol=='https:'){
      var http=hs;
   }else{
      var http=h;
   }

  var options = {
    hostname: result.hostname,
    port: result.port,
    path: result.path,
    method: 'POST',
    headers: req.body.headers
  };

  var req = http.request(options, (response) => {
    response.setEncoding('utf8'); 
    response.on('data', function(data){
       str+=data;

    });
    response.on('end',function(data){ 
       res.send(str)
    })

  });

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  
  if(data){
      console.log(data)
      req.write(data);
  }
  req.end();

}
