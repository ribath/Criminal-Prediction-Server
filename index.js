var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'))

app.get('/', function(req, res){
   res.send("Hello Mr!");
});

var con = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "case_management_db"
 });
 
 con.connect(function(err) {
   if (err) {
      console.log("[mysql error]",err);
   }
   else
      console.log("Connected!");
 });

 // create user api
 app.post('/create-user', function(req, res, next){    
   let response = {status: 200,  message: "", data: {}};
   if(req.body.user_name == "" || req.body.user_name == null){
      msg = 'give username';
      response.message = msg;
      res.send(response.status, response);
      next();
   }else if(req.body.email == "" || req.body.email == null){
      msg = 'give email';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.mobile_number == "" || req.body.mobile_number == null){
      msg = 'give mobile number';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.area == "" || req.body.area == null){
      msg = 'select an area';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.password == "" || req.body.password == null){
      msg = 'give password';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if((req.body.is_general == "" || req.body.is_general == null)
          && (req.body.is_officer == "" || req.body.is_officer == null)
         && (req.body.is_admin == "" || req.body.is_admin == null)){
      msg = 'select a user type';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else
   {
     console.log("username : ", req.body.user_name);
     var sql = "INSERT INTO user (user_name, email, mobile_number, area, address, password, is_general, is_officer, is_admin) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";
     con.query(sql, [req.body.user_name, req.body.email, req.body.mobile_number, req.body.area, req.body.address, req.body.password, req.body.is_general, req.body.is_officer, req.body.is_admin], function (err, result) {
      if (err) {
         msg = err;
         response.message = msg.sqlMessage;
         res.send(response.status, response);
         next();
      }
      else{
         console.log("1 record inserted into user table");
         msg = 'user registration successful';
         response.message = msg;
         user = {"user": req.body}
         response.data = user;
         res.send(response.status, response);
         next();
      }
    });
   } 
});

// user login api
app.post('/user-login', function(req, res, next){    
   let response = {status: 200,  message: "", data: {}};
   if(req.body.mobile_number == "" || req.body.mobile_number == null){
      msg = 'give mobile number';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.password == "" || req.body.password == null){
      msg = 'give password';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else
   {
     console.log("username : ", req.body.user_name);
     var sql = "SELECT * FROM user WHERE mobile_number=? AND password=?";
     con.query(sql, [req.body.mobile_number, req.body.password], function (err, result) {
      if (err) {
         msg = err;
         response.message = msg.sqlMessage;
         res.send(response.status, response);
         next();
      }
      else{
         if(result.length==1){
            console.log("user found : ", result.user_name);
            if(result[0].is_general==1){
               msg = 'general user found';
               response.message = msg;
               user = {"user": result[0]}
               response.data = user;
            }
            else if(result[0].is_officer==1){
               msg = 'officer found';
               response.message = msg;
               user = {"user": result[0]}
               response.data = user;
            }
            else if(result[0].is_admin==1){
               msg = 'admin found';
               response.message = msg;
               user = {"user": result[0]}
               response.data = user;
            }
         }
         else{
            msg = 'no match found';
            response.message = msg;
         }
         res.send(response.status, response);
         next();
      }
    });
   } 
});

// submit case api
app.post('/post-case', function(req, res, next){    
   let response = {status: 200,  message: "", data: {}};
   if(req.body.case_type == "" || req.body.case_type == null){
      msg = 'give case type';
      response.message = msg;
      res.send(response.status, response);
      next();
   }else if(req.body.used_method == "" || req.body.used_method == null){
      msg = 'give used method';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.victim_name == "" || req.body.victim_name == null){
      msg = 'give victim name';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.victim_sex == "" || req.body.victim_sex == null){
      msg = 'give victim sex';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.division == "" || req.body.division == null){
      msg = 'give division';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.area == "" || req.body.area == null){
      msg = 'give area';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.filed_by == "" || req.body.filed_by == null){
      msg = 'filed by cannot be empty';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.suspect_race == "" || req.body.suspect_race == null){
      msg = 'suspect race cannot be empty';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else if(req.body.suspect_sex == "" || req.body.suspect_sex == null){
      msg = 'suspect sex cannot be empty';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else
   {
     console.log("case_type : ", req.body.case_type);
     var sql = "INSERT INTO `case` (case_type, used_method, victim_name, victim_sex, division, area, filed_by, suspect_race, suspect_sex) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)";
     con.query(sql, [req.body.case_type, req.body.used_method, req.body.victim_name, req.body.victim_sex, req.body.division, req.body.area, req.body.filed_by, req.body.suspect_race, req.body.suspect_sex], function (err, result) {
      if (err) {
         msg = err;
         response.message = msg.sqlMessage;
         res.send(response.status, response);
         next();
      }
      else{
         console.log("1 record inserted into case table");
         msg = 'case submition successful';
         response.message = msg;
         case_info = {"case": req.body}
         response.data = case_info;
         response.data = req.body;
         res.send(response.status, response);
         next();
      }
    });
   } 
});

// get all case in list api
app.get('/get-cases', function(req, res, next){
   let response = {status: 200,  message: "", data: {}};
   var sql = "SELECT * FROM `case`";
     con.query(sql, function (err, result) {
      if (err) {
         msg = err;
         response.message = msg.sqlMessage;
         res.send(response.status, response);
         next();
      }
      else{
         console.log("result : ", result);
         if(result.length>0){
            msg = 'case list';
            response.message = msg;
            response.data = {"cases":result};
         }
         else{
            msg = 'no list found';
            response.message = msg;
         }
         res.send(response.status, response);
         next();
      }
    });
});

// get all officer in list api
app.get('/get-officers', function(req, res, next){
   let response = {status: 200,  message: "", data: {}};
   var sql = "SELECT user_name, mobile_number, email, area FROM user where is_officer=1";
     con.query(sql, function (err, result) {
      if (err) {
         msg = err;
         response.message = msg.sqlMessage;
         res.send(response.status, response);
         next();
      }
      else{
         console.log("result : ", result);
         if(result.length>0){
            msg = 'officers list';
            response.message = msg;
            response.data = {"officers":result};
         }
         else{
            msg = 'no list found';
            response.message = msg;
         }
         res.send(response.status, response);
         next();
      }
    });
});

// assign officer to a case api
app.post('/assign-officer', function(req, res, next){    
   let response = {status: 200,  message: "", data: {}};
   if(req.body.case_id == "" || req.body.case_id == null){
      msg = 'give case id';
      response.message = msg;
      res.send(response.status, response);
      next();
   }else if(req.body.officer_mobile_number == "" || req.body.officer_mobile_number == null){
      msg = 'give officer mobile number';
      response.message = msg;
      res.send(response.status, response);
      next();
   }
   else
   {
     console.log("case_id : ", req.body.case_id);
     var sql = "UPDATE `case` SET assigned_to = ? WHERE case_id = ?";
     con.query(sql, [req.body.officer_mobile_number, req.body.case_id], function (err, result) {
      if (err) {
         msg = err;
         response.message = msg.sqlMessage;
         res.send(response.status, response);
         next();
      }
      else{
         console.log("case assigned to officer");
         msg = 'case assigned to officer successfully';
         response.message = msg;
         response.data = req.body;
         res.send(response.status, response);
         next();
      }
    });
   } 
});

// get criminal suggestion
app.get('/get-criminal-prediction', function(req, res, next){
   let response = {status: 200,  message: "", data: {}};
   console.log("case id = ", req.query.case_id);
   let sql = "SELECT * FROM `case` WHERE case_id=?";
   con.query(sql, req.query.case_id, function (err, result1) {
      if (err) {
         msg = err;
         response.message = msg.sqlMessage;
         res.send(response.status, response);
         next();
      }
      else{
         console.log("result : ", result1);
         var sql = "SELECT * FROM `criminal` WHERE sex=? AND race=? AND crime_type=? AND division=? AND area=? AND method=?";
         con.query(sql, [result1.suspect_sex, result1.suspect_race, result1.case_type, result1.division, result1.area, result1.used_method], function (err, result2) {
            if (err) {
               msg = err;
               response.message = msg.sqlMessage;
               res.send(response.status, response);
               next();
            }
            else{
               let result = Object.values(JSON.parse(JSON.stringify(result2)))
               console.log("result : ", result);
               if(result.length>0){
                  msg = 'suspected criminals list';
                  response.message = msg;
                  response.data = {"criminals": result};
               }
               else{
                  msg = 'no list found';
                  response.message = msg;
               }
               res.send(response.status, response);
               next();
            }
         });  
      }
    });
});

app.listen(3000);