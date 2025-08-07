const DiagnosticLab = require('../Models/Diagnostic_Labmodel');
const getDiagnosticLab =async(req,res)=>{
try {
    const labs = await DiagnosticLab.find({});
    if (labs.length === 0) {
        return res.status(404).json({ message: 'No diagnostic labs found',success:false });
    }
    res.status(200).json({ message: 'Diagnostic labs retrieved successfully', labs,success:true });

} catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message ,success:false});
}
}

module.exports = getDiagnosticLab;