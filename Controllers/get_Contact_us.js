const contactUs = require('../Models/Contact_US');

const getContactUs = async (req, res) => {
    try {
        const contactUsData = await contactUs.find();
        
        if (contactUsData.length === 0) {
        return res.status(404).json({ message: 'No contact us data found', success: false });
        }
        
        return res.status(200).json({ message: 'Contact us data retrieved successfully', data: contactUsData, success: true });
    } catch (error) {
        console.error('Error retrieving contact us data:', error);
        return res.status(500).json({ message: 'Internal server error', success: false });
    }
}

module.exports = getContactUs;