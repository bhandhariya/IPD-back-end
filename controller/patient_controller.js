var Patient=require('../model/patient_model');
var Hospital=require('../model/hospital_model');
exports.savePatient=function(req,res,next){
    var data=req.body;
    // console.log(data);
    Patient.create(data,function(err,pat){
        if(err) {
            res.send('error ')
        }else{
            Hospital.findByIdAndUpdate(pat.hospital_id,{
                $push:{patient_id:pat._id}
            }).exec(function(err,result){
                if(!err && result){
                    res.send('patient add SuccessFully')
                }else{
                    res.send('Error in patient')
                }
            })
        }
    })
    
}

exports.getAllPatientsDetails=function(req,res,next){
    var data=req.body;
    var id=data.id;
    Patient.find({hospital_id:id}).exec(function(err,pat){
        if(err){
            console.log('error in finding')
        }else{
            res.send(pat)
        }
    })
}

exports.getonePatdetils=function(req,res,next){
    var data=req.body;
    Patient.findById(data.id).exec(function(err,pat){
        if(!err && pat){
            res.send(pat)
        }else{
            res.send('error')
        }
    })
}

exports.addService=function(req,res,next){
    console.log(req.body);
    Patient.update({_id:req.body.pat_id},{
        $push:{
            services:req.body.service_id
        }
    }).exec(function(err,ress){
        if(err){
            res.send(err)
        }else{
            res.send('done ')
        }
    })
}


exports.getAllSevuceofPateient=function(req,res,next){
    var data=req.body;
    Patient.findById(data.id).populate('BillingDetails').exec(function(err,fre){
        if(!err && fre){
           res.send(fre.BillingDetails)
        }else{
            res.send('error')
        }
    })
}

exports.deleteserviceFromPatient=function(req,res,next){
        
}