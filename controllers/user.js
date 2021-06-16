import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const getAllUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

export const signup  = async (req,res) => {
    const { username, email, encrypted_password, phone, address, city, country, name, postcode  } = req.body.user;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User already registered." });
        const hashedPassword = await bcrypt.hash(encrypted_password, 12);

        const result = await User.create({ username, email, password: hashedPassword, phone, address, city, country, name, postcode });
        const token = jwt.sign({ email: result.email, id: result._id }, "test", { expiresIn: "2h" });
        res.status(200).json({ email: result.email, username: result.username, token })
    } catch (error) {
        res.status(5000).json({ message: "Something went wrong." });
    }
}

export const signin  = async (req,res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials."});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, "test", { expiresIn: "1h" });
        res.status(200).json({ email: existingUser.email, username: existingUser.username, token });
    } catch (error) {
        res.status(5000).json({ message: "Something went wrong." });
    }
}