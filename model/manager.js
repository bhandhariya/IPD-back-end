var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs')

var ManagerSchema=new mongoose.Schema({
    name:{type:String,default:''},
    username:{type:String,default:'',required:true,unique:true},
    email:{type:String,default:'',required:true,unique:true},
    status:{type:String,default:'',required:true},
    password:{type:String,required:true}
})

ManagerSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

ManagerSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports=mongoose.model('Manager',ManagerSchema);