const express = require('express');
const createPost = require('../controllers/postController/createController/createPost');
const verifyToken = require('../middlewares/verifyToken');
const upload = require('../middlewares/uploadImage');
const createNotice = require('../controllers/postController/createController/createNotice');
const getAllPosts = require('../controllers/postController/viewController/getAllPosts');
const getAllOwnPost = require('../controllers/postController/viewController/getAllOwnPost');
const deletePost = require('../controllers/postController/deletePost');
const updatePost = require('../controllers/postController/updateController/updatePost');
const updateNotice = require('../controllers/postController/updateController/updateNotice');

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

// CREATE
router.post('/create-post/campaign', verifyToken, upload, createPost);
router.post('/create-post/notice', verifyToken, createNotice);

// UPDATE
router.put('/update-post/campaign', verifyToken, updatePost);
router.put('/update-post/notice', verifyToken, updateNotice);

// VIEW
router.get('/get-all-posts', verifyToken, getAllPosts);
router.get('/get-all-own-posts', verifyToken, getAllOwnPost);

// DELETE
router.delete('/delete-post', verifyToken, deletePost);

module.exports = router;