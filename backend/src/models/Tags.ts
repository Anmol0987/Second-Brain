import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    title:{type:String,required:true},
});

module.exports = mongoose.model('Tags',TagSchema);