const fs=require('fs')
const dbOptions={
    user: 'cvyixgdjmqzgxb',
    host: 'ec2-54-243-208-234.compute-1.amazonaws.com',
    database: 'd2k8ktphu4u5ub',
    password: '24ed512afec0a63bde172f6a715de7979878355693d0ce7361179afc133909ae',
    port: 5432,
    ssl: true
  }
function readFile(file){
    return new Promise((resolve,reject)=>{
         fs.readFile(file,'utf8',(err,data)=>{
           if(err) reject(err); else resolve(data);
           })
         })
  }
async function getCaptions(lang){
    try{
    const data=await readFile(`./locale/${lang}.json`);
    var result=JSON.parse(data);
    }catch(e){result=null}
    return result;
  }
  module.exports= {dbOptions,getCaptions};