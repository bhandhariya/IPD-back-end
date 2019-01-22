var mongoose=require('mongoose');
var Manager=require('../model/manager');
var passport=require('passport');
require('../config/passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

var login=function(req,res,next){
    Manager.findOne({
        username: req.body.username
      }, function(err, user) {
        if (err) throw err;
    
        if (!user) {
          res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              var token = jwt.sign(user, config.secret);
              // return the information including token as JSON
              res.json({success: true, token: 'JWT ' + token,msg:'succesfully login',data:user});
            } else {
              res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
            }
          });
        }
      });
}
exports.login=login;

var deleteManager=function(req,res,next){
  Manager.deleteOne({_id:req.body._id},function(err,result){
    if(err){
      res.send('error in deleting');
    }else{
      res.send('ok user deleted Successfully');
    }
  })
  
}
exports.deleteManager=deleteManager;