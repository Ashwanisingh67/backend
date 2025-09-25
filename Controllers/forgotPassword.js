const { forgetPasswordMail } = require("../helper/sendMail");
const patientModel = require("../Models/patientModel");
const randomstring=require('randomstring');
const forgetPassword=async(req,res)=>{
     const{email}=req.body;
    try {
   
    const findUser=await patientModel.findOne({email:email})
    if(!findUser){
    res.status(401).json({message:"user not found",sucess:false});
    }
const RandomString = randomstring.generate();
const updateData = await patientModel.updateOne({ email: email }, { $set: { token: RandomString }, new: true });
await forgetPasswordMail(email, RandomString);
res.status(200).json({message:"mail send  sucessfully",sucess:true,updateData})

    } catch (error) {
        res.status(500).json({message:"internal error",sucess:true})

    }

}
module.exports=forgetPassword;