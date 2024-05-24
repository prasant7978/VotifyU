const multer = require('multer');
const getStudentName = require('../functions/getStudentName');

module.exports = async(req, res, next) => {
    // get student name
    var studentName = await getStudentName(req.id, req.query.type);
    studentName = studentName.replace(/\s/g, "-");

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            if(req.query.type == 'campaign')
                cb(null, 'uploads/campaign/')
            else if(req.query.type == 'profile')
                cb(null, 'uploads/profile/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + studentName + '-' + file.originalname)
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
            else{
                console.log('file uploaded...');
                next();
            }
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