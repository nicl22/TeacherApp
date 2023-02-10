import express from "express";
import Class from "../models/Class.js"
import {createError} from "../utils/error.js"

const router = express.Router();

//CREATE
router.post("/", async (req,res)=>{

    const newClass = new Class(req.body)

    try{
        const savedClass = await newClass.save()
        res.status(200).json(savedClass);
    }catch(err){
        res.status(500).json(err);
    }
    
})
//UPDATE
router.post("/", async (req,res)=>{


    try{
        const updatedClass = new Class.findByIdAndUpdate(req.params.id,{ $set: req.body},{new:true})
        res.status(200).json(updatedClass);
    }catch(err){
        res.status(500).json(err);
    }
    
})
//DELETE
router.delete("/:id", async (req,res)=>{


    try{
        await Class.findByIdAndDelete(
            req.params.id
        )
        res.status(200).json("Hotel has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
    
})
//GET
router.post("/:id", async (req,res)=>{


    try{
        const classes = await Class.findById(
            req.params.id
        );
        res.status(200).json(classes);
    }catch(err){
        res.status(500).json(err);
    }
    
})
//GET ALL

router.post("/", async (req,res)=>{
    try{

        const classes = await Class.find();       
        res.status(200).json(classes);
    }catch(err){
        next(err)
    }
    
})



export default router;