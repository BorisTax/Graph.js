const {Client} = require('pg');
const {dbOptions} = require('./options');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var keygen = require("keygenerator");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'geomeditor2019@gmail.com',
    pass: 'nrrxbxtpapcvwmgi',
  }
});
function activationKeygen(){
  return keygen._({length:120});
}

async function loginUser(user){
  try{
    var client = new Client(dbOptions);
    client.connect();
    var res=await client.query('SELECT * FROM users')
  }catch(err){
    client.end()
    return {success:false,message:err.message,code:500,errCode:5}
  }
    let users=res.rows;
    let result={success:false,message:'User not found',code:200,errCode:1};
    for(let u of users)
      if(user.nameOrEmail===u.name||user.nameOrEmail===u.email){
            if (bcrypt.compareSync(user.password, u.password)) {
                let token = jwt.sign({name:u.name}, 'secretkey', {expiresIn: 1440})
                client.end()
                if(u.activated===false) return {success:false,code:200,errCode:2}
                return {success:true,token,code:200,errCode:0};
                }}
    client.end()
    return result;
}

async function getUsers(){
  const client = new Client(dbOptions);
  client.connect();
  const res=await client.query('SELECT * FROM users')
  let users=res.rows;
  users=users.map(item=>item.name);
  client.end()
  return {users};
}

async function activate(code){
  var result={success:false,code:200,errCode:1}
  try{
    var client = new Client(dbOptions);
    client.connect();
    const res=await client.query(`UPDATE users SET activated='true',activationcode='' WHERE activationcode='${code}'`)
    if(res.rowCount>0) result={success:true,code:200,errCode:0};
      else result={success:false,code:200,errCode:1};
    }catch(err){
        client.end()
        return {success:false,message:err.message,code:500,errCode:5}
      }
    client.end()
    return result;
}

function send(mailTo,code){
  const url=`https://geomeditor.herokuapp.com/activate/${code}`;
  const htmlText=`<p>This letter was sent from <a href='https://geomeditor.herokuapp.com'>geomeditor.herokuapp.com</a></p>
  <p>You received this letter because this e-mail address was used to sign up on geomeditor.herokuapp.com</p>
  <p>If you didn't do it, just ignore and delete this letter.</p>
  <p>To activate your account click on the link below</p><a href="${url}">Activate</a>
  <p>Please, do not answer this letter. It was generated and sent automatically</p>`
  var mailOptions = {
    from: 'Geomeditor <geomeditor2019@gmail.com>',
    to: mailTo,
    subject: 'Sign up on geomeditor.herokuapp.com',
    html: htmlText
  }
  return new Promise((res,rej)=>{
    transporter.sendMail(mailOptions, function(err, info){
      if(err) rej(err);
       else res(info.response);
      });
  })
}
async function sendMail(mailTo,code){
  const result={success:false,message:''}
  try{
  result.reply=await send(mailTo,code);
  result.success=true;
  }catch(e){
    result.success=false;
    result.message=e.message;
  }
return result;
}

async function registerUser(user){
    try{
      var client = new Client(dbOptions);
      client.connect();
      var res=await client.query('SELECT * FROM users')
      
    }catch(err){
      client.end();
        return {registered:false,message:err.message,code:500,errCode:3};
    }
    let users=res.rows;
    for(let u of users){
      if(user.name===u.name.trim()) {
        client.end();
        return {registered:false,message:'User already exists',code:200,errCode:1};
      }
      if(user.email===u.email.trim()) {
        client.end();
        return {registered:false,message:'E-Mail already exists',code:200,errCode:2};
      }
    }
    try{
      var hash=await hashData(user.password);    
      }catch(err){
        client.end();
        return{registered:false,message:err.message,code:500,errCode:3}
      }
    try{
       const code=activationKeygen()
       res=await client.query(`INSERT INTO users (name,email,password,activated,activationcode) VALUES('${user.name}','${user.email}','${hash}','false','${code}')`)
       await sendMail(user.email,code); 
      }catch(err){
       client.end();
       return {registered:false,message:err.message,code:500,errCode:3}
       }
    client.end();
    return {registered:true,message:'User registered',code:201,errCode:0};
}

function hashData(data){
  return new Promise((resolve,reject)=>{
    bcrypt.hash(data, 10, (err, hash) =>{
      if(err) reject(err);else resolve(hash);
    })
  })

}

module.exports={registerUser,getUsers,loginUser,sendMail,activate}