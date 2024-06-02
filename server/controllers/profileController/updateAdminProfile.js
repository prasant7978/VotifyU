const adminModel = require("../../models/adminModel");

module.exports = async(req, res) => {
    try {
        // console.log('req body in updateAdminProfile: ', req.body);
        // console.log('req file in updateAdminProfile: ', req.file);

        const admin = await adminModel.findById({_id: req.id});

        if(!admin){
            return res.status(500).send({
                success: false,
                message: 'Admin Not Found'
            })
        }

        if(req.file){
            var user = await adminModel.findByIdAndUpdate({_id: req.id}, {
                profileImage: req.imageName || admin?.profileImage,
            }, {new: true});
        }
        else{
            user = await adminModel.findByIdAndUpdate({_id: req.id}, {
                name: req.body.name || admin?.name,
                email: req.body.email || admin?.email,
                phone: req.body.phone || admin?.phone,
            }, {new: true});
        }

        // making password undefined
        user.password = undefined;

        const token = req.headers['auth-token']

        return res.status(200).send({
            success: true,
            message: 'Profile has been updated successfully',
            user,
            token
        });
    } catch (error) {
        console.log(`Error in update-admin-profile api: ${error}`.bgRed.white);
        return res.status(500).send({
            success: false,
            message: 'Error in update-admin-profile api',
            error
        });
    }
}