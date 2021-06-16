import jwt from 'jsonwebtoken';

const  authenticatedCheck = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ message: "SignIn First" });

    jwt.verify(token, "test", (err, user) => {
        if (err) return res.status(403).json({ message: err });
        req.user = user;
        next();
    });
}

export default authenticatedCheck;