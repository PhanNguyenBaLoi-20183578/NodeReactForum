const express= require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get('/init',async(req,res)=>{
    let response = null;
    if(!req.query.token){
        const {userId} = jwt.verify(req.query.token,'app');
    
        const user = await User.findById(userId);
    
        if(user){
            response =user;
        }

    }
    //console.log(req.query.token);
    //console.log(jwt.verify(req.query.token,'app'));

    
    res.send({user:response});
})
//Lỗi xung đột send res khi không có if else(res.status(400)+res.status(200))=>server crash
router.post('/register', async (req,res)=>{ 
    const userExists = await User.findOne({email: req.body.email});
    if(userExists){
        res.status(400).send({
            message: 'email_exists'
        });
        return;
    }
    
    const newUser= User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image:req.body.image,
        isAdmin:false,
        createdAt: Date()
    });        
    await newUser.save();
    res.sendStatus(201);   
    
    
})

router.post('/login',async (req,res)=>{
    const user = await User.findOne({email: req.body.email});
    
    if (!user){
        res.status(404).send({
            message: 'user_not_found'
        });
        return;
    }
    const isEqual = await bcrypt.compare(req.body.password,user.password);
          
    if(!isEqual){
        res.status(401).send({
            message: 'wrong_password'
        });
        return;   
}
  
    const token = jwt.sign({userId:user._id},'app');
    if(user&&isEqual){
        res.send({
            token,
            user,
        })
        
    }
    
});
module.exports = router;