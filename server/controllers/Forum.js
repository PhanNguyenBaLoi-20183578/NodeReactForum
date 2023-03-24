const express= require("express");
const router = express.Router();
const Forum = require("../models/Forum");
const Thread = require('../models/Thread');

router.post('/create',async (req,res)=>{
    const {title,categoryId}= req.body;
    const newForum = Forum({
        title,
        createdAt: Date(),
        categoryId
    });

    await newForum.save();
    res.send(newForum);
})

router.get('/:id', async (req,res)=>{
    
    const forum = await Forum.findById(req.params.id);
    if(!forum){
        res.status(404).send({
            message:'Forum not found'
        });
        return;
    }

    res.send(forum);
})

router.get('/category/:id',async (req,res)=>{
    //console.log(req.params.id);
    const forums= await Forum.find({categoryId: req.params.id});
    
    res.send(forums);
})


module.exports = router;