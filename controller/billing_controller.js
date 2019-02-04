var Billing=require('../model/billing_modal');
var Patient=require('../model/patient_model');


// exports.bill=function(req,res,next){
//     var data=req.body;
//     Billing.create({
//         patient_id:data.pat,
//         hospital_id:data.hos,
//         service_id:data.service_ids
        
//     },function(err,result){
//         if(!err && result){
//             res.send(result)
//         }else{
//             res.send(err)
//         }
//     })


// }

exports.billforpat=function(req,res,next){
    var data=req.body;

    Patient.findById(data.pat_id,function(err,p){
        if(p){
            Billing.create({
                patient_id:p._id,
                hospital_id:p.hospital_id,
                service_id:p.services,
                total:data.total
            },function(err,result){
                if(!err && result){
                    res.send('Billing Added Successfully')
                }else{
                    res.send('err')
                }
            })
        }else{
            res.send(err)
        }
    })

}


exports.dayEndBilling=function(req,res,next){
    var data=req.body;
    Billing.find({
        billing_date:data.billing_date
    }).populate('hospital').populate('serviceDetailsssss').populate('patient').exec(function(err,result){
        if(!err && result){
            // console.log(result)
            res.send(result);
            
        }else{
            res.send('error in finding day end data report please check after some time ')
        }
    })
}