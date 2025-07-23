const DiagnosticLab = require('../Models/Diagnostic_Lab.model'); // 
const createDiagnosticLab = async (req, res) => {
    try {
        const { labName, OwnerName, email, phoneNumber, alternativeNumber, websiteURL } = req.body;
        if (!labName || !OwnerName || !email || !phoneNumber || !websiteURL) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    const newLab = new DiagnosticLab({
        labName,    
        OwnerName,
        email,
        phoneNumber,
        alternativeNumber,
        websiteURL
    });
    await newLab.save();
    return res.status(201).json({ message: 'Diagnostic lab created successfully', lab: newLab });
} catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
}
}

module.exports = createDiagnosticLab;