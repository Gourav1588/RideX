const express=require('express')
const router=express.Router();
const authMiddleware =require('../middilware/auth.middleware')
const mapController=require('../controlers/map.con')
const {query}=require('express-validator')
router.get('/get-coordinates',
    query('address').isString().isLength({min:3})
,mapController.getCoordinates)
module.exports=router;