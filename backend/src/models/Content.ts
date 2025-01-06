import mongoose, { Types } from "mongoose";
 
const contentType = ['article', 'image', 'video', 'audio'];
const ContentSchema = new mongoose.Schema({
link: {type:String,required:true},
type: {type:String,required:true,enum:contentType},
title:{type:String,required:true},
tags:[{type:Types.ObjectId,ref:'Tags'}],
userId:{type:Types.ObjectId,ref:'User',required:true},
})

module.exports = mongoose.model('Content',ContentSchema);