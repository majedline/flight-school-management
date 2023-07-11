const db = require('../models');

const uploadFile = async (req, res) => {
    try {
        const { originalname, buffer } = req.file;

        const image = await db.blob.create({
            name: originalname,
            data: buffer,
        });

        res.status(201).json({ success: true, image });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Image upload failed' });
    }
};

const getFile = async (req, res) => {
    try {
      const id = req.params.id;
      const image = await db.blob.findByPk(id);
  
      if (!image) {
        return res.status(404).json({ success: false, error: 'Image not found' });
      }
  
      res.setHeader('Content-Type', image.mimetype);
      res.send(image.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to retrieve image' });
    }
  };


  const getFiles = async (req, res) => {
    try {
      const files = await db.blob.findAll();

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Transfer-Encoding', 'chunked');

      res.status(200).json({ success: true, files });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Failed to retrieve images' });
    }
  };
module.exports = {uploadFile, getFile, getFiles}