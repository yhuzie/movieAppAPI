const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports.registerUser = async (req, res) => {
    const { email, password, isAdmin } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields are required." });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, isAdmin });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error registering user." });
    }
};

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Error logging in." });
    }
};
