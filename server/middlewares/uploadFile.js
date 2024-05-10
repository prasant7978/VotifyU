const multer = require('multer');

module.exports = async(req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/files/')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    });

    const upload = multer({ storage });

    try {
        upload.array("documents[]")(req, res, function(err){
            if(err){
                console.log('Errorrrr: ', err);
                res.status(500).send({
                    success: false,
                    message: 'Error in uploading the files',
                    error
                });
            }
            else{
                const uploadedFiles = req.files.map(file => ({
                    originalname: file.originalname,
                    filename: file.filename,
                    path: file.path,
                }));

                // console.log('file uploaded...\n', uploadedFiles);
                console.log('files have been uploaded...');
                next();
            }
        });

    } catch (error) {
        console.log('Error in uploading the file: ', error);
        res.status(500).send({
            success: false,
            message: 'Error in uploading the file',
            error
        });
    }
};