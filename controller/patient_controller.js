var Patient=require('../model/patient_model');
var Hospital=require('../model/hospital_model');
var Billing=require('../model/billing_modal')
var mongoose=require('mongoose')
exports.savePatient=function(req,res,next){
    var data=req.body;
    data._id=new mongoose.Types.ObjectId;
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
    Patient.findById(data.id).populate('BillingDetails').exec(function(err,pat){
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

exports.billingdetails=function(req,res,next){
var data=req.body;
console.log(data)
if(data.billID==undefined){
    Billing.create({
        patient_id:data.patientid,
        hospital_id:data.hospitalid,
        service_id:data.serviceid,
        total:data.total
    },function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}else{
    Billing.findByIdAndUpdate(data.billID,{$push:{service_id:data.serviceid}}).populate('serviceDetailsssss').exec(function(err,result){
        if(err){
            res.send(err)
        }else{
            res.send(result)
        }
    })
}

}


exports.getAllSevuceofPateient=function(req,res,next){
    var data=req.body;
    console.log(data)
    Patient.findById(data.id).populate('BillingDetails').exec(function(err,fre){
        if(!err && fre){
            console.log(fre.BillingDetails)
           res.send(fre.BillingDetails)
        }else{
            res.send('error')
        }
    })
}

exports.deleteserviceFromPatient=function(req,res,next){
        
}

exports.findbynameall=function(req,res,next){
    var data=req.body;
    Patient.find({first_name:data.name}).exec(function(err,pat){
        if(!err && pat){
           
            res.send(pat);

        }else{
            res.send('patient not available')
        }
    })
}
exports.findbynumber=function(req,res,next){
    var data=req.body;
    // console.log(data)
    Patient.find({"primary_contact_number":data.number}).exec(function(err,pat){
        if(!err && pat){
        //    console.log(pat)
            res.send(pat);

        }else{
            res.send('patient not available')
        }
    })
}

exports.addServiceToPatient=function(req,res,next){
    var data=req.body;
     console.log(data)
    Patient.findByIdAndUpdate(data.patientid,{$push:{services:data.serviceid}}).populate('BillingDetails').exec(function(err,patser){
        if(err){
            res.send('error')
        }else{
            Patient.findById(data.patientid).populate('BillingDetails').exec(function(err,resss){
                if(resss){
                    res.send(resss)
                }
            })
        }
    })
}

exports.billinggg=function(req,res,next){
    var data=req.body;
     console.log(data)
     var prefix;
     Hospital.findById(data.hos_id).exec(function(err,hospital){
         if(hospital){
             prefix=hospital.invoice_format
         }
     })
     Patient.findByIdAndUpdate(data.patid,{$unset:{services:1}}).exec(function(err,result){
         if(err){
             console.log('err')
         }else{
             if(result){
                 Billing.create({
                    patient_id:data.patid,
                    hospital_id:data.hos_id,
                    services:data.billids,
                    total:data.total,
                    billing_date:data.billing_date

                 },function(err,bill){
                     if(err){
                         res.send('error')
                     }else{
                        Billing.findByIdAndUpdate(bill._id,{invoiceid:prefix+bill.billid}).exec(function(err,billu){
                            if(bill){
                                res.send(billu)
                            }
                        })
                     }
                 })
                 
             }
         }
     })

}

exports.getpatientdata=function(req,res,next){
    var data=req.body;
     Patient.findById(data.id).exec(function(err,pat){
         if(pat){
             res.send(pat)
         }else{
             res.send('error')
         }
     })
    

}



exports.deleteservicebyid=function(req,res,next){
    var data=req.body;
    console.log(data);
    Patient.findByIdAndUpdate(data.patid,{$pull:{services:data.serviceid}}).exec(function(err,pat){
        if(pat){
            res.send('done delitng')
        }
    })
}

exports.quickaddpatient=function(req,res,next){
var data=req.body;
console.log(data);
data._id=new mongoose.Types.ObjectId;
    var patient=new Patient({
        _id:new mongoose.Types.ObjectId,
        first_name:data.first_name,
        hospital_id:data.hosid,
        email:data.email
    })
    patient.save(function(errr,pat){
        if(errr) {
            // console.log(errr)
            console.log(errr)
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