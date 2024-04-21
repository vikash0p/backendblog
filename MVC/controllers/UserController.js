import User from "../models/UserSchema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const Register = async (req, res, next) => {
    const { name, email, work, phone, password, confirmPassword } = req.body;

    try {
        if (!name || !email || !work || !phone || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const existUser = await User.findOne({ email });
        if (existUser) res.status(409).json({ message: "User already exists", success: false });

        if (password !== confirmPassword) res.status(400).json({ message: "Passwords do not match", success: false });

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, work, phone, password: hashPassword, confirmPassword: hashPassword });
        if (!newUser) res.status(404).json({ message: "user creation failed", success: false });

        res.status(201).json({ message: "User created successfully", success: true, data: newUser });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", success: false, error: error.message });
    }
};


//*login user

export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Look for the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials", success: false });
        }

        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Verify token
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token", success: false });
        }

        res.cookie("token", token, {
            path:'/',
            expires:new Date(Date.now()+ 24*60*60*1000) ,
            httpOnly: true,
            sameSite: "none",
            secure: true
        })

        // Send a successful response
        return res.status(200).json({
            message: "Login successful!",
            success: true,
            token
        });

    } catch (error) {
        // Handle server errors more generally
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}


export const VerifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        const user =  jwt.verify(String(token), process.env.JWT_SECRET);
        console.log(user);
        req.id = user.id;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(404).json({
                message: "Invalid token",
                success: false,
                error: error.message
            });
        }
        res.status(401).json({ message: "Unauthorized: No token provided", success: false });
    }
};

export const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        // Excluding password and confirmPassword fields from the query
        user = await User.findById(userId, { password: 0, confirmPassword: 0 });
    } catch (error) {
         next(error.message); // Pass error to error handling middleware
    }
    if (!user) {
         res.status(404).json({
            message: "User not found",
            success: false,
        });
    }
   return  res.status(200).json({ user });
};


export const logout = (req, res) => {
    res.clearCookie('token'); // Clear the 'token' cookie
    res.status(200).json({ message: "Logout successful", success: true });
};