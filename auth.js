const jwt = require("jsonwebtoken");

module.exports.verify = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }
        req.user = decoded;
        next();
    });
};

module.exports.isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};
