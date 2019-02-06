var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var HospitalSchema=new mongoose.Schema({
    _id:{type:Schema.Types.ObjectId,required:true},
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String},
    number:{type:Number},
    registration_number:{type:String},
    mode_of_addmission:{type:String},
    address:{type:Schema.Types.String},
    patient_id:[{type:String}],
    service_id:[{type:String}],
    city:{type:String},
    pin:{type:Number},
    state:{type:String}
    
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});


HospitalSchema.virtual('patientsDetails',{
    ref: 'Patient',
    localField: 'patient_id',
    foreignField: 'hospital_id',
    justOne: false
})

HospitalSchema.virtual('serviceDetails',{
    ref: 'Service',
    localField: 'service_id',
    foreignField: '_id',
    justOne: false
})

HospitalSchema.virtual('hosdetails',{
    ref: 'Billing',
    localField:'_id',
    foreignField:'hospital_id'
})

module.exports=mongoose.model('Hospital',HospitalSchema);