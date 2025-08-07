const DentalRegistrationModel = require('../Models/DentalRegistration_model');
const getDentalRegistration=async(req,res)=>{
try {
    const DentalRegistrationData=await DentalRegistrationModel.find();
    if (DentalRegistrationData.length === 0) {
        return res.status(404).json({ message: 'No dental registration data found',success:false });
    }
    return res.status(200).json({ message: 'Dental registration data retrieved successfully', data: DentalRegistrationData,success:true });
} catch (error) {
    console.error('Error retrieving dental registration data:', error);
    return res.status(500).json({ message: 'Internal server error',success:false });
}
}
module.exports=getDentalRegistration;