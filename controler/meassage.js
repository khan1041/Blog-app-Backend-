
import URL1 from "../Models/Conteact.js";



export const contectform=async(req,res)=>{


    try {
        const {name,email,meassage}=req.body
    
        const datasend=new URL1({
            name,email,meassage
        })
        await datasend.save()
        return res.status(200).json({msg:"done",datasend})
    } catch (error) {
        console.log(error)
    }
    
    
    
    }



