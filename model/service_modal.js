var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ServiceSchema=new mongoose.Schema({
    name:{type:String,required:true},
    charge:{type:Number,required:true},
    hospital_id:{type:String},
    patient_id:[String]
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});


ServiceSchema.virtual('hospitaldetails',{
    ref: 'Hospital',
    localField: 'hospital_id',
    foreignField: 'hospital_id',
    justOne: false
})

ServiceSchema.virtual('patientDetils',{
    ref: 'Patient',
    localField: 'patient_id',
    foreignField: 'services',
    justOne: false
})

module.exports=mongoose.model('Service',ServiceSchema);