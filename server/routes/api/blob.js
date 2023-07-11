const express = require('express');
const router = express.Router();
const multer = require('multer');
const blobController = require('../../controllers/blob');
// const authMiddleware = require('../../middleware/authMiddleware');


const upload = multer();


router.post('/upload-blob', upload.single('image'), blobController.uploadFile);
router.get('/', blobController.getFiles);
router.get('/:id', blobController.getFile);


// get the coordinates based on the address
// router.post('/upload', authMiddleware, blob.uploadFile);
// router.post('/get-file', authMiddleware, blob.getFileURL);
// router.post('/download', authMiddleware, blob.downloadFile);
// router.get('/get-list', authMiddleware, blob.getListFiles);

module.exports = router;


