import express from 'express'
import { User } from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'


dotenv.config();
const router = express.Router();


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send({ message: 'username and password are required.' });
        }

        // Fetch the user from the database
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).send({ message: 'User does not exist.' });
        }

        // const matchingPassword = await bcrypt.compare(password, user.password);
        // if (!matchingPassword) {
        //     return res.status(401).send({ message: 'Incorrect password.' });
        // }

        if(user.password !== password){
            return res.status(401).send({ message: 'Incorrect password.' });
        }

        const accessToken = jwt.sign(
            { username: user.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { username: user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '30d' }
        );

        res.cookie('jwt', refreshToken, {
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: false, // Not using HTTPS in development
            domain: undefined,
            httpOnly: true,
        });
        
        
        res.status(200).send({
            message: 'Logged in successfully',
            accessToken
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: 'Internal server error' });
    }
});

router.post('/logout', async (req, res) => {
    res.clearCookie('jwt', {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        secure: false, // Not using HTTPS in development
        domain: undefined,
        httpOnly: true
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
    
});

router.get('/auth', (req, res) => {
    console.log("Cookies: ", req.cookies); // Log cookies to see if they're being sent

    const refreshToken = req.cookies.jwt; 

    if (!refreshToken) {
        console.log("No refresh token found");
        return res.status(401).json({ message: "No refresh token, user not logged in" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token verification failed: ", err.message);
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        const accessToken = jwt.sign(
            { username: decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        res.status(200).json({
            message: 'User is logged in',
            accessToken,
            user: { username: decoded.username }
        });
    });
});





export default router;