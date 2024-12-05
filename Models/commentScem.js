

import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({

postId:{
    type:mongoose.Schema.Types.ObjectId,
   ref:'post',
   required:true,

},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"newuser",
required:true

},

comment:{
type:String,
required:true,

}

})


const commentModel=mongoose.model('Comment',commentSchema)

export default commentModel



