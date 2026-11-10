import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// register
export const registerUser = async (req, res) => {
    try {
        console.log("Registration data: ", req.body);
        const { name, email, password } = req.body || {};
        
        // field validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email and password" });
        }

        // check if the user already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            return res.status(409).json({message: "User already exists"})
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12)   // 12 rounds of hashing

        // create the user
        const user = await User.create({
            name, email, password: hashedPassword
        });

        // create the web token
        const token = generateToken(user._id);
        return res.status(201).json({
            message: "Account successfully created",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error("Registration error: ", error);
        if (error.code === 11000) {
            return res.status(409).json({ message: "User already exists" });
        }

        return res.status(500).json({ message: "Server error during registration." })
    }
}

// login/sign in
export const loginUser = async (req, res) => {
    try {
        console.log("Data to login with: ", req.body);
        const { email, password } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide email and password" });
        }

        // to the find user and explicitly the password 
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        }).select("+password");

        if(!user) {
            return res.status(401).json({ message: "Invalid credentials or user doesn't exist." });
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // generate new web token
        const token = generateToken(user._id);
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        console.error("Login error: ", error);
        return res.status(500).json({ message: "Server error during login." })
    }
}