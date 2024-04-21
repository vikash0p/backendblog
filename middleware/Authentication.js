import jwt from 'jsonwebtoken';
import User from '../MVC/models/UserSchema.js';

const Authentication = async(req,res,next) => {
    try {
        const token = req.cookies.jwtToken;
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: verifyToken.id });
        req.token = token;
        req.user = user;
        next();
    } catch (error) {

        res.status(401).json({message: "Unauthorized: No token provided", success: false });

    }

}

export default Authentication
