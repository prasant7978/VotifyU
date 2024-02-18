const jwt = require('jsonwebtoken')

const generateAuthToken = async(id, userType) => {
    const token = await jwt.sign({id: id, userType: userType}, process.env.SECRET_KEY, {
        expiresIn: '7d'
    });
    return token;
}

module.exports = generateAuthToken;