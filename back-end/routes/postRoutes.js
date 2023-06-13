import express from "express"
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from "cloudinary"
import Post from "../models/posts.js"


 dotenv.config()
 const router = express.Router()

 cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
 })


 // route to get all the posts
 router.route("/").get(async (req,res) =>{
    try {
        const posts = await Post.find({})
        res.status(200).json({succcess:true,data:posts})
    } catch (error) {
        res.status(500).json({succcess:false,message:error})
    }
 })

 //route to create a post
 router.route("/").post(async (req,res) =>{
    try {
        const {name,prompt,photo}=req.body
    const photoUrl = await cloudinary.uploader.upload(photo)

    const newPost = await Post.create({
        name,
        prompt,
        photo:photoUrl.url,
    })
    res.status(201).json({succcess:true,data:newPost})
    } catch (error) {
        res.status(500).json({success:false,message:error})
    }
 })
 export default router;