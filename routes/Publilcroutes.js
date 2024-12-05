
import express from 'express'
import { getsinelpost } from '../controler/Public.js'
const publicroutes=express.Router()

publicroutes.get("open/:id",getsinelpost)


export default publicroutes













