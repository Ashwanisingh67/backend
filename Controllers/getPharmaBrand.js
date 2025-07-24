const PharmaBrand = require('../Models/PharmaBrand.model');
const getPharmaBrand = async (req, res) => {
    try {
        const brands = await PharmaBrand.find({});
        if (brands.length === 0) {
            return res.status(404).json({ message: 'No pharma brands found', success: false });
        }
        return res.status(200).json({ message: 'Pharma brands retrieved successfully', brands, success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message, success: false });
    }
}
module.exports = getPharmaBrand;