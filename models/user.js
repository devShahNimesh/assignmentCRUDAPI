const mongoose =require('mongoose');
const Schema = mongoose.Schema;


 const User = new Schema({
    userName: {type:String, trim: true, unique:true,required:true},
    firstName: {type:String, required:true},
    lastName: {type:String, default:null},
    createdAt: {type:Date , default:null},
    updatedAt: {type:Date, default:null},
    isActive: {type: Boolean, default:true},
});

// create new User 
User.statics.create = function(userName,firstName,lastName) {

    const user = new this({
        userName : userName,
        firstName : firstName,
        lastName: lastName,
        createdAt : Date.now()
    });

    //console.log('created user sucessfully');
    // return the Promise
    return user.save()
};

// find one user by using user name
User.statics.findOneByUserName = function(userName) {
    return this.findOne({ userName: userName}).exec()
};

 // find one user by using id
User.statics.findOneByID = function(id) {
    return this.findOne({ _id: id}).exec()
};

// get first 10 Users
User.statics.getLastTenUsers = function(){
    return this.find().sort({_id:1}).limit(10);
}


//Updates User Document
User.statics.updateUser = function(id,firstName,lastName,isActive){
    let query = {_id:id};
    let update ={firstName: firstName, lastName:lastName, isActive:isActive, updatedAt: Date.now()};
    return  this.findOneAndUpdate(query,update).exec();
};

 //Deactivates the user ( Soft Delete )
 User.statics.deleteUser = function(id){
    let query = {_id:id};
    let update ={isActive:false};
    return  this.findOneAndUpdate(query,update).exec();
};



module.exports = mongoose.model('User', User);
