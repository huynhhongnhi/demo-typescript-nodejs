const jwt = require('jsonwebtoken')
const secret = "shhhhhhared-secret"

let hashTokenAccess = async user => {
    return jwt.sign(user, "secret", {
        "algorithm": "HS256",
        expiresIn: 864000
      })
}
export default {
    hashTokenAccess
}