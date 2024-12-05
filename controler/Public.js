



export const getsinelpost=async(req,res)=>{

try {
    const postId=req.params.id
    const FindPost=await postmodel.findById(postId)
      .populate({
     
        path:'comments',
        populate:{
         
            path:'userId'

        }
    })


if(!FindPost){
    return res.status(200).json({msg:"open not hare "})
}
res.status(200).json({msg:"massage open write now",FindPost})


} catch (error) {
    console.log(error)
}

}

