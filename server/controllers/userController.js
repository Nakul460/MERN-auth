import userModel from '../models/user_models.js'

export const getUserData = async (req, res) => {
    try {
        console.log("Decoded userId:", req.userId);  

        const user = await userModel.findById(req.userId);

        if (!user) {
            console.log("No user found for id:", req.userId); 
            return res.json({ success: false, message: 'User not found' });
        }

        return res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified,
            },
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
