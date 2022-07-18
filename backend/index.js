const express=require("express");
const cors=require('cors')
const mongoose=require('mongoose');
const User=require('./medels/user')
const jwt =require('jsonwebtoken')

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/full-mern-user-auth')

app.post('/api/register',async (req,res)=>{
    console.log(req.body);
    try{
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        res.json({status:'ok'})
    }catch(err){
        res.json({status:'error'})
    }
    
})

app.post('/api/login',async (req,res)=>{
        const user=await User.findOne({
            email:req.body.email,
            password:req.body.password,
        })
        if(user){

            //jwt
            const token=jwt.sign({
                name:user.name,
                email:user.email,
            },'secret123')

            return res.json({status:'ok',user:token})
        }
        else{
            return res.json({status:'error',user:false})
        }
})

app.listen(1337);

