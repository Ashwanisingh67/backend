const userModel = require('../Models/userModel');
const auth=async (req, res, next) => {
    try {
        const token = req.cookies.token; // Assuming token is stored in cookies
        
        if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
        }
    
        // Verify the token (assuming JWT is used)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user by ID from the token
        const user = await userModel.findById(decoded.id);
        
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }
    
        // Attach user to request object
        req.user = user;
        
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    }
    module.exports=auth