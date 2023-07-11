import React, { useState } from 'react';
import { Button, Container, Typography, CardMedia } from '@mui/material';
import axios from 'axios';
import api from '../util/api';

const UploadImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Preview the selected image
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);

            await axios.post(api.uploadFile, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Image uploaded successfully!');
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Image Upload Page
            </Typography>
            <input
                accept="image/*"
                type="file"
                id="upload-button"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <label htmlFor="upload-button">
                <Button variant="contained" component="span" color="primary">
                    Select Image
                </Button>
            </label>
            {previewImage && (
                <div>
                    <img src={previewImage} alt="Preview" style={{ height: '200px', marginTop: '20px' }} />
                </div>
            )}
            {selectedFile && (
                <div>
                    <Typography variant="subtitle1" gutterBottom>
                        Selected Image: {selectedFile.name}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleUpload}>
                        Upload
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default UploadImage;