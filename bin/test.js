var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/testing-object');
var Schema=mongoose.Schema;

var UserSchema=new mongoose.Schema({
    _id:{type:Schema.Types.ObjectId,required:true},
    name:String
})

var User= mongoose.model('User',UserSchema);

User.create({
    _id:new mongoose.Types.ObjectId,
    name:"raja"
},function(err,pat){

    console.log(pat)
})

