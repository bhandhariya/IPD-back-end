var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ServiceSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    charge:{type:Number,required:true,unique:true},
    hospital_id:{type:String}
    
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

module.exports=mongoose.model('Service',ServiceSchema);