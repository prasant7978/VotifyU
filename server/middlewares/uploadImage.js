const multer = require('multer');
const getUserName = require('../functions/getUserName');

module.exports = async(req, res, next) => {
    // get user name
    var userName = await getUserName(req.id, req.query.type, req.userType);
    userName = userName.replace(/\s/g, "-");
    // console.log('user name: ', userName);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(req.query.type == 'campaign')
                cb(null, 'uploads/campaign/')
            else if(req.query.type == 'profile')
                cb(null, 'uploads/profile/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + userName + '-' + file.originalname)
        }
    });

    const upload = multer({ storage });

    try {
        upload.single("image")(req, res, function(err){
            if(err){
                console.log('Errorrrr: ', err);
                return res.status(500).send({
                    success: false,
                    message: 'Error in uploading the image',
                    err
                });
            }
            else{
                console.log('file uploaded...');
                next();
            }
        });
    } catch (error) {
        console.log('Error in uploading the image: ', error);
        return res.status(500).send({
            success: false,
            message: 'Error in uploading the image',
            error
        });
    }
};