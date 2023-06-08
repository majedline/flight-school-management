const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
// const blob = require('../../controllers/blob');

// get the coordinates based on the address
// router.post('/upload', authMiddleware, blob.uploadFile);
// router.post('/get-file', authMiddleware, blob.getFileURL);
// router.post('/download', authMiddleware, blob.downloadFile);
// router.get('/get-list', authMiddleware, blob.getListFiles);

module.exports = router;


