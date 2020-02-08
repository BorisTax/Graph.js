const express = require('express')
const {getUsers,loginUser,registerUser,sendMail,activate} = require('./users')
const {getCaptions} = require('./options')


var router = express.Router()

router.post('/login', async (req, res)=>{
  const user=req.body;
  if(!user.nameOrEmail) user.nameOrEmail="";
  if(!user.password) user.password="";
  const result=await loginUser(user); 
  //if(result.success) res.cookie('token',result.token,{httpOnly:false})
  res.status(result.code).json(result);
})
router.post('/lang', async (req, res)=>{
  const lang=req.body.lang;
  if(!lang) lang='en';
  const result=await getCaptions(lang); 
  if(!result) res.sendStatus(500);else res.json(result);
})

router.post('/register', async (req, res)=>{
  const user=req.body;
  if(!user.name||!user.password) return res.json({registered:false});
  const result=await registerUser(user); 
  res.status(result.code).json(result);
})

router.post('/users', async (req, res)=>{
  const result=await getUsers(); 
  res.json(result);
})
router.post('/send',async (req, res)=>{
  const user=req.body;
  const result=await sendMail(user.email); 
  res.json(result);
})
router.post('/activate',async(req,res)=>{
  const id=req.body.id;
  if(!id) {
    res.json({success:false,errCode:1})
  }else{
  const result=await activate(id);
  res.status(result.code).json(result)
  }
})
router.get('/test',(req,res)=>{
  res.send(req.headers.host);
})
module.exports={router}