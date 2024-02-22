const express = require('express');
const createPost = require('../controllers/postController/createPost');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploadImage');
const createNotice = require('../controllers/postController/createNotice');

// const multer  = require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // console.log('Request Params: ', req.query);
//         if(req.query.type == 'campaign')
//             cb(null, 'uploads/campaign/')
//         else if(req.query.type == 'profile')
//             cb(null, 'uploads/profile/')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname)
//     }
//   })
// const upload = multer({ storage })

const router = express.Router();

// router.post('/create-post', upload.single('image'), createPost)
router.post('/create-post/campaign', verifyToken, upload, createPost);
router.post('/create-post/notice', verifyToken, createNotice);

module.exports = router;