
import postmodel from "../Models/Blogscema.js"
import commentModel from "../Models/commentScem.js"
export const Addcoment=async(req,res)=>{


try {
    const {postId,userId,comment}=req.body
    
  const newComment=new commentModel({

    postId,userId,comment

  })
 await newComment.save()
  
 const exitspost=await postmodel.findById(postId)

 if(!exitspost){

return res.status(400).json({msg:"not valid"})
 }

exitspost.comments.push(newComment._id)
await exitspost.save()
res.status(201).json({msg:"comment add successfully",newComment})
} 

catch (error) {
    console.log(error)

}

}