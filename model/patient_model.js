var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var PatientSchema=new mongoose.Schema({
    _id:{type:Schema.Types.ObjectId,required:true},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    parent_name:{type:String},
    age:{type:String},
    gender:{type:String},
    identification_mark:[{type:String}],
    nominated_representative_name:{type:String},
    advance_directive:{type:Boolean},
    date_of_addmission:{type:Schema.Types.Date},
    date_of_discharge:{type:Schema.Types.Date},
    date_of_birth:{type:Schema.Types.Date},
    present_address:{type:Schema.Types.String},
    permanent_address:{type:Schema.Types.String},
    primary_contact_number:{type:String},
    secondary_contact_number:{type:String},
    email:{type:String,unique:true},
    adhar_number:{type:Number},
    hospital_id:String,
    services:[{type:String,unique:true}],
    service:[
        {name:String,
        charge:Number}
    ],
    education:{type:String},
    marrital_status:{type:String},
    nationality:{type:String},
    info_source:{type:String},
    locality:{type:String},
    family_type:{type:String},
    country:{type:String},
    religion:{type:String},
    town:{type:String},
    income:{type:String},
    occupation:{type:String}
    
},{
    toObject:{virtuals:true},
    toJSON:{virtuals:true}
});

PatientSchema.virtual('hospitalDetails',{
    ref: 'Hospital',
    localField: 'hospital_id',
    foreignField: 'patient_id',
    justOne: false
})
PatientSchema.virtual('BillingDetails',{
    ref: 'Service',
    localField: 'services',
    foreignField: '_id',
    justOne: false
})




module.exports=mongoose.model('Patient',PatientSchema);