const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
    const token = req.headers['auth-token'];

    if(!token){
        console.log('token not found');
        return res.status(500).send({
            success: false,
            message: 'Token not found'
        });
    }
    else{
        try {
            const user = await jwt.verify(token, process.env.SECRET_KEY);
            if(!user){
                console.log('invalid token');
                return res.status(500).send({
                    success: false,
                    message: 'Invalid Token'
                });
            }

            console.log('Token verified...');

            // if(user.userType == "admin")
            //     req.adminEmail = user.email;
            // else
            //     req.studentEmail = user.email;

            req.id = user._id;
            req.userType = user.userType;

            next();
        } catch (error) {
            console.log(`Error in token verification: ${error}`);
            return res.status(500).send({
                success: false,
                message: 'Error in token verification',
                error
            });
        }
    }
}