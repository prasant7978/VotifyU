const multer = require('multer');

module.exports = async(req, res, next) => {
    // console.log('Request Params: ', req.query);
    // console.log('Request Body: ', req.body);

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(req.query.type == 'campaign')
                cb(null, 'uploads/campaign/')
            else if(req.query.type == 'profile')
                cb(null, 'uploads/profile/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    });

    const upload = multer({ storage });

    try {
        upload.single("image")(req, res, function(err){
            if(err){
                console.log('Errorrrr: ', err);
                res.status(500).send({
                    success: false,
                    message: 'Error in uploading the image',
                    error
                });
            }
            else
                next();
        });
    } catch (error) {
        console.log('Error in uploading the image: ', error);
        res.status(500).send({
            success: false,
            message: 'Error in uploading the image',
            error
        });
    }
};