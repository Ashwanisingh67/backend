const CBCT_OPG_Model = require('../Models/CBCT_OPG_Model'); 
const get_CBCI_OPG_data = async (req, res) => {
  try {
    // Fetch all CBCT OPG documents from the database
    const cbct_opg_data = await CBCT_OPG_Model.find();

    // Check if data exists
    if (cbct_opg_data.length === 0) {
      return res.status(404).json({ message: 'No CBCT OPG data found',success:false });
    }

    // Return the fetched data
    res.status(200).json({ message: 'CBCT OPG data retrieved successfully', data: cbct_opg_data ,success:true});
  } catch (error) {
    console.error('Error fetching CBCT OPG data:', error);
    res.status(500).json({ message: 'Internal server error',success:false });
  }
}
module.exports = get_CBCI_OPG_data;