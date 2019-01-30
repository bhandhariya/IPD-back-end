var mongoose=require('mongoose');
var moment=require('moment');
var Schema=mongoose.Schema;
var BillingSchema=new mongoose.Schema({
    billing_date:{type:Schema.Types.Date,default:moment().format('YYYY-MM-DD')},
    patient_id:{type:String},
    hospital_id:{type:String},
    service_id:[String],
    total:{type:Number,required:true}
    
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});


BillingSchema.virtual('hospital',{
    ref: 'Hospital',
    localField: 'hospital_id',
    foreignField: '_id',
    justOne: false
})


BillingSchema.virtual('serviceDetailsssss',{
    ref: 'Service',
    localField: 'service_id',
    foreignField: '_id',
    justOne: false
})


BillingSchema.virtual('patient',{
    ref: 'Patient',
    localField: 'patient_id',
    foreignField: '_id',
    justOne: false
})



module.exports=mongoose.model('Billing',BillingSchema);