const { sendmail } = require('../helper/sendMail');
const DiagnosticLab = require('../Models/Diagnostic_Labmodel'); // 
const createDiagnosticLab = async (req, res) => {
    try {
        const { labName, OwnerName, email, phoneNumber, alternativeNumber, websiteURL } = req.body;
        if (!labName || !OwnerName || !email || !phoneNumber || !websiteURL) {
            return res.status(400).json({ message: 'All fields are required',success:false });
        }
    const newLab = new DiagnosticLab({
        labName,    
        OwnerName,
        email,
        phoneNumber,
        alternativeNumber,
        websiteURL
    });

    await sendmail({labName,OwnerName,email,phoneNumber,Registration:"Diagnostic Lab"})
    

    await newLab.save();
    return res.status(201).json({ message: 'Diagnostic lab created successfully', lab: newLab ,success:true});
} catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message,success:false });
}
}

module.exports = createDiagnosticLab;