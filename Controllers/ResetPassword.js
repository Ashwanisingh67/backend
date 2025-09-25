const bcrypt=require('bcrypt');
const patientModel = require('../Models/patientModel');
const resetpassword=async(req,res)=>{
    try {
        const token=req.params.token;
        const{password,conformpassword}=req.body;
        if(password!==conformpassword){
            res.status(401).json({message:"password not matched",sucess:false})
        }
        if(!token){
            return res.status(404).json({message:"something is missing"});

        }
         const hashpassword=await bcrypt.hash(password,10);
        const updatepassword=await patientModel.updateOne({token:token},{$set:{password:hashpassword}});
        res.status(200).json({message:"password is update successfully",updatepassword})
        

    } catch (error) {
        res.status(501).json({message:"internal error"});
    }

}
module.exports=resetpassword;