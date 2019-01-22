var mongoose=require('mongoose');
var AdminSchema=new mongoose.Schema({
    username:{type:String,default:'admin'},
    password:{type:String,default:'admin'}
});

module.exports=mongoose.model('Admin',AdminSchema);