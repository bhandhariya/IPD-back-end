var mongoose=require('mongoose');
var Admin=require('../model/admin');
var passport=require('passport');
require('../config/passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');


var login=function(req,res,next){
    Admin.findOne({username:req.body.username},function(err,admin){
        console.log(err)
        console.log(admin)
        if(err) throw err;
        if(!admin){
            res.json({success: false, message: 'Authentication failed. User not found.'});
        }else{
            if(admin.password==req.body.password){
                var token=jwt.sign(admin,config.secret);
                console.log(token)
             res.json({
                 success:true,
                 data:admin,
                 token:token,
                 message:"login successfull"
             });
            }else{
                 res.json({
                     success:false,
                     message:"wrong password"
                 });
            }
            
        }
    })
}
exports.login=login;