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