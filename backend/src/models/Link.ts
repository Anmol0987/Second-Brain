import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
    hash:{type:String,required:true},
    userId:{type:mongoose.Types.ObjectId,required:true},
});

module.exports = mongoose.model('Link',LinkSchema);