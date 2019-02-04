var Patient=require('../model/patient_model');
var Hospital=require('../model/hospital_model');
var mongoose=require('mongoose')
exports.savePatient=function(req,res,next){
    var data=req.body;
    data._id=new mongoose.Schema.Types.ObjectId;
    var patient=new Patient({
       _id:new mongoose.Types.ObjectId,
        first_name:data.first_name,
        primary_contact_number:data.primary_contact_number,
        last_name:data.last_name,
        secondary_contact_number:data.secondary_contact_number,
        gender:data.gender,
        email:data.email,
        date_of_birth:data.date_of_birth,
        adhar_number:data.adhar_number,
        present_address:data.present_address,
        permanent_address:data.permanent_address,
        marrital_status:data.marrital_status,
        parent_name:data.parent_name,
        education:data.education,
        occupation:data.occupation,
        identification_mark:data.identification_mark,
        income:data.income,
        town:data.town,
        religion:data.religion,
        country:data.country,
        family_type:data.family_type,
        nationality:data.nationality,
        locality:data.locality,
        info_source:data.info_source,
        hospital_id:data.hospital_id
    })
    patient.save(function(errr,pat){
        if(errr) {
            // console.log(errr)
            res.send('error ')
        }else{
            Hospital.findByIdAndUpdate(pat.hospital_id,{
                $push:{patient_id:pat._id}
            }).exec(function(err,result){
                if(!err && result){
                    res.send('patient add SuccessFully')
                }else{
                    // console.log(err)
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
            res.send('Service Added ')
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