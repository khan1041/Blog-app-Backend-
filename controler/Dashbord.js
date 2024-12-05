

import express from 'express'
import { User } from '../Models/userscema.js'
import postmodel from '../Models/Blogscema.js'
import fs from 'fs'
import path from 'path'
export const getalldata=async(req,res)=>{


try {
 const alluser=await User.find()
 
const allblog=await postmodel.find()

 if(!alluser && !allblog){

    return res.status(404).json({msg:"no data found"})
 }
 
 res.status(200).json({msg:"dashbord",alluser,allblog})

} catch (error) {
    console.log(error)
}


}


export const userall=async(req,res)=>{

try {
    const alluser=await User.find()
 
    //const allblog=await postmodel.find()
    
     if(!alluser){
    
        return res.status(404).json({msg:"no data found"})
     }
     
     res.status(200).json({msg:"dashbord",alluser})
} catch (error) {
    console.log(error)
}



}

export const userdelete=async(req,res)=>{


try {
    const userId=req.params.id
    const exits=await User.findById(userId)


   if(!exits){
    return res.status(404).json({msg:"no user heare"})
   }


     if(exits.role=="admin"){


    return res.status(404).json({msg:"you are admin panel"})

     }


     if(exits.profile){

        const profilepath=path.join("public/images",exits.profile)
        fs.promises.unlink(profilepath)
        .then(()=>console.log("image handel"))
        .catch(error=> console.log("error",error))

       }
   
       const DeleteUser=await User.findByIdAndDelete(userId)

     res.status(200).json({msg:"delete user done",DeleteUser})
} catch (error) {
    
}


}

















