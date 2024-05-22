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
const verifyApplicationStatus = require('../middlewares/verifyApplicationStatus');

const router = express.Router();

// CREATE
router.post('/create-post/campaign', verifyToken, verifyApplicationStatus, upload, createPost);
router.post('/create-post/notice', verifyToken, verifyApplicationStatus, createNotice);

// UPDATE
router.put('/update-post/campaign', verifyToken, updatePost);
router.put('/update-post/notice', verifyToken, updateNotice);

// VIEW
router.get('/get-all-posts', verifyToken, getAllPosts);
router.get('/get-all-own-posts', verifyToken, getAllOwnPost);

// DELETE
router.delete('/delete-post', verifyToken, deletePost);

module.exports = router;