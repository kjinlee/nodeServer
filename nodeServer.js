const http = require('http');

const express = require('express');

const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');

const app = express();

let inputData = { data1: 'node to tomcat testdata1', data2: 'node to tomcat testdata2' };

let opts = {
    host: '52.14.170.10',
    port: 8080,
    method: 'POST',
    path: '/start',
    headers: { 'Content-type': 'application/json' },
    body: inputData

};

let resData = '';

let req = http.request(opts, function (res) {

    res.on('end', function () {

       console.log(resData);
    });

});

opts.headers['Content-type'] = 'application/x-www-form-urlencoded';
req.data = opts;
opts.headers['Content-type'] = req.data.length;

req.on('error', function (err) {
    console.log("에러 발생 : " + err.message);
})

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(function (req, res, next) {

    res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
    res.end('성공적으로 입성');

   var transporter = nodemailer.createTransport({
       service : 'gmail',
       auth: {
           user: "rudwls1378@gmail.com",
           pass: "govl0919@"
       }
   })
   var content = '';
   var mailOption = {
       from: "rudwls1378@gmail.com",
       to: req.body.email,
       subject : "인증해줘~",
       html : "<div align='center' style='border:1px solid black; font-family:verdana'>" 
       + "<h3 style='color: blue;'>" + req.body.name + "님의 임시 비밀번호 입니다. <br/>비밀번호를 변경하여 사용하세요.</h3>" 
       +  "<p>임시 비밀번호 : " + req.body.password + "</p><br/>" 
       + "<a href='http://52.14.170.10:8080/user/loginpage'>로그인하러 가기</a><br/></div>"
   };

   transporter.sendMail(mailOption, function(err, res){
        if(err){
            console.log(err);
        } else {
            console.log("성공");
        }

        transporter.close();
   })


    // jsp로부터 온 내용 
    console.log(req.body.name);
    console.log(req.body.email);
});

req.write(JSON.stringify(req.data.body));

req.end();

// 서버 작동 함수
// 파라미터 
// 1. port : 포트번호
// 2. server : 서버주소
// 3. request clients : 접근 제한
// 4. callback : 콜백함수
http.createServer(app).listen(1516, function(){
    console.log('Server is running');
})