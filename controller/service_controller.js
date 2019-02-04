var Service=require('../model/service_modal');
var Hospital=require('../model/hospital_model');
var Patient=require('../model/patient_model');


exports.createService=function(req,res,next){
    var data=req.body;
    console.log(data);
    Service.create(data,function(err,service){
        if(err){
            return res.send('error')
        }else{
            Hospital.findByIdAndUpdate(service.hospital_id,{
                $push:{service_id:service._id}
            }).exec(function(err,result){
                if(!err && result){
                    res.send('Servicess added SuccessFully')
                }else{
                    res.send('Error in service')
                }
            })
        }
    })
    
}

exports.getAllServicesDetails=function(req,res,next){
    var data=req.body;
    var id=data.id;
    Service.find({hospital_id:id}).exec(function(err,pat){
        if(err){
            console.log('error in finding')
        }else{
            res.send(pat)
        }
    })
}

exports.delete=function(req,res,next){
    // var data=req.body;
    // console.log(data.id);
    
    // Service.find({id:data.id}).remove().exec(function(err,result){
    //     if(!err && result){
    //         res.send('done')
    //     }else{
    //         res.send('not ')
    //     }
    // })
    console.log(req.body.id)
    Service.findByIdAndRemove(req.body.id).exec(function(err,resss){
        if(!err && resss){
            res.send('Service Deleted')
        }else{
            console.log(err)
        }
    })
}

exports.addServicestoPatient=function(req,res,next){
    console.log(req.body)
}

exports.update=function(req,res,next){
    var data=req.body;
    console.log(data)
    Service.findByIdAndUpdate(data.id,{
        $set:{
            name:data.name,
            charge:data.charge
        }
    }).exec(function(err,pat) {
        if(!err && pat){
            res.send('service updated')
        }else{
            return console.log(err)
        }
    })
}

