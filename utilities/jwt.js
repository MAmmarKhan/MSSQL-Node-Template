const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SALT || 'your_secret_key';

const generateToken = (customer, expiry = '7d') => {
    const payload = {
        customerId: customer.CustomerId,
        email: customer.Email,
        username: customer.Username,
        customerTypeId : customer.CustomerTypeId
    };

    const options = { expiresIn: expiry };
    
    return jwt.sign(payload, SECRET_KEY, options);
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        throw new Error('Invalid token');
    }
};

module.exports = { generateToken, verifyToken };
