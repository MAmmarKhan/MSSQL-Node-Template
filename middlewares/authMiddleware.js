const { verifyToken } = require("../utilities/jwt");
require("dotenv").config();

const authMiddleware = (req, res, next) => {

    let token = req.header('Authorization');

    if (token) {
        token = token.replace('Bearer ', '');

        try {

            const user = verifyToken(token);
            req.user = user;
            next();

        } catch (err) {

            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ Message: 'Token has expired' });

            } else {
                return res.status(403).json({ Message: 'Invalid token.' });
            }
        }
    }
    else {
        return res.status(401).json({ Message: 'Unauthorized access' });
    }
};

module.exports = authMiddleware;
