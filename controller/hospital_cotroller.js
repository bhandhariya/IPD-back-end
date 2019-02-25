var Hospital=require('../model/hospital_model');
var bcrypt=require('bcrypt-nodejs');
var jwt=require('jsonwebtoken');
var config=require('../config/database');
var mongoose=require('mongoose');

exports.register=function(req,res){
    var data=req.body;
    console.log(data)
    if(data.username==null && data.name==null && data.password==null){
        res.send('fields can not be blank')
    }else{
        var hash=bcrypt.hashSync(data.password);
        data._id=new mongoose.Types.ObjectId;
        data.password=hash;
        Hospital.create(data,function(err,result){
            if(err){
                res.send(err)
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
    console.log(err)
    console.log(admin)
    if(err) throw err;
    if(!admin){
        res.send('Authentication failed. User not found.');
    }else{
        var ok=bcrypt.compareSync(req.body.password,admin.password);
        if(ok){
            var token=jwt.sign(admin,config.secret);
            console.log(token)
            console.log(admin._id)
         res.json({
             token:token,
             id:admin._id,
             msg:'Hospital  register successfully'
         });
        }else{
            res.send("wrong password");
        }
        
    }
})



}


exports.getName=function(req,res,next){
    var data=req.body;
    Hospital.findById(data.id,function(err,result){
        if(!err && result){
            res.send(result)
        }else{
            res.send('error')
        }
    })
}

// exports.getAddress=function(req,res,next){
//     var data=req.body;
//     Hospital.findById(data.id,function(err,result){
//         if(!err && result){
//             res.send(result.address)
//         }else{
//             res.send('error')
//         }
//     })
// }


exports.getAllService=function(req,res,next){
    var data=req.body;
    Hospital.findById(data.id).populate('serviceDetails').exec(function(err,result){
        res.send(result.serviceDetails)
    })
}

exports.edit=function(req,res,next){
    var data=req.body;
    console.log(data)
}

exports.addprefix=function(req,res,next){
    var data=req.body;
    Hospital.findByIdAndUpdate(data.id,{invoice_format:data.invoice_format}).exec(function(err,hos){
        if(err){
            res.send('can not  update')
        }else{
            res.send('updated ')
        }
    })
}

exports.findprefix=function(req,res,next){
    var data=req.body;
    Hospital.findById(data.id,function(err,responce){
        if(err){
            res.send('err')
        }else{
            res.send(responce)
        }
    })
}