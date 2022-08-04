const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'jsonwebtoken-secret';

const hashTokenAccess = async user => {
    return jwt.sign(user, secret, {
        "algorithm": "HS256",
        expiresIn: 864000
    })
}

export default {
    hashTokenAccess
}