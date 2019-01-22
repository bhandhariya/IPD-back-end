var mongoose=require('mongoose');
var Manager=require('../model/manager');
var passport=require('passport');
require('../config/passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

var Register=function(req,res,next){
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
      } else {
        var manager = new Manager({
          username: req.body.username,
          password: req.body.password,
          name:req.body.name,
          status:req.body.status,
          email:req.body.email
        });
        // save the user
        manager.save(function(err) {
          if (err) {
            return res.json({success: false, msg: 'Username already exists.'});
          }
          res.json({success: true, msg: 'Successful created new user.'});
        });
      }
}
exports.Register=Register;

var getAllManager=function(req,res,next){
    Manager.find(function(err,result){
        if(err){
            res.send('error');
        }else{
            res.send(result);
        }
    })

}
exports.getAllManager=getAllManager;

var ManagerCount=function(req,res,next){
    Manager.count({}, function(err, count){
         res.json({
             data:count
         });
    });
    
}
exports.ManagerCount=ManagerCount;