var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var HospitalSchema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String},
    registration_number:{type:String},
    mode_of_addmission:{type:String},
    address:{type:Schema.Types.String},
    patient_id:[{type:String}],
    service_id:[{type:String}],
    city:{type:String},
    pin:{type:Number}
    
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
    foreignField: 'service_id',
    justOne: false
})

module.exports=mongoose.model('Hospital',HospitalSchema);