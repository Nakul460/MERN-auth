import bcrypt from 'bcryptjs';
import userModel from '../models/user_models.js';
import transporter from '../config/nodemailer.js';
import jwt from 'jsonwebtoken';




export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'missing details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "user already exists" });
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if(!emailRegex.test(email)){
            return res.json({success: false,message: "invalid email"})
        }

        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
        if(!passRegex.test(password)){
            return res.json({success:false,message:"invalid password"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const mailOptions = {
            from: `"MERN App" <${process.env.SENDER}>`,
            to: email,
            subject: "Welcome to MERN",
           html: `
                <div style="text-align: center; font-family: Arial, sans-serif; color: #333;">
                <h1>Welcome to MERN, ${email}!</h1>
                <p>We are excited to have you on board.</p>
                <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjNoZHVvZDIxZ3prY3RsOXdhbjNyeWc2MDBzazkyNzQ1cXZ5emF6OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUPGGDNsLvqsBOhuU0/giphy.gif" 
                    alt="Welcome GIF" 
                    style="width: 300px; height: auto; margin-top: 20px;" />
                <p style="margin-top: 20px;">Start exploring our app and enjoy!</p>
                </div>
            `
        }
        
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent successfully: %s", info.messageId);


        return res.json({ success: true });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }

}


export const login = async (req,res) =>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.json({success: false,message:'Email and password are required'})
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: 'Invalid email'})
        }
        
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success: false,message: 'Invalid password'});
        }
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: '7d'});
        
        res.cookie('token',token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success:true})

    } catch (error) {
        return res.json({success: false,message: error.message})
    }
}

export const logout = async (req,res) =>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })
        return res.json({success: true,message: 'Logged out'})
    } catch (error) {
        return res.json({success: false,message: error.message})
    }
}

// send verification to user's email
export const sendVerifyOtp = async (req, res) => {
  try {
    const userId = req.userId; 
    
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000; 
    await user.save();

    const mailOptions = {
      from: `"MERN App" <${process.env.SENDER}>`,
      to: user.email,
      subject: "OTP verification",
      html: `<p>Here is your OTP:</p><h1>${otp}</h1>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Verification OTP sent!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const verifyEmail = async (req,res) => {
    const {otp} = req.body;
    const userId = req.userId;
    if(!userId || !otp){
        return res.json({success:false,message:'Missing Details'});
    }
    try {
        const user = await userModel.findById(userId);

        if(user.verifyOtp === '' || user.verifyOtp !== otp){
            return res.json({success:false,message:'Invalid OTP'});
        }
        if(!user){
            return res.json({success:false,message:'User not found'});
        }


        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false,message:'OTP expired!'});
        }
        
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({success:true,message:'Email verified successfully'});

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

export const isAuthenticated = async (req,res) =>{
    try {
       res.json({success:true});   
    } catch (error) {
       res.json({success:true,message:error.message});
    }
}

//send password reset OTP
export const sendResetOtp = async (req,res) =>{
    const {email} = req.body;

    if(!email){
        return res.json({success:false,message:'email is required'});
    }
    
    try {
        
        const user = await userModel.findOne({email});

        if(!user){
            
            return res.json({success:false,message:'User not found'});

        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000;
        
        await user.save();

        const mailOptions = {
            from: `"MERN App" <${process.env.SENDER}>`,
            to: user.email,
            subject : 'Password reset OTP ',
            html:`<p>Here is your otp</p>
                  <h1>${otp}</h1>`
        }

        await transporter.sendMail(mailOptions);

        return res.json({success:true,message:'OTP sent to your email'})
        

    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}





//Reset user password
export const resetPassword = async (req,res) =>{
    const {email,otp,newPassword} = req.body

    if(!email || !otp || !newPassword){
        return res.json({success:false,message:'Email,OTP and new password are required'});

        
    }

    try {
        
        const user = await userModel.findOne({email});

        if(!email){
            
            return res.json({success:false,message:'User not found'});

        }

        if(user.resetOtp === '' || user.resetOtp !== otp){
        
            return res.json({success:false,message:'Invalid OTP'});

        }

        if(user.resetOtpExpireAt<Date.now()){
        
            return res.json({success:false,message:'OTP expired'});

        }

        const hashedPassword = await bcrypt.hash(newPassword,10);

        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({success:true,message:"Password reset is successful"});

    } catch (error) {
        
        return res.json({success:false,message:error.message});

    }
}