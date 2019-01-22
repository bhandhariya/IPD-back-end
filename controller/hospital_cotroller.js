var Hospital=require('../model/hospital_model');
var bcrypt=require('bcrypt-nodejs');
var jwt=require('jsonwebtoken');
var config=require('../config/database');


exports.register=function(req,res){
    var data=req.body;
    if(data.username==null && data.name==null && data.password==null){
        res.send('fields can not be blank')
    }else{
        var hash=bcrypt.hashSync(data.password);
        
        data.password=hash;
        Hospital.create(data,function(err,result){
            if(err){
                res.send('fields can not be blank')
            }else{
                res.send('register Successfully')
            }
        })
    }
}

exports.login=function(req,res){
var data=req.body;
console.log(data)
Hospital.findOne({username:req.body.username},function(err,admin){
    // console.log(err)
    // console.log(admin)
    if(err) throw err;
    if(!admin){
        res.send('Authentication failed. User not found.');
    }else{
        var ok=bcrypt.compareSync(req.body.password,admin.password);
        if(ok){
            var token=jwt.sign(admin,config.secret);
            console.log(admin._id)
         res.json({
             token:token,
             id:admin._id,
             msg:'register successfully'
         });
        }else{
            res.send("wrong password");
        }
        
    }
})



}