




import express from 'express'
//const express=require('express')
import router from './routes/userroutes.js'
import Blog from './routes/Blogroutes.js';
import conectedDb from './Dtabase/dbconection.js'
import { v2 as cloudinary } from "cloudinary";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import cors from 'cors'
import { errorMiddleware } from './midelware/errorhandel.js';
const app = express()



export default app
//dotenv.config()
app.use(cookieParser())
app.use(express.json())

app.use(
  cors({
    origin:true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//app.use(cors(corsoption))

app.use(express.static('public'))
import fileUpload from 'express-fileupload'
import publicroutes from './routes/Publilcroutes.js';

const port=8000


app.use(fileUpload({

  useTempFiles:true,
  tempFileDir:"/tmp",
 }))

 dotenv.config()

 app.use("/app/auth",router)
 app.use("/app/blog",Blog)
 app.use("/app/public",publicroutes)



 cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env. CLOUD_API_KEY, 
  api_secret:process.env.API_SECRET_KEY  // Click 'View API Keys' above to copy your API secret
});

 
app.use(errorMiddleware)

conectedDb().then(()=>{
  app.listen(port,()=>{
   console.log(`surver is running at port:${port}`)    
  })
})







